import React, { useState } from 'react';
import { ViolaClient, ClientFile, ClientFontAsset } from '../../types';
import { 
  ArrowLeft, 
  Search, 
  LayoutGrid, 
  List, 
  Download, 
  Upload, 
  FileText, 
  Film, 
  Image as ImageIcon, 
  Type, 
  MoreVertical, 
  Check, 
  Copy,
  Clock,
  Sparkles,
  Palette,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FolderFilesViewProps {
  client: ViolaClient;
  folderName: string;
  files: ClientFile[];
  onBack: () => void;
  onSelectFile: (file: ClientFile) => void;
  onOpenUpload: (folder: string) => void;
  onToggleArchive: (fileId: string) => void;
}

export const FolderFilesView: React.FC<FolderFilesViewProps> = ({
  client,
  folderName,
  files,
  onBack,
  onSelectFile,
  onOpenUpload,
  onToggleArchive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formatFilter, setFormatFilter] = useState<string>('All');
  const [fontSampleText, setFontSampleText] = useState('Aa Bb Cc 0123456789 Viola Agency');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Filter files in this folder
  const folderFiles = files.filter(
    (f) => (f.clientId === client.id || f.clientName === client.name) && f.folder === folderName
  );

  // Available format filters from actual files
  const extensions = Array.from(
    new Set(
      folderFiles.map((f) => {
        const parts = f.name.split('.');
        return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'OTHER';
      })
    )
  );

  const filteredFiles = folderFiles.filter((f) => {
    const ext = f.name.split('.').pop()?.toUpperCase() || '';
    const matchesFormat = formatFilter === 'All' || ext === formatFilter;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  const handleCopyHex = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  const isFontFolder = folderName === 'Fonts';
  const isBrandAssetsFolder = folderName === 'Brand Assets';
  const isBriefFolder = folderName === 'Brief';

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-24 text-zinc-900 dark:text-white">
      {/* Header & Breadcrumb Bar */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Top Row: Back button, Breadcrumbs, Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={onBack}
                className="p-2 -ml-1 rounded-xl text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Back to client overview"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium truncate">
                <span className="hidden sm:inline">UDrive</span>
                <span className="hidden sm:inline">›</span>
                <button
                  onClick={onBack}
                  className="hover:text-violet-600 dark:hover:text-violet-400 truncate max-w-[120px] sm:max-w-none"
                >
                  {client.name}
                </button>
                <span>›</span>
                <span className="font-bold text-zinc-900 dark:text-white truncate">
                  {folderName}
                </span>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center p-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
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

              {/* Upload to this folder button */}
              <button
                onClick={() => onOpenUpload(folderName)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 transition-all flex items-center gap-1.5"
              >
                <Upload size={14} />
                <span className="hidden sm:inline">Upload Asset</span>
                <span className="sm:hidden">Upload</span>
              </button>
            </div>
          </div>

          {/* Search and Extension Filter Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${folderName}...`}
                className="w-full pl-9 pr-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#15131E] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>

            {/* Extension Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setFormatFilter('All')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                  formatFilter === 'All'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                All ({folderFiles.length})
              </button>
              {extensions.map((ext) => (
                <button
                  key={ext}
                  onClick={() => setFormatFilter(ext)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                    formatFilter === ext
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {ext}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6 w-full">
        {/* SPECIALIZED VIEW 1: FONTS PREVIEWER */}
        {isFontFolder && (
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12111A] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <Type size={20} />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-zinc-950 dark:text-white">
                    Brand Typography Specimen Tester
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Live font rendering with Kurdish and Arabic glyph support
                  </p>
                </div>
              </div>

              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={fontSampleText}
                  onChange={(e) => setFontSampleText(e.target.value)}
                  placeholder="Type sample text to preview fonts..."
                  className="w-full px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
            </div>

            {/* Font Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(client.fonts && client.fonts.length > 0
                ? client.fonts
                : [
                    {
                      id: 'f_default_1',
                      name: 'Poppins SemiBold',
                      category: 'Brand Primary Font',
                      weight: 'SemiBold 600',
                      format: 'TTF',
                      size: '1.2 MB',
                      samplePreview: 'Aa Bb Cc 0123456789',
                    },
                    {
                      id: 'f_default_2',
                      name: 'Noto Kufi Arabic',
                      category: 'Arabic Script Font',
                      weight: 'Bold 700',
                      format: 'TTF',
                      size: '1.4 MB',
                      samplePreview: 'فونت هەڵبژێردراو بۆ پڕۆژەکان',
                    },
                  ]
              ).map((font) => (
                <div
                  key={font.id}
                  className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-zinc-950 dark:text-white">
                        {font.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        {font.category} · {font.weight} · {font.format}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 font-bold">
                      {font.size}
                    </span>
                  </div>

                  {/* Specimen Render Box */}
                  <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-zinc-200/60 dark:border-white/5 min-h-[72px] flex items-center">
                    <p className="text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 font-semibold truncate w-full">
                      {fontSampleText || font.samplePreview || 'Aa Bb Cc 0123456789'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIALIZED VIEW 2: BRAND COLORS / PALETTE */}
        {isBrandAssetsFolder && client.brandColors && client.brandColors.length > 0 && (
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12111A] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Palette size={20} />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-zinc-950 dark:text-white">
                    Official Brand Color Tokens
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Click any hex code to copy the design system token
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {client.brandColors.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopyHex(color.hex)}
                  className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] cursor-pointer hover:border-violet-400 dark:hover:border-violet-500/40 transition-all group"
                >
                  <div
                    className="w-full h-16 rounded-xl mb-2.5 shadow-inner border border-black/10 flex items-end justify-end p-1.5"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-zinc-950 dark:text-white truncate">
                    {color.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
                    <span>{color.role}</span>
                    <span className="text-violet-600 dark:text-violet-400 font-bold group-hover:underline">
                      {copiedHex === color.hex ? 'Copied!' : 'Copy'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIALIZED VIEW 3: BRIEF STRATEGY CARD */}
        {isBriefFolder && (
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12111A] shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-display font-black text-base text-zinc-950 dark:text-white">
                  Client Strategy & Creative Direction
                </h3>
                <p className="text-xs text-zinc-500">
                  Core mission and guardrails for {client.name}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50/60 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/5 space-y-3">
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {client.brief?.about}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {client.brief?.brandPersonality?.map((p, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Files Section Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white">
            Folder Assets ({filteredFiles.length})
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            {folderName}
          </span>
        </div>

        {/* Empty State */}
        {filteredFiles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/40 dark:bg-[#12111A]/40 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
              <Upload size={24} />
            </div>
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white">
              No files found in {folderName}
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Upload the initial assets for this client to make them accessible to your creative squad.
            </p>
            <button
              onClick={() => onOpenUpload(folderName)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-600/20"
            >
              Upload Asset Now
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => {
              const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|svg|webp)$/i.test(file.name);
              const isVid = file.type.startsWith('video/') || /\.(mp4|mov|webm)$/i.test(file.name);
              const isFnt = file.type.includes('font') || /\.(ttf|otf|woff|woff2)$/i.test(file.name);

              return (
                <div
                  key={file.id}
                  onClick={() => onSelectFile(file)}
                  className="p-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#12111A] hover:border-violet-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  {/* Thumbnail / Icon preview stage */}
                  <div className="w-full h-32 rounded-xl bg-zinc-100 dark:bg-black/30 border border-zinc-200/60 dark:border-white/5 overflow-hidden flex items-center justify-center mb-3 relative">
                    {isImg && file.previewUrl ? (
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : isVid ? (
                      <div className="flex flex-col items-center gap-1.5 text-violet-500">
                        <Film size={28} />
                        <span className="text-[10px] font-mono font-bold uppercase">Video Master</span>
                      </div>
                    ) : isFnt ? (
                      <div className="flex flex-col items-center gap-1 text-violet-500">
                        <Type size={32} />
                        <span className="text-[10px] font-mono font-bold">Typography</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-zinc-400">
                        <FileText size={32} />
                        <span className="text-[10px] font-mono font-bold">Document</span>
                      </div>
                    )}

                    {/* Version Badge Top Right */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-sm">
                      v{file.version}
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-zinc-950 dark:text-white truncate" title={file.name}>
                      {file.name}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="font-mono">{file.size}</span>
                      <span className="truncate max-w-[110px]">{file.author}</span>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
                      <span className="text-violet-600 dark:text-violet-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>Details</span>
                        <ChevronRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#12111A] overflow-hidden divide-y divide-zinc-200/70 dark:divide-white/5 shadow-sm">
            {filteredFiles.map((file) => {
              const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|svg|webp)$/i.test(file.name);
              const isVid = file.type.startsWith('video/') || /\.(mp4|mov|webm)$/i.test(file.name);
              const isFnt = file.type.includes('font') || /\.(ttf|otf|woff|woff2)$/i.test(file.name);

              return (
                <div
                  key={file.id}
                  onClick={() => onSelectFile(file)}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-violet-500 shrink-0">
                      {isImg ? <ImageIcon size={18} /> : isVid ? <Film size={18} /> : isFnt ? <Type size={18} /> : <FileText size={18} />}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-zinc-950 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{file.size}</span>
                        <span>·</span>
                        <span className="truncate">{file.author}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      v{file.version}
                    </span>
                    <span className="hidden sm:inline text-xs font-mono text-zinc-400">
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </span>
                    <ChevronRight size={15} className="text-zinc-400 group-hover:text-violet-500 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
