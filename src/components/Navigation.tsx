import React from 'react';
import { TabType } from '../types';
import { 
  Home,
  Sparkles,
  Bot,
  Folder,
  User,
  Search, 
  Bell, 
  Share2, 
  Sun, 
  Moon, 
  Smartphone, 
  Maximize2,
  Calendar
} from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadChatCount: number;
  unreadNotifCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenSocial: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const TopHeader: React.FC<{
  title?: string;
  subtitle?: string;
  unreadNotifCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenSocial: () => void;
  onOpenCalendar?: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}> = ({
  title = 'Viola',
  subtitle = 'Agency Workspace',
  unreadNotifCount,
  isDark,
  onToggleTheme,
  onOpenSearch,
  onOpenNotifications,
  onOpenSocial,
  onOpenCalendar,
  isMobileFrame,
  onToggleFrame,
}) => {
  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0A0A0B]/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-fuchsia-600 p-[1.5px] shadow-sm shadow-indigo-500/20">
          <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0A0A0B] flex items-center justify-center">
            <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-tr from-amber-500 to-indigo-500">
              V
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-base tracking-tight text-zinc-950 dark:text-white">
              {title}
            </h1>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-[9px] font-bold uppercase tracking-wider">
              PRO
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 -mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onToggleFrame}
          title={isMobileFrame ? "Switch to Fullscreen" : "Switch to Mobile Viewport"}
          className="hidden md:flex p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
        >
          {isMobileFrame ? <Maximize2 size={17} /> : <Smartphone size={17} />}
        </button>

        <button
          onClick={onOpenNotifications}
          title="Notices & Activity"
          className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors relative"
        >
          <Bell size={18} />
          {unreadNotifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#0A0A0B]" />
          )}
        </button>

        {onOpenCalendar && (
          <button
            onClick={onOpenCalendar}
            title="Daily Routine & Calendar Deadlines"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
          >
            <Calendar size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

export const BottomTabBar: React.FC<{
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadChatCount: number;
}> = ({ activeTab, onTabChange, unreadChatCount }) => {
  const tabs = [
    { id: 'feed' as TabType, icon: Home, ariaLabel: 'Home' },
    { id: 'viola' as TabType, icon: Sparkles, ariaLabel: 'Viola Agency' },
    { id: 'ai' as TabType, icon: Bot, ariaLabel: 'Viola AI' },
    { id: 'chats' as TabType, icon: Folder, ariaLabel: 'Chatting & Workspaces', badge: unreadChatCount },
    { id: 'profile' as TabType, icon: User, ariaLabel: 'Profile & Settings' },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      {/* Floating Glassmorphism Capsule Bar matching reference image */}
      <div className="bg-[#121118]/75 dark:bg-[#0D0B12]/80 backdrop-blur-2xl border border-white/10 dark:border-white/15 rounded-full p-1.5 sm:p-2 shadow-2xl shadow-black/80 flex items-center gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = 
            activeTab === tab.id || 
            (tab.id === 'chats' && (activeTab === 'tools' || activeTab === 'assets' || activeTab === 'inspiration')) ||
            (tab.id === 'profile' && activeTab === 'contacts');

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.ariaLabel}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'bg-white text-zinc-950 shadow-md shadow-white/20 scale-100'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95'
              }`}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.3 : 1.9} 
              />
              {!!tab.badge && tab.badge > 0 && !isActive && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#121118]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
