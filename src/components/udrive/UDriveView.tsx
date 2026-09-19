import React, { useState, useMemo } from 'react';
import { ViolaClient, ClientFile } from '../../types';
import { VIOLA_CLIENTS } from '../../data/mockData';
import { ClientFolderCard } from './ClientFolderCard';
import { ClientDetailView } from './ClientDetailView';
import { FolderFilesView } from './FolderFilesView';
import { FileDetailDrawer } from './FileDetailDrawer';
import { UDriveUploadModal } from './UDriveUploadModal';
import { ClientInfoModal } from './ClientInfoModal';
import { 
  ArrowLeft, 
  Search, 
  LayoutGrid, 
  List, 
  Upload, 
  Folder, 
  Sparkles, 
  ChevronRight,
  Filter,
  Plus,
  ShieldCheck,
  HardDrive
} from 'lucide-react';

interface UDriveViewProps {
  clients?: ViolaClient[];
  files: ClientFile[];
  onClose?: () => void;
  onUploadFile: (newFile: ClientFile) => void;
  onUploadNewVersion: (fileId: string, note: string) => void;
  onToggleArchive: (fileId: string) => void;
  initialClientId?: string;
  initialFolderName?: string;
}

export const UDriveView: React.FC<UDriveViewProps> = ({
  clients = VIOLA_CLIENTS,
  files,
  onClose,
  onUploadFile,
  onUploadNewVersion,
  onToggleArchive,
  initialClientId,
  initialFolderName,
}) => {
  // Navigation stack states:
  // Level 1: All client folders (activeClientId === null)
  // Level 2: Inside a specific client (activeClientId !== null, activeFolderName === null)
  // Level 3: Inside a specific subfolder (activeClientId !== null, activeFolderName !== null)
  const [activeClientId, setActiveClientId] = useState<string | null>(initialClientId || null);
  const [activeFolderName, setActiveFolderName] = useState<string | null>(initialFolderName || null);

  // View preferences
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Modals & Drawers
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadContextFolder, setUploadContextFolder] = useState<string>('Logos');
  const [infoModalClient, setInfoModalClient] = useState<ViolaClient | null>(null);
  const [infoModalTab, setInfoModalTab] = useState<'info' | 'brief'>('info');
  const [selectedFileForDrawer, setSelectedFileForDrawer] = useState<ClientFile | null>(null);

  // Active Client object
  const activeClient = useMemo(() => {
    if (!activeClientId) return null;
    return clients.find((c) => c.id === activeClientId) || null;
  }, [clients, activeClientId]);

  // Unique industries
  const industries = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => {
      if (c.industry) {
        set.add(c.industry.split('&')[0].trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [clients]);

  // Filtered clients for Level 1
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.package?.summary && c.package.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesIndustry =
        selectedIndustry === 'All' || c.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
      return matchesSearch && matchesIndustry;
    });
  }, [clients, searchQuery, selectedIndustry]);

  // Handlers
  const handleOpenClient = (clientId: string) => {
    setActiveClientId(clientId);
    setActiveFolderName(null);
    setSelectedClientId(clientId);
  };

  const handleOpenFolder = (folderName: string) => {
    setActiveFolderName(folderName);
  };

  const handleBackToClients = () => {
    setActiveClientId(null);
    setActiveFolderName(null);
  };

  const handleBackToClientOverview = () => {
    setActiveFolderName(null);
  };

  // LEVEL 3: Inside a subfolder
  if (activeClient && activeFolderName) {
    return (
      <div className="flex flex-col h-full">
        <FolderFilesView
          client={activeClient}
          folderName={activeFolderName}
          files={files}
          onBack={handleBackToClientOverview}
          onSelectFile={(file) => setSelectedFileForDrawer(file)}
          onOpenUpload={(folder) => {
            setUploadContextFolder(folder);
            setShowUploadModal(true);
          }}
          onToggleArchive={onToggleArchive}
        />

        {/* File Detail Drawer */}
        {selectedFileForDrawer && (
          <FileDetailDrawer
            file={selectedFileForDrawer}
            onClose={() => setSelectedFileForDrawer(null)}
            onUploadNewVersion={(fileId, note) => {
              onUploadNewVersion(fileId, note);
              // Optimistically update version inside drawer
              setSelectedFileForDrawer((prev) =>
                prev
                  ? {
                      ...prev,
                      version: prev.version + 1,
                      versions: [
                        {
                          version: prev.version + 1,
                          author: 'Shahad (Lead Partner)',
                          date: 'Just now',
                          note,
                        },
                        ...(prev.versions || []),
                      ],
                    }
                  : null
              );
            }}
            onToggleArchive={(fileId) => {
              onToggleArchive(fileId);
              setSelectedFileForDrawer((prev) =>
                prev ? { ...prev, archived: !prev.archived } : null
              );
            }}
          />
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <UDriveUploadModal
            clients={clients}
            defaultClientId={activeClient.id}
            defaultFolder={uploadContextFolder}
            onClose={() => setShowUploadModal(false)}
            onUpload={onUploadFile}
          />
        )}
      </div>
    );
  }

  // LEVEL 2: Inside a specific client overview
  if (activeClient) {
    return (
      <div className="flex flex-col h-full">
        <ClientDetailView
          client={activeClient}
          files={files}
          onBack={handleBackToClients}
          onOpenFolder={handleOpenFolder}
          onOpenInfo={() => {
            setInfoModalClient(activeClient);
            setInfoModalTab('info');
          }}
          onOpenBrief={() => {
            setInfoModalClient(activeClient);
            setInfoModalTab('brief');
          }}
          onOpenUpload={(folder) => {
            setUploadContextFolder(folder || 'Logos');
            setShowUploadModal(true);
          }}
        />

        {/* Client Info Modal */}
        {infoModalClient && (
          <ClientInfoModal
            client={infoModalClient}
            initialTab={infoModalTab}
            onClose={() => setInfoModalClient(null)}
            onOpenUDrive={() => setInfoModalClient(null)}
          />
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <UDriveUploadModal
            clients={clients}
            defaultClientId={activeClient.id}
            defaultFolder={uploadContextFolder}
            onClose={() => setShowUploadModal(false)}
            onUpload={onUploadFile}
          />
        )}
      </div>
    );
  }

  // LEVEL 1: Main Page — Client Folders Grid
  return (
    <div 
      id="udrive-main-page"
      className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-28 text-zinc-900 dark:text-white"
    >
      {/* Header Container */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-3.5">
          {/* Top Row: Back arrow, Title, Breadcrumbs, Right Team Avatars & Search */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 -ml-1 rounded-xl text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft size={18} />
                </button>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-black text-lg sm:text-xl text-zinc-950 dark:text-white tracking-tight truncate">
                    Client Assets & Cloud UDrive
                  </h1>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    3 GiB Cloud Node
                  </span>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">
                  <span>Home</span>
                  <span>›</span>
                  <span>Clients</span>
                  <span>›</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    UDrive
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Team Avatar Stack & Action Controls (Matching reference layout) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Stacked User Avatars */}
              <div className="hidden sm:flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white dark:ring-[#0A0A0B] shadow-sm">
                  R
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white dark:ring-[#0A0A0B] shadow-sm">
                  A
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-[#0A0A0B] shadow-sm">
                  WK
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white dark:ring-[#0A0A0B] shadow-sm">
                  S
                </div>
              </div>

              {/* View toggle option (Grid / List) */}
              <div className="flex items-center p-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                  }`}
                  aria-label="List view"
                >
                  <List size={15} />
                </button>
              </div>

              {/* Upload Master Button */}
              <button
                onClick={() => {
                  setUploadContextFolder('Logos');
                  setShowUploadModal(true);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 transition-all flex items-center gap-1.5"
              >
                <Upload size={14} />
                <span className="hidden sm:inline">Upload Asset</span>
                <span className="sm:hidden">Upload</span>
              </button>
            </div>
          </div>

          {/* Search bar & Industry filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, industries, packages..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#15131E] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 shadow-sm"
              />
            </div>

            {/* Industry Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedIndustry('All')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                  selectedIndustry === 'All'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                All Clients ({clients.length})
              </button>
              {industries.filter((i) => i !== 'All').map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                    selectedIndustry === ind
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6 w-full">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-xl text-zinc-950 dark:text-white">
              Client Folders
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Every client has a dedicated cloud drive for logos, fonts, social posts, and master cuts
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-400">
            {filteredClients.length} of {clients.length} folders
          </span>
        </div>

        {/* 2-Column Folder Grid on Mobile (2-column on mobile, 3 on tablet, 4 on desktop) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredClients.map((client) => {
              const clientFilesCount = files.filter(
                (f) => f.clientId === client.id || f.clientName === client.name
              ).length;
              const isSelected = selectedClientId === client.id;

              return (
                <ClientFolderCard
                  key={client.id}
                  client={client}
                  isSelected={isSelected}
                  fileCount={clientFilesCount || 8}
                  onSelect={() => setSelectedClientId(client.id)}
                  onOpen={() => handleOpenClient(client.id)}
                  onOpenInfo={() => {
                    setInfoModalClient(client);
                    setInfoModalTab('info');
                  }}
                  onUpload={() => {
                    setUploadContextFolder('Logos');
                    setShowUploadModal(true);
                  }}
                />
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#12111A] overflow-hidden divide-y divide-zinc-200/70 dark:divide-white/5 shadow-sm">
            {filteredClients.map((client) => {
              const clientFilesCount = files.filter(
                (f) => f.clientId === client.id || f.clientName === client.name
              ).length;
              const isSelected = selectedClientId === client.id;

              return (
                <div
                  key={client.id}
                  onClick={() => handleOpenClient(client.id)}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-violet-50/70 dark:bg-violet-950/20'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-12 h-12 rounded-2xl p-0.5 border flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-900 shrink-0"
                      style={{ borderColor: `${client.color}88` }}
                    >
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">
                          {client.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-sm text-zinc-950 dark:text-white uppercase truncate">
                          {client.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400">
                          {client.package?.summary || '4 Posts · 2 Reels'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {client.industry} · {client.location || 'Erbil, Kurdistan'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-zinc-400">
                      {clientFilesCount || 8} files
                    </span>
                    <ChevronRight size={18} className="text-zinc-400" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UDriveUploadModal
          clients={clients}
          defaultClientId={selectedClientId || undefined}
          defaultFolder={uploadContextFolder}
          onClose={() => setShowUploadModal(false)}
          onUpload={onUploadFile}
        />
      )}

      {/* Client Info Modal */}
      {infoModalClient && (
        <ClientInfoModal
          client={infoModalClient}
          initialTab={infoModalTab}
          onClose={() => setInfoModalClient(null)}
          onOpenUDrive={() => {
            setActiveClientId(infoModalClient.id);
            setInfoModalClient(null);
          }}
        />
      )}
    </div>
  );
};
