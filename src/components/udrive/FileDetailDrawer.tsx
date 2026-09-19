import React, { useState } from 'react';
import { ClientFile } from '../../types';
import { 
  X, 
  Download, 
  History, 
  Archive, 
  RotateCcw, 
  Upload, 
  FileText, 
  Film, 
  Image as ImageIcon, 
  Type, 
  Check, 
  ExternalLink,
  Clock,
  User,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface FileDetailDrawerProps {
  file: ClientFile;
  onClose: () => void;
  onUploadNewVersion: (fileId: string, note: string) => void;
  onToggleArchive: (fileId: string) => void;
}

export const FileDetailDrawer: React.FC<FileDetailDrawerProps> = ({
  file,
  onClose,
  onUploadNewVersion,
  onToggleArchive,
}) => {
  const [revisionNote, setRevisionNote] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'history'>('preview');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
    // Trigger download anchor
    const link = document.createElement('a');
    link.href = file.previewUrl || file.downloadUrl || '#';
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    onUploadNewVersion(file.id, revisionNote.trim());
    setRevisionNote('');
  };

  const isImage = file.type.startsWith('image/') || /\.(png|jpg|jpeg|svg|webp)$/i.test(file.name);
  const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|webm)$/i.test(file.name);
  const isFont = file.type.includes('font') || /\.(ttf|otf|woff|woff2)$/i.test(file.name);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end animate-in fade-in duration-200">
      <div 
        id="file-detail-drawer"
        className="w-full max-w-lg bg-white dark:bg-[#12111A] border-l border-zinc-200 dark:border-white/10 h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
              {isImage ? <ImageIcon size={18} /> : isVideo ? <Film size={18} /> : isFont ? <Type size={18} /> : <FileText size={18} />}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm text-zinc-950 dark:text-white truncate">
                {file.name}
              </h3>
              <p className="text-[11px] text-zinc-500 flex items-center gap-2">
                <span>{file.folder}</span>
                <span>·</span>
                <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">v{file.version}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 shrink-0 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-2 border-b border-zinc-200/80 dark:border-white/10 flex items-center gap-4 bg-zinc-50/40 dark:bg-white/[0.01]">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'preview'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            Asset Preview & Specs
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <History size={13} />
            <span>Version History ({file.versions?.length || 1})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'preview' && (
            <div className="space-y-5">
              {/* Media Preview Stage */}
              <div className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/40 overflow-hidden flex items-center justify-center min-h-[180px] p-4 relative group">
                {isImage && file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="max-h-56 object-contain rounded-xl shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : isVideo ? (
                  <div className="flex flex-col items-center gap-2 text-zinc-400 py-6">
                    <div className="w-14 h-14 rounded-full bg-violet-600/20 text-violet-500 flex items-center justify-center">
                      <Film size={28} />
                    </div>
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      4K Production Master Video
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      1080x1920 (9:16) · 60fps · ProRes 422
                    </span>
                  </div>
                ) : isFont ? (
                  <div className="w-full text-center py-4 space-y-2">
                    <p className="font-serif text-3xl text-zinc-900 dark:text-white">
                      Ag
                    </p>
                    <p className="text-xs font-mono text-zinc-500">
                      Aa Bb Cc Dd Ee Ff Gg Hh 0123456789
                    </p>
                    <p className="text-[11px] text-violet-600 dark:text-violet-400 font-bold">
                      TrueType / OpenType Vector Glyphs
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400 py-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                      <FileText size={28} />
                    </div>
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      Agency Document Asset
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {file.type}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  {downloadSuccess ? <Check size={15} /> : <Download size={15} />}
                  <span>{downloadSuccess ? 'Downloaded!' : 'Download Asset'}</span>
                </button>

                <button
                  onClick={() => onToggleArchive(file.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                    file.archived
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {file.archived ? <RotateCcw size={15} /> : <Archive size={15} />}
                  <span>{file.archived ? 'Restore Asset' : 'Archive Asset'}</span>
                </button>
              </div>

              {/* Specs Table */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-3">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                  File Specifications
                </span>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Size</span>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">{file.size}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Category</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{file.folder}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Uploaded By</span>
                    <span className="font-bold text-zinc-900 dark:text-white truncate block">{file.author}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Last Updated</span>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono text-[11px]">
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-5">
              {/* Form to upload new version */}
              <form onSubmit={handleCreateVersion} className="p-4 rounded-2xl border border-violet-500/30 bg-violet-500/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <Upload size={14} className="text-violet-500" />
                    <span>Upload New Revision (v{file.version + 1})</span>
                  </span>
                  <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-bold">
                    NEXT VERSION
                  </span>
                </div>

                <input
                  type="text"
                  required
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Changelog: What changed in this version?..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />

                <button
                  type="submit"
                  disabled={!revisionNote.trim()}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white transition-colors"
                >
                  Commit Version {file.version + 1}
                </button>
              </form>

              {/* Version Timeline */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block px-1">
                  Revision History & Audit Log
                </span>

                <div className="space-y-2.5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                  {(file.versions && file.versions.length > 0
                    ? file.versions
                    : [
                        {
                          version: file.version,
                          author: file.author,
                          date: new Date(file.updatedAt).toLocaleDateString(),
                          note: 'Initial production upload.',
                        },
                      ]
                  ).map((v, idx) => (
                    <div
                      key={idx}
                      className="relative pl-8 p-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/60 dark:bg-white/[0.02]"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-2.5 top-4 w-2.5 h-2.5 rounded-full bg-violet-600 ring-4 ring-white dark:ring-[#12111A]" />

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-950 dark:text-white">
                          v{v.version} · {v.author}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {v.date}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                        {v.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
