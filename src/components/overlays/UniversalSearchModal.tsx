import React, { useState, useMemo } from 'react';
import { Conversation, ClientFile, FeedItem, InspirationItem } from '../../types';
import { Search, X, MessageCircle, FileText, Newspaper, ArrowRight, Play, Lightbulb } from 'lucide-react';

interface UniversalSearchModalProps {
  onClose: () => void;
  conversations: Conversation[];
  files: ClientFile[];
  feedItems: FeedItem[];
  inspirationItems?: InspirationItem[];
  onSelectConversation: (id: string) => void;
  onOpenBrief: () => void;
  onOpenAssets: () => void;
  onOpenInspiration?: (clientId?: string) => void;
}

const CATEGORY_TABS = ['All', 'Inspiration', 'Chats', 'Files', 'Dispatches'] as const;

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  onClose,
  conversations,
  files,
  feedItems,
  inspirationItems = [],
  onSelectConversation,
  onOpenBrief,
  onOpenAssets,
  onOpenInspiration,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORY_TABS)[number]>('All');

  const allSearchItems = useMemo(() => {
    const inspItems = inspirationItems.map((item) => ({
      id: `insp_${item.id}`,
      title: item.title,
      subtitle: `${item.clientName} · ${item.category} · ${item.note.slice(0, 60)}...`,
      category: 'Inspiration' as const,
      icon: Lightbulb,
      color: '#f59e0b',
      onClick: () => {
        onClose();
        if (onOpenInspiration) onOpenInspiration(item.clientId);
      },
    }));

    const chatItems = conversations.map((c) => ({
      id: `chat_${c.id}`,
      title: c.name,
      subtitle: c.lastMessageContent || 'Encrypted conversation',
      category: 'Chats' as const,
      icon: MessageCircle,
      color: '#818cf8',
      onClick: () => {
        onClose();
        onSelectConversation(c.id);
      },
    }));

    const fileItems = files.map((f) => ({
      id: `file_${f.id}`,
      title: f.name,
      subtitle: `${f.folder} · ${f.size} · Version ${f.version}`,
      category: 'Files' as const,
      icon: f.folder === 'Videos' ? Play : FileText,
      color: '#f59e0b',
      onClick: () => {
        onClose();
        onOpenAssets();
      },
    }));

    const dispatchItems = feedItems.map((d) => ({
      id: `dispatch_${d.id}`,
      title: d.title,
      subtitle: d.summary || d.authorName,
      category: 'Dispatches' as const,
      icon: Newspaper,
      color: '#ec4899',
      onClick: () => {
        onClose();
      },
    }));

    return [
      ...inspItems,
      ...chatItems,
      ...fileItems,
      ...dispatchItems,
      {
        id: 'brief_quick',
        title: 'Client Brief Directives',
        subtitle: 'Production requirements & branding parameters',
        category: 'Files' as const,
        icon: FileText,
        color: '#10b981',
        onClick: () => {
          onClose();
          onOpenBrief();
        },
      },
    ];
  }, [inspirationItems, conversations, files, feedItems, onClose, onSelectConversation, onOpenAssets, onOpenBrief, onOpenInspiration]);

  const filteredResults = useMemo(() => {
    return allSearchItems.filter((item) => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchesCat = category === 'All' || item.category === category;
      return matchesQuery && matchesCat;
    });
  }, [allSearchItems, query, category]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4">
      <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search size={18} className="text-zinc-400 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all conversations, briefs, 4K files, dispatches..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-zinc-500 hover:text-white">
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white ml-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2 border-b border-zinc-800/60 bg-[#10131A] flex items-center gap-1.5">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredResults.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              No matching records found across Viola network.
            </div>
          ) : (
            filteredResults.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.id}
                  onClick={res.onClick}
                  className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 cursor-pointer flex items-center justify-between gap-3 group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800"
                      style={{ backgroundColor: `${res.color}15`, color: res.color }}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                          {res.title}
                        </h4>
                        <span className="px-1.5 py-0.2 rounded font-mono text-[9px] uppercase tracking-wider text-zinc-400 bg-zinc-800">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-medium">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight size={15} className="text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 bg-[#10131A] text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Viola · Universal Global Indexer
        </div>
      </div>
    </div>
  );
};
