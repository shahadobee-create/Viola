import React, { useState, useEffect, useRef } from 'react';
import { 
  InspirationItem, 
  Conversation 
} from '../../types';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  Check
} from 'lucide-react';

interface InspirationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: InspirationItem) => void;
  editingItem?: InspirationItem | null;
  defaultClientId?: string;
  defaultIndustryType?: string;
  conversations?: Conversation[];
  currentUser: {
    id: string;
    displayName: string;
    username: string;
    avatar?: string;
    role?: any;
  };
}

export const InspirationFormModal: React.FC<InspirationFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
  defaultClientId = 'chat_restaurant_food',
  defaultIndustryType = 'restaurant_food',
  currentUser
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [textValue, setTextValue] = useState('');
  const [title, setTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setImageUrl(editingItem.images?.[0] || '');
      setTextValue(editingItem.note || editingItem.sourceUrl || '');
      setTitle(editingItem.title || '');
    } else {
      setImageUrl('');
      setTextValue('');
      setTitle('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const isUrl = (val: string) => {
    const s = val.trim();
    return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('www.');
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    const trimmedText = textValue.trim();
    const isLink = isUrl(trimmedText);

    const newItem: InspirationItem = {
      id: editingItem ? editingItem.id : `insp_${Date.now()}`,
      clientId: defaultClientId,
      clientName: 'Bite & Brew Bistro',
      industryType: defaultIndustryType,
      industryName: 'Restaurant',
      postLayout: 'single',
      title: title.trim() || (isLink ? 'Web Resource' : trimmedText ? trimmedText.slice(0, 30) : 'Food Idea'),
      note: trimmedText,
      sourceUrl: isLink ? trimmedText : undefined,
      images: [imageUrl.trim()],
      tags: [],
      category: editingItem?.category || 'Main Dishes',
      author: {
        id: currentUser.id,
        name: currentUser.displayName,
        username: currentUser.username,
        avatar: currentUser.avatar,
        role: currentUser.role
      },
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: editingItem?.isPinned ?? false,
      likeCount: editingItem?.likeCount ?? 0,
      viewerLiked: editingItem?.viewerLiked ?? false
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-[#121517] border border-zinc-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              {editingItem ? 'Edit Image' : 'Add Image'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 1. Image Section: Upload or URL */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Image
            </label>

            {imageUrl ? (
              <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-700/60 mb-2.5">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-black/70 hover:bg-black/90 text-xs font-medium text-white backdrop-blur-md border border-white/10 transition-colors"
                >
                  Change
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-[2.5/1] rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all p-4 text-center ${
                  isDragOver 
                    ? 'border-amber-500 bg-amber-500/10' 
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center">
                  <Upload size={18} />
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Paste URL directly */}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* 2. Text / Note / Link Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Note or Link
            </label>
            <div className="relative">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Add a note (e.g. Herb-crusted ribeye) or paste a link..."
                className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                {isUrl(textValue) ? (
                  <LinkIcon size={14} className="text-amber-400" />
                ) : (
                  <FileText size={14} />
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-zinc-800/80 bg-zinc-950/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!imageUrl.trim()}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-display font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <Check size={14} />
            <span>{editingItem ? 'Save Changes' : 'Add Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
