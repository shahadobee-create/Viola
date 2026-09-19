import React, { useState } from 'react';
import { Conversation, ClientFile, CalendarEvent, ClientBriefData, InspirationItem } from '../../types';
import { 
  FileText, 
  Folder, 
  Calendar, 
  Users, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Lightbulb,
  Image as ImageIcon
} from 'lucide-react';

interface ToolsViewProps {
  conversations: Conversation[];
  inspirationItems?: InspirationItem[];
  onOpenChat: (id: string) => void;
  onOpenBrief: () => void;
  onOpenAssets: () => void;
  onOpenCalendar: () => void;
  onOpenAI: () => void;
  onOpenInspiration: (clientId?: string) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  conversations,
  inspirationItems = [],
  onOpenChat,
  onOpenBrief,
  onOpenAssets,
  onOpenCalendar,
  onOpenAI,
  onOpenInspiration,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const shortcuts = [
    { label: 'Inspiration', sub: 'Client Boards', icon: Lightbulb, onClick: () => onOpenInspiration() },
    { label: 'Client Brief', sub: 'Directives', icon: FileText, onClick: onOpenBrief },
    { label: 'Cloud UDrive', sub: 'Client Assets', icon: Folder, onClick: onOpenAssets },
    { label: 'Calendar', sub: 'Deadlines', icon: Calendar, onClick: onOpenCalendar },
    { label: 'Viola AI', sub: 'Assistant', icon: Sparkles, onClick: onOpenAI },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.lastMessageContent && c.lastMessageContent.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-28">
      {/* Curved Gold Gradient Header (from user design!) */}
      <div className="bg-gradient-to-b from-amber-500/15 via-[#121c21]/90 to-[#0A0A0B] border-b border-amber-500/20 rounded-b-[40px] px-5 sm:px-8 pt-6 pb-8 shadow-xl shadow-amber-500/5">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Search Line */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 max-w-sm relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients & workspaces..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/40 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 font-mono text-[10px] font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>SECURE NODE</span>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-display font-black text-3xl tracking-tight text-zinc-950 dark:text-white">
              Viola Clients
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-md font-medium">
              Manage enterprise directives, review 4K creative assets, synchronize milestones, and consult Viola intelligence.
            </p>
          </div>

          {/* Gold-Ring Shortcuts Row */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 no-scrollbar">
            {shortcuts.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.label}
                  onClick={s.onClick}
                  className="flex flex-col items-center gap-2 group shrink-0 transition-transform active:scale-95"
                >
                  <div className="w-16 h-16 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500/80 via-amber-400/30 to-transparent group-hover:from-amber-400 transition-all shadow-md shadow-amber-500/10">
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#141819] flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                      <Icon size={22} className="text-amber-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-bold text-xs text-zinc-900 dark:text-white block tracking-tight">
                      {s.label}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      {s.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Client Workspaces Feed */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Client Workspaces ({filteredConversations.length})
          </span>
          <span className="text-[11px] font-mono text-amber-500 font-bold">
            All nodes operational
          </span>
        </div>

        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#141819] overflow-hidden shadow-sm">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onOpenChat(conv.id)}
              className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={conv.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                  alt={conv.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm text-zinc-950 dark:text-white truncate">
                      {conv.name}
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {conv.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {conv.lastMessageContent || 'Active collaborative workspace'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Inspiration Quick Badge */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInspiration(conv.id);
                  }}
                  title={`Open Inspiration Board for ${conv.name}`}
                  className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Lightbulb size={12} />
                  <span className="hidden sm:inline">Inspiration</span>
                  <span className="px-1 rounded bg-amber-500/20 text-[9px]">
                    {inspirationItems.filter((i) => i.clientId === conv.id).length}
                  </span>
                </button>

                {conv.unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
                    {conv.unreadCount}
                  </span>
                )}
                <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Secured Node Guarantee Card */}
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 flex items-start gap-3 mt-6">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-500">
              Secured Viola Node
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
              Your directives, files, and milestones are secured with dual-authorization verification and encrypted revision logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
