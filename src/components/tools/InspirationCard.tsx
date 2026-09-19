import React, { useState, useRef, useEffect } from 'react';
import { InspirationItem } from '../../types';
import { 
  ExternalLink, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Maximize2,
  Link as LinkIcon,
  FileText
} from 'lucide-react';

interface InspirationCardProps {
  item: InspirationItem;
  canEdit?: boolean;
  canDelete?: boolean;
  canPin?: boolean;
  onSelect?: (item: InspirationItem) => void;
  onEdit?: (item: InspirationItem) => void;
  onDelete?: (itemId: string) => void;
  onTogglePin?: (itemId: string) => void;
  onToggleLike?: (itemId: string) => void;
  onShareToChat?: (item: InspirationItem) => void;
  onTagClick?: (tag: string) => void;
  onUpdateNote?: (itemId: string, newNote: string) => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  item,
  canDelete = true,
  onSelect,
  onDelete,
  onUpdateNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(item.note || item.sourceUrl || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNoteText(item.note || item.sourceUrl || '');
  }, [item.note, item.sourceUrl]);

  useEffect(() => {
    if (isEditingNote && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingNote]);

  const imageUrl = (item.images && item.images.length > 0)
    ? item.images[0]
    : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';

  const isUrl = (text: string) => {
    if (!text) return false;
    const clean = text.trim();
    return clean.startsWith('http://') || 
           clean.startsWith('https://') || 
           clean.startsWith('www.') || 
           /^[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(clean);
  };

  const currentText = (item.note || item.sourceUrl || '').trim();
  const hasContent = currentText.length > 0;
  const isLink = hasContent && isUrl(currentText);

  const getHref = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const handleSaveNote = () => {
    setIsEditingNote(false);
    if (onUpdateNote) {
      onUpdateNote(item.id, noteText.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveNote();
    } else if (e.key === 'Escape') {
      setIsEditingNote(false);
      setNoteText(item.note || item.sourceUrl || '');
    }
  };

  return (
    <div className="group flex flex-col w-full">
      {/* 1. Main Image Container (Rounded-2xl, minimalist, faithful to reference) */}
      <div 
        onClick={() => onSelect && onSelect(item)}
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
      >
        <img
          src={imageUrl}
          alt={item.title || 'Inspiration'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* Subtle hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-start justify-between p-2">
          {/* Left: View full image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(item);
            }}
            title="View image"
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <Maximize2 size={12} />
          </button>

          {/* Right: Delete button */}
          {canDelete && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              title="Delete item"
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-red-600/90 text-zinc-300 hover:text-white flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Text / Note / Link Box (Exactly matching "Add a note..." in uploaded photo) */}
      <div className="mt-2 w-full">
        {isEditingNote ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/70 shadow-sm">
            <input
              ref={inputRef}
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveNote}
              placeholder="Type a note or link..."
              className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleSaveNote();
              }}
              className="p-1 rounded-md text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              title="Save"
            >
              <Check size={13} />
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setIsEditingNote(false);
                setNoteText(item.note || item.sourceUrl || '');
              }}
              className="p-1 rounded-md text-zinc-400 hover:bg-zinc-800 transition-colors"
              title="Cancel"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingNote(true)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all duration-150 ${
              hasContent
                ? 'bg-zinc-900/90 hover:bg-zinc-800/90 border-zinc-800 text-zinc-200'
                : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/60 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              {isLink ? (
                <LinkIcon size={12} className="text-amber-400 shrink-0" />
              ) : hasContent ? (
                <FileText size={12} className="text-zinc-400 shrink-0" />
              ) : null}

              <span className="truncate">
                {hasContent ? currentText : 'Add a note...'}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-1">
              {isLink && (
                <a
                  href={getHref(currentText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-colors"
                  title="Open link"
                >
                  <ExternalLink size={12} />
                </a>
              )}
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                <Edit2 size={11} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
