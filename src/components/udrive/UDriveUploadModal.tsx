import React, { useState, useRef } from 'react';
import { ViolaClient, ClientFile } from '../../types';
import { X, Upload, FileUp, Check, Folder, Tag, AlertCircle } from 'lucide-react';

interface UDriveUploadModalProps {
  clients: ViolaClient[];
  defaultClientId?: string;
  defaultFolder?: string;
  onClose: () => void;
  onUpload: (newFile: ClientFile) => void;
}

const UDRIVE_FOLDERS = [
  'Logos',
  'Fonts',
  'Brand Assets',
  'Posts',
  'Reels',
  'Stories',
  'Photos',
  'Contracts',
  'Brief',
  'Adobe Files',
  'Documents',
] as const;

export const UDriveUploadModal: React.FC<UDriveUploadModalProps> = ({
  clients,
  defaultClientId,
  defaultFolder = 'Logos',
  onClose,
  onUpload,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(
    defaultClientId || (clients[0]?.id || 'zofia_coffee')
  );
  const [selectedFolder, setSelectedFolder] = useState<string>(
    defaultFolder || 'Logos'
  );
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('4.8 MB');
  const [fileType, setFileType] = useState('image/png');
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setFileType(file.type || 'application/octet-stream');
      
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setFileType(file.type || 'application/octet-stream');
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newFile: ClientFile = {
      id: `file_${Date.now()}`,
      clientId: selectedClientId,
      clientName: activeClient?.name || 'Viola Client',
      name: fileName.trim(),
      folder: selectedFolder,
      size: fileSize || '3.5 MB',
      fileSizeBytes: 3.5 * 1024 * 1024,
      type: fileType,
      updatedAt: new Date().toISOString(),
      version: 1,
      author: 'Shahad (Lead Partner)',
      previewUrl: previewUrl,
      versions: [
        {
          version: 1,
          author: 'Shahad (Lead Partner)',
          date: 'Just now',
          note: `Uploaded into ${activeClient?.name} / ${selectedFolder}`,
        },
      ],
    };

    onUpload(newFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        id="udrive-upload-modal"
        className="bg-white dark:bg-[#12111A] border border-zinc-200 dark:border-white/10 rounded-3xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Upload size={18} />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-zinc-950 dark:text-white">
                Upload to Cloud UDrive
              </h3>
              <p className="text-[11px] text-zinc-500">
                Asset will be immediately accessible to team and client
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Target Client Selector */}
          <div>
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
              Target Client Folder
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.package?.summary || 'Client Folder'})
                </option>
              ))}
            </select>
          </div>

          {/* Target Subfolder Selector */}
          <div>
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
              Asset Category / Subfolder
            </label>
            <div className="grid grid-cols-3 gap-1.5 max-h-32 overflow-y-auto p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#1A1825]/40">
              {UDRIVE_FOLDERS.map((folderName) => (
                <button
                  type="button"
                  key={folderName}
                  onClick={() => setSelectedFolder(folderName)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate flex items-center gap-1.5 ${
                    selectedFolder === folderName
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Folder size={11} />
                  <span className="truncate">{folderName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-violet-400 dark:hover:border-violet-500/50 bg-zinc-50/40 dark:bg-white/[0.01]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2">
                <FileUp size={20} />
              </div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Click to browse or drag & drop asset here
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">
                Supports SVG, PNG, JPG, MP4, PDF, TTF, OTF, ZIP, PSD, AI (Up to 2 GB)
              </p>
            </div>
          </div>

          {/* File Name input */}
          <div>
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
              Asset Display Name
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. Zofia_Vector_Logo_Mark.svg"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          {/* Size / Format tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.8 MB"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                MIME / Extension
              </label>
              <input
                type="text"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                placeholder="image/svg+xml"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1825] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!fileName.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white shadow-lg shadow-violet-600/20 transition-all flex items-center gap-1.5"
            >
              <Upload size={14} />
              <span>Confirm & Upload Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
