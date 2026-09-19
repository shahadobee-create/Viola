import React, { useState, useMemo } from 'react';
import { Conversation, InspirationItem } from '../../types';
import { 
  Search, 
  Plus, 
  VolumeX, 
  FileText, 
  Folder, 
  Calendar, 
  Lightbulb, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';

interface ChatListViewProps {
  conversations: Conversation[];
  inspirationItems?: InspirationItem[];
  onSelectConversation: (conversationId: string) => void;
  onOpenNewChat: () => void;
  onOpenBrief?: () => void;
  onOpenAssets?: () => void;
  onOpenCalendar?: () => void;
  onOpenAI?: () => void;
  onOpenInspiration?: (clientId?: string) => void;
}

export const ChatListView: React.FC<ChatListViewProps> = ({
  conversations,
  inspirationItems = [],
  onSelectConversation,
  onOpenNewChat,
  onOpenBrief,
  onOpenAssets,
  onOpenCalendar,
  onOpenAI,
  onOpenInspiration,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const shortcuts = [
    { label: 'Inspiration', sub: 'Client Boards', icon: Lightbulb, onClick: () => onOpenInspiration?.() },
    { label: 'Client Brief', sub: 'Directives', icon: FileText, onClick: onOpenBrief },
    { label: 'Cloud UDrive', sub: 'Client Assets', icon: Folder, onClick: onOpenAssets },
    { label: 'Calendar', sub: 'Deadlines', icon: Calendar, onClick: onOpenCalendar },
  ];

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.lastMessageContent && c.lastMessageContent.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [conversations, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-28">
      {/* Search & New Chat Action Area */}
      <div className="px-4 sm:px-6 pt-5 pb-3">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages, clients, directives, or topics..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#141819] text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={onOpenNewChat}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Client Tools Hub (Merged from Clients workspace) */}
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Client Tools & Intelligence
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1 no-scrollbar">
            {shortcuts.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.label}
                  onClick={s.onClick}
                  className="flex flex-col items-center gap-1.5 group shrink-0 transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 rounded-2xl p-[1.5px] bg-gradient-to-tr from-amber-500/70 via-amber-400/20 to-transparent group-hover:from-amber-400 transition-all shadow-sm">
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#141819] flex items-center justify-center border border-zinc-200/80 dark:border-zinc-800 group-hover:border-amber-500/40">
                      <Icon size={19} className="text-amber-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-bold text-[11px] text-zinc-900 dark:text-white block tracking-tight">
                      {s.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Unified Conversations & Client Channels List */}
      <div className="flex-1 divide-y divide-zinc-100 dark:divide-zinc-900/60 px-2 sm:px-4">
        {filteredConversations.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <MessageSquare size={32} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-2" />
            <p className="text-xs font-medium">No matching channels or client workspaces found.</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isOnline = conv.type === 'dm' ? conv.otherUser?.isOnline : true;
            const clientPins = inspirationItems.filter((i) => i.clientId === conv.id);
            const isClientWorkspace = conv.type === 'group' || conv.name.toLowerCase().includes('client') || conv.name.toLowerCase().includes('smart') || conv.name.toLowerCase().includes('nali') || conv.name.toLowerCase().includes('haji');

            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className="p-3 rounded-2xl hover:bg-white/80 dark:hover:bg-[#141819]/80 cursor-pointer transition-all flex items-center justify-between gap-3.5 group my-0.5"
              >
                {/* Left: Avatar & Meta */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                      alt={conv.name}
                      className="w-13 h-13 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm"
                    />
                    {isOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0A0A0B]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-display font-bold text-sm text-zinc-950 dark:text-white truncate">
                          {conv.name}
                        </h3>
                        {isClientWorkspace ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
                            CLIENT
                          </span>
                        ) : conv.type === 'group' ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-500 shrink-0">
                            GROUP
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-500 shrink-0">
                            DM
                          </span>
                        )}
                        {conv.isMuted && (
                          <VolumeX size={13} className="text-amber-500/80 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap ml-2">
                        {conv.lastMessageTime || '11:45 PM'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                        {conv.typingStatus ? (
                          <span className="text-amber-600 dark:text-amber-400 font-medium animate-pulse">
                            {conv.typingStatus}
                          </span>
                        ) : (
                          conv.lastMessageContent || 'Active collaborative channel'
                        )}
                      </p>

                      {conv.unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] font-mono shrink-0 shadow-sm">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quick Inspiration Action & Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  {clientPins.length > 0 && onOpenInspiration && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInspiration(conv.id);
                      }}
                      title={`Open Inspiration Board for ${conv.name}`}
                      className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Lightbulb size={12} />
                      <span className="hidden sm:inline">Board</span>
                      <span className="px-1 rounded bg-amber-500/20 text-[9px]">
                        {clientPins.length}
                      </span>
                    </button>
                  )}
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
