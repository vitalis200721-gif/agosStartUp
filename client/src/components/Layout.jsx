import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import { APP_VERSION, isEnabled } from '../config';
import { track, Events } from '../analytics';
import FeedbackModal from './FeedbackModal';
import GlobalChat from './GlobalChat';
import api from '../api/client';

const NAV = [
  { to: '/', icon: '⬡', label: 'Dashboard', feature: 'dashboard' },
  { to: '/map', icon: '🪐', label: 'Multiverse', feature: 'multiverse' },
  { to: '/factions', icon: '⚔️', label: 'Factions', feature: 'factions' },
  { to: '/marketplace', icon: '💎', label: 'Market', feature: 'marketplace' },
  { to: '/events', icon: '🌠', label: 'Events', feature: 'events' },
  { to: '/hacking', icon: '🔓', label: 'Hacking', feature: 'hacking' },
  { to: '/premium', icon: '👑', label: 'Premium', feature: 'premium' },
  { to: '/profile', icon: '🧬', label: 'Profile', feature: 'profile' },
];

export default function Layout() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const { sidebarOpen, toggleSidebar, realityDistortion, toggleReality, onlineUsers } = useUIStore();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  // Health check
  useEffect(() => {
    api.get('/health').then(() => setApiStatus('online')).catch(() => setApiStatus('offline'));
    const interval = setInterval(() => {
      api.get('/health').then(() => setApiStatus('online')).catch(() => setApiStatus('offline'));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRealityToggle = () => {
    toggleReality();
    track(Events.REALITY_MODE_TOGGLED, { enabled: !realityDistortion });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-agos-surface border-r border-agos-border flex flex-col transition-all duration-300 shrink-0 max-md:absolute max-md:z-40 max-md:h-full ${!sidebarOpen ? 'max-md:-translate-x-full' : ''}`}>
        <div className="p-4 border-b border-agos-border flex items-center gap-3 cursor-pointer hover:bg-agos-accent/5 transition-colors" onClick={() => navigate('/')}>
          <span className="text-2xl text-agos-accent-light">⬡</span>
          {sidebarOpen && (
            <div>
              <span className="font-display font-bold text-sm tracking-wider">AGOS</span>
              <span className="text-[9px] font-mono text-agos-dim ml-1">v{APP_VERSION}</span>
            </div>
          )}
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {NAV.filter(n => isEnabled(n.feature)).map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-agos-accent/15 text-agos-accent-light' : 'text-agos-muted hover:bg-agos-accent/5 hover:text-agos-text'}`}>
              <span className="text-lg w-6 text-center">{n.icon}</span>
              {sidebarOpen && <span>{n.label}</span>}
            </NavLink>
          ))}
          <hr className="border-agos-border my-2" />
          <NavLink to="/about"
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-agos-accent/15 text-agos-accent-light' : 'text-agos-dim hover:text-agos-muted'}`}>
            <span className="text-sm w-6 text-center">ℹ️</span>
            {sidebarOpen && <span>About</span>}
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin"
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-agos-accent/15 text-agos-accent-light' : 'text-agos-dim hover:text-agos-muted'}`}>
              <span className="text-sm w-6 text-center">⚙️</span>
              {sidebarOpen && <span>Admin</span>}
            </NavLink>
          )}
        </nav>
        <div className="p-3 border-t border-agos-border space-y-1.5">
          {isEnabled('feedbackButton') && (
            <button onClick={() => setShowFeedback(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-agos-dim hover:text-agos-cyan transition-all">
              <span>📬</span>{sidebarOpen && <span>Feedback</span>}
            </button>
          )}
          {isEnabled('realityMode') && (
            <button onClick={handleRealityToggle}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all ${realityDistortion ? 'bg-agos-pink/20 text-agos-pink' : 'text-agos-dim hover:text-agos-muted'}`}>
              <span>🌀</span>{sidebarOpen && <span>Reality Distortion</span>}
            </button>
          )}
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-agos-dim hover:text-agos-red transition-all">
            <span>🚪</span>{sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} />}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-agos-surface/90 backdrop-blur-lg border-b border-agos-border flex items-center px-4 gap-4 shrink-0">
          <button onClick={toggleSidebar} className="text-agos-muted hover:text-agos-text transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          {/* API Status */}
          <div className="flex items-center gap-1.5" title={`API: ${apiStatus}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${apiStatus === 'online' ? 'bg-agos-green' : apiStatus === 'offline' ? 'bg-agos-red animate-pulse' : 'bg-agos-amber'}`} />
            {apiStatus === 'offline' && <span className="text-[10px] text-agos-red">Offline</span>}
          </div>
          {/* Online Users */}
          {onlineUsers > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-agos-green/10 border border-agos-green/20">
              <div className="w-1.5 h-1.5 rounded-full bg-agos-green animate-pulse" />
              <span className="text-[10px] font-mono text-agos-green">{onlineUsers} online</span>
            </div>
          )}
          <div className="flex-1" />
          {user && (
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">{user.displayName}</div>
                <div className="text-xs text-agos-muted">Lvl {user.level} · {user.coins} 🪙</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-agos-accent/30 flex items-center justify-center text-sm font-bold">
                {user.displayName?.[0]?.toUpperCase()}
              </div>
            </div>
          )}
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
        {/* Footer links */}
        <footer className="h-8 border-t border-agos-border flex items-center justify-center gap-4 text-[10px] text-agos-dim shrink-0">
          <a href="/privacy" className="hover:text-agos-muted transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-agos-muted transition-colors">Terms</a>
          <span>AGOS v{APP_VERSION}</span>
        </footer>
      </div>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      <GlobalChat />
    </div>
  );
}
