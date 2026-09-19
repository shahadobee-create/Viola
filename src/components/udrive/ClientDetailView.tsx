import React, { useState } from 'react';
import { ViolaClient, ClientFile } from '../../types';
import { 
  ArrowLeft, 
  Search, 
  Upload, 
  Info, 
  FileText, 
  Folder, 
  Image as ImageIcon, 
  Film, 
  Type, 
  Palette, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users,
  MoreVertical,
  Check
} from 'lucide-react';

interface ClientDetailViewProps {
  client: ViolaClient;
  files: ClientFile[];
  onBack: () => void;
  onOpenFolder: (folderName: string) => void;
  onOpenInfo: () => void;
  onOpenBrief: () => void;
  onOpenUpload: (folder?: string) => void;
}

interface SubfolderDefinition {
  name: string;
  sub: string;
  icon: React.ElementType;
  color: string;
}

const CLIENT_SUBFOLDERS: SubfolderDefinition[] = [
  { name: 'Brief', sub: 'Strategy & Directives', icon: FileText, color: '#8B5CF6' },
  { name: 'Logos', sub: 'Vectors & Marks', icon: Layers, color: '#EC4899' },
  { name: 'Fonts', sub: 'Typography & Glyphs', icon: Type, color: '#3B82F6' },
  { name: 'Brand Assets', sub: 'Colors & Guidelines', icon: Palette, color: '#F59E0B' },
  { name: 'Posts', sub: 'Social Stills & Carousels', icon: ImageIcon, color: '#10B981' },
  { name: 'Reels', sub: '4K Masters & 9:16 Cuts', icon: Film, color: '#EF4444' },
  { name: 'Stories', sub: 'Daily Engagement', icon: Sparkles, color: '#F97316' },
  { name: 'Photos', sub: 'RAW & Editorial Stills', icon: ImageIcon, color: '#06B6D4' },
  { name: 'Contracts', sub: 'Legal Retainers', icon: ShieldCheck, color: '#6366F1' },
];

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({
  client,
  files,
  onBack,
  onOpenFolder,
  onOpenInfo,
  onOpenBrief,
  onOpenUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubfolder, setSelectedSubfolder] = useState<string | null>(null);

  // Client files
  const clientFiles = files.filter(
    (f) => f.clientId === client.id || f.clientName === client.name
  );

  const filteredSubfolders = CLIENT_SUBFOLDERS.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-24 text-zinc-900 dark:text-white">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Back button & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 -ml-1 rounded-xl text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Back to client folders"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium truncate">
              <span className="hidden sm:inline">UDrive</span>
              <span className="hidden sm:inline">›</span>
              <button
                onClick={onBack}
                className="hover:text-violet-600 dark:hover:text-violet-400"
              >
                Clients
              </button>
              <span>›</span>
              <span className="font-bold text-zinc-900 dark:text-white truncate">
                {client.name}
              </span>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInfo}
              className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <Info size={14} className="text-violet-500" />
              <span className="hidden sm:inline">Client Info</span>
            </button>

            <button
              onClick={onOpenBrief}
              className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <FileText size={14} className="text-violet-500" />
              <span className="hidden sm:inline">Brand Brief</span>
            </button>

            <button
              onClick={() => onOpenUpload()}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 transition-all flex items-center gap-1.5"
            >
              <Upload size={14} />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-7 w-full">
        {/* Top Client Overview Card */}
        <div className="p-5 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#12111A] shadow-sm relative overflow-hidden">
          {/* Subtle ambient accent flare */}
          <div 
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: client.color || '#7C3AED' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Client Identity */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 border-2 shadow-md flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-900 shrink-0"
                style={{ borderColor: client.color || '#7C3AED' }}
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-display font-black text-xl text-zinc-800 dark:text-white">
                    {client.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight">
                    {client.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    Retainer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {client.industry} · {client.location || 'Erbil, Kurdistan Region'}
                </p>

                {/* Team Avatars */}
                {client.assignedTeam && client.assignedTeam.length > 0 && (
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                      Creative Team:
                    </span>
                    <div className="flex -space-x-1.5">
                      {client.assignedTeam.map((m, idx) => (
                        <img
                          key={idx}
                          src={m.avatar}
                          alt={m.name}
                          title={`${m.name} (${m.role})`}
                          className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-[#12111A]"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Package Summary Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/10 md:min-w-[280px]">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-500 mb-1">
                <span>PACKAGE STATUS</span>
                <span className="text-violet-600 dark:text-violet-400">
                  {client.package?.month || 'September 2026'}
                </span>
              </div>
              <h4 className="font-display font-black text-sm text-zinc-950 dark:text-white">
                {client.package?.summary || '4 Posts · 2 Reels'}
              </h4>

              {/* Progress bar */}
              <div className="mt-2.5 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Deliverables</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {client.package?.progressPercent || 75}% Ready
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                    style={{ width: `${client.package?.progressPercent || 75}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="font-display font-black text-xl text-zinc-950 dark:text-white">
              Client Assets & Subfolders
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Organized repository for brand assets, production deliverables, and legal master files
            </p>
          </div>

          {/* Subfolder Search */}
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search folders..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12111A] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
        </div>

        {/* 2-Column Folder Grid on Mobile (sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredSubfolders.map((folder) => {
            const Icon = folder.icon;
            const folderFilesCount = clientFiles.filter(
              (f) => f.folder === folder.name
            ).length;
            const isSelected = selectedSubfolder === folder.name;

            return (
              <div
                key={folder.name}
                id={`subfolder-card-${folder.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setSelectedSubfolder(folder.name);
                }}
                onDoubleClick={() => onOpenFolder(folder.name)}
                className="relative group cursor-pointer select-none transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Seamless Folder Silhouette SVG */}
                <div className="relative w-full h-[152px] sm:h-[168px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                  <svg
                    viewBox="0 0 100 78"
                    preserveAspectRatio="none"
                    className="w-full h-full block"
                  >
                    <path
                      d="M 0 14 C 0 6 6 0 14 0 L 42 0 C 47 0 50 3 53 7 L 57 13 C 60 17 64 19 69 19 L 87 19 C 94 19 100 24 100 30 L 100 66 C 100 73 94 78 86 78 L 14 78 C 6 78 0 73 0 66 Z"
                      className={
                        isSelected
                          ? 'fill-[#7C3AED] stroke-[#6D28D9] stroke-[1.2]'
                          : 'fill-white dark:fill-[#15131E] stroke-zinc-200/90 dark:stroke-white/10 stroke-[1.2] group-hover:stroke-violet-400/80 dark:group-hover:stroke-violet-500/50'
                      }
                    />
                  </svg>

                  {/* Interior Content */}
                  <div className="absolute inset-0 p-3.5 sm:p-4.5 flex flex-col justify-between pointer-events-none">
                    {/* Top Row: Folder Category Icon & Dot */}
                    <div className="flex items-start justify-between w-full pointer-events-auto">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full p-2 flex items-center justify-center shadow-sm ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800/90 text-violet-600 dark:text-violet-400'
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        {folderFilesCount} files
                      </span>
                    </div>

                    {/* Bottom Row: Folder Name and Description */}
                    <div className="pt-2">
                      <h3
                        className={`font-display font-black text-xs sm:text-sm tracking-tight uppercase line-clamp-1 ${
                          isSelected ? 'text-white' : 'text-zinc-950 dark:text-white'
                        }`}
                      >
                        {folder.name}
                      </h3>

                      <p
                        className={`text-[10px] sm:text-[11px] font-medium mt-0.5 line-clamp-1 ${
                          isSelected ? 'text-purple-100' : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        {folder.sub}
                      </p>

                      <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
                        <span
                          className={
                            isSelected ? 'text-purple-200' : 'text-zinc-400'
                          }
                        >
                          {client.name.split(' ')[0]} Cloud
                        </span>
                        <ChevronRight
                          size={13}
                          className={
                            isSelected ? 'text-white' : 'text-violet-500'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile tap button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFolder(folder.name);
                  }}
                  className="mt-1.5 w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50/70 dark:hover:bg-violet-950/40 transition-colors"
                >
                  <span>Explore files</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
