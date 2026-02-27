import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURES, APP_VERSION } from '../config';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

export default function AdminPanel() {
  const user = useAuthStore(s => s.user);
  const addToast = useUIStore(s => s.addToast);
  const [flags, setFlags] = useState({ ...FEATURES });

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">🔒</div>
        <p className="text-agos-muted">Admin access required</p>
      </div>
    );
  }

  const toggle = (key) => {
    const updated = { ...flags, [key]: !flags[key] };
    setFlags(updated);
    // In production: persist to server / environment
    FEATURES[key] = updated[key];
    addToast(`${key}: ${updated[key] ? 'ON' : 'OFF'}`, updated[key] ? 'success' : 'warning');
  };

  return (
    <div className="space-y-6 max-w-2xl animate-slide-up">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl">⚙️ Admin Panel</h1>
        <span className="text-xs font-mono text-agos-dim">v{APP_VERSION}</span>
      </div>

      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-4">Feature Toggles</h2>
        <div className="space-y-2">
          {Object.entries(flags).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-agos-surface rounded-lg">
              <span className="text-sm font-mono">{key}</span>
              <button onClick={() => toggle(key)}
                className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-agos-green' : 'bg-agos-dim'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${value ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-3">System Info</h2>
        <div className="text-sm space-y-1 text-agos-muted">
          <div>Version: <span className="font-mono text-agos-text">{APP_VERSION}</span></div>
          <div>Environment: <span className="font-mono text-agos-text">{import.meta.env.MODE}</span></div>
          <div>User: <span className="font-mono text-agos-text">{user?.email}</span></div>
          <div>Role: <span className="font-mono text-agos-accent-light">{user?.role}</span></div>
        </div>
      </div>
    </div>
  );
}
