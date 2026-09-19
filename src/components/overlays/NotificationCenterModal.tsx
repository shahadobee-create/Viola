import React from 'react';
import { ViolaNotification } from '../../types';
import { 
  X, 
  Bell, 
  MessageSquare, 
  CalendarDays, 
  Megaphone, 
  CheckCheck, 
  Check 
} from 'lucide-react';

interface NotificationCenterModalProps {
  notifications: ViolaNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification: (notif: ViolaNotification) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const getIcon = (kind: ViolaNotification['kind']) => {
    switch (kind) {
      case 'message':
        return <MessageSquare size={16} className="text-indigo-400" />;
      case 'calendar':
        return <CalendarDays size={16} className="text-amber-400" />;
      case 'approval':
        return <CheckCheck size={16} className="text-emerald-400" />;
      default:
        return <Megaphone size={16} className="text-rose-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4">
      <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-white">Agency Notices</h3>
              <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                {unreadCount > 0 ? `${unreadCount} UNREAD ALERTS` : 'ALL CLEAR'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
              >
                Mark all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notices List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              No recent notifications.
            </div>
          ) : (
            notifications.map((n) => {
              const isRead = !!n.readAt;

              return (
                <div
                  key={n.id}
                  onClick={() => onSelectNotification(n)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isRead 
                      ? 'bg-zinc-900/40 border-zinc-800/80 opacity-75' 
                      : 'bg-zinc-900 border-indigo-500/30 shadow-sm'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-zinc-800/80 shrink-0 mt-0.5">
                    {getIcon(n.kind)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-xs text-white truncate">{n.title}</h4>
                      {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{n.body}</p>
                    <span className="text-[10px] font-mono text-zinc-500 mt-1.5 block">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
