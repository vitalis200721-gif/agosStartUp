import { useState, useEffect, useRef } from 'react';
import api from '../api/client';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef();

  const load = () => {
    api.get('/notifications').then(r => {
      setNotifs(r.data.notifications || []);
      setUnread(r.data.unreadCount || 0);
    }).catch(() => {});
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = async () => {
    await api.post('/notifications/read');
    setUnread(0);
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const typeIcon = (type) => {
    switch (type) {
      case 'quest': return '⚡';
      case 'achievement': return '🏆';
      case 'faction': return '⚔️';
      case 'friend': return '👤';
      default: return '🔔';
    }
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => { setOpen(!open); if (!open && unread > 0) markAllRead(); }}
        className="relative p-2 rounded-lg hover:bg-agos-accent/10 transition-colors">
        <svg className="w-5 h-5 text-agos-dim hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-[9px] text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/30 animate-pulse">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-agos-surface border border-agos-border rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-agos-border flex items-center justify-between">
            <span className="font-semibold text-sm">Notifications</span>
            {unread > 0 && <button onClick={markAllRead} className="text-[10px] text-agos-accent hover:text-agos-accent-light">Mark all read</button>}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="p-6 text-center text-agos-dim text-sm">No notifications yet</div>
            ) : notifs.map((n, i) => (
              <div key={i} className={`px-4 py-3 border-b border-agos-border last:border-0 flex gap-3 hover:bg-agos-accent/5 transition-colors ${!n.isRead ? 'bg-agos-accent/[0.03]' : ''}`}>
                <span className="text-lg mt-0.5">{typeIcon(n.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-xs">{n.title}</span>
                    {!n.isRead && <span className="w-1.5 h-1.5 bg-agos-accent rounded-full" />}
                  </div>
                  <p className="text-[11px] text-agos-dim leading-relaxed">{n.message}</p>
                  <span className="text-[9px] text-agos-dim/50 mt-0.5 block">{timeAgo(n.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
