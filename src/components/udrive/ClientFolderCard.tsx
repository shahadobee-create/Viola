import React, { useState } from 'react';
import { ViolaClient } from '../../types';
import { MoreVertical, Folder, ExternalLink, Info, Upload, Copy, Check, Sparkles } from 'lucide-react';

interface ClientFolderCardProps {
  client: ViolaClient;
  isSelected?: boolean;
  onSelect?: () => void;
  onOpen?: () => void;
  onOpenInfo?: () => void;
  onUpload?: () => void;
  fileCount?: number;
}

export const ClientFolderCard: React.FC<ClientFolderCardProps> = ({
  client,
  isSelected = false,
  onSelect,
  onOpen,
  onOpenInfo,
  onUpload,
  fileCount = 12,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(`${window.location.origin}/udrive/${client.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setShowMenu(false);
  };

  return (
    <div
      id={`folder-card-${client.id}`}
      onClick={() => {
        if (onSelect) onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (onOpen) onOpen();
      }}
      className="relative group cursor-pointer select-none transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Seamless Folder Silhouette SVG Background */}
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

        {/* Interior Folder Content Layer */}
        <div className="absolute inset-0 p-3.5 sm:p-4.5 flex flex-col justify-between pointer-events-none">
          {/* Top Bar (Inside tab and shoulder) */}
          <div className="flex items-start justify-between w-full pointer-events-auto">
            {/* Client Logo Avatar (positioned in the left tab) */}
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 flex items-center justify-center overflow-hidden border shadow-sm transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-white/20 border-white/40'
                    : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-white/15'
                }`}
                style={{ borderColor: isSelected ? 'rgba(255,255,255,0.4)' : `${client.color}66` }}
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span
                    className={`font-display font-bold text-xs sm:text-sm ${
                      isSelected ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {client.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Verified or Package Active dot */}
              <div
                className={`w-2 h-2 rounded-full hidden sm:block ${
                  isSelected ? 'bg-amber-300 animate-pulse' : 'bg-emerald-500'
                }`}
                title="Active Client Retainer"
              />
            </div>

            {/* Three dots menu button on the right shoulder */}
            <div className="relative">
              <button
                id={`folder-menu-btn-${client.id}`}
                onClick={handleMenuClick}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                aria-label="Folder actions"
              >
                <MoreVertical size={16} />
              </button>

              {/* Context Dropdown Menu */}
              {showMenu && (
                <div
                  className="absolute right-0 top-9 w-44 rounded-2xl bg-white dark:bg-[#1A1825] border border-zinc-200 dark:border-zinc-800 shadow-xl py-1.5 z-30 divide-y divide-zinc-100 dark:divide-zinc-800/60"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        if (onOpen) onOpen();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 flex items-center gap-2"
                    >
                      <Folder size={14} />
                      <span>Open UDrive</span>
                    </button>
                    {onOpenInfo && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onOpenInfo();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 flex items-center gap-2"
                      >
                        <Info size={14} />
                        <span>Client Info & Brief</span>
                      </button>
                    )}
                  </div>

                  <div className="py-1">
                    {onUpload && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onUpload();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 flex items-center gap-2"
                      >
                        <Upload size={14} />
                        <span>Upload File</span>
                      </button>
                    )}
                    <button
                      onClick={handleCopyLink}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 flex items-center gap-2"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      <span>{copied ? 'Link Copied!' : 'Copy Folder Link'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Content Area */}
          <div className="pt-2">
            <h3
              className={`font-display font-black text-xs sm:text-sm tracking-tight line-clamp-1 uppercase ${
                isSelected ? 'text-white' : 'text-zinc-950 dark:text-white'
              }`}
            >
              {client.name}
            </h3>

            {/* Package Summary text */}
            <p
              className={`text-[11px] sm:text-xs font-medium mt-0.5 line-clamp-1 ${
                isSelected ? 'text-purple-100' : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {client.package?.summary || '4 Posts · 2 Reels'}
            </p>

            {/* Sub-label: Month / Period / File count */}
            <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
              <span
                className={`truncate ${
                  isSelected ? 'text-purple-200' : 'text-zinc-400 dark:text-zinc-500'
                }`}
              >
                {client.package?.month || 'September Package'}
              </span>
              <span
                className={`ml-1 shrink-0 font-medium ${
                  isSelected ? 'text-purple-200' : 'text-zinc-400 dark:text-zinc-500'
                }`}
              >
                {fileCount} assets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick click-through pill below on hover (mobile tap opens folder) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onOpen) onOpen();
        }}
        className="mt-1.5 w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50/70 dark:hover:bg-violet-950/40 transition-colors"
      >
        <span>Open folder</span>
        <ExternalLink size={11} />
      </button>
    </div>
  );
};
