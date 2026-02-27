import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const MOODS = [
  { id: 'excited', icon: '🔥', label: 'Excited' },
  { id: 'relaxed', icon: '😌', label: 'Relaxed' },
  { id: 'competitive', icon: '⚡', label: 'Competitive' },
  { id: 'creative', icon: '🎨', label: 'Creative' },
  { id: 'adventurous', icon: '🗺️', label: 'Adventurous' },
  { id: 'social', icon: '👥', label: 'Social' },
  { id: 'focused', icon: '🎯', label: 'Focused' },
  { id: 'bored', icon: '😐', label: 'Bored' },
];

const ENERGIES = ['low', 'medium', 'high'];

export default function Dashboard() {
  const user = useAuthStore(s => s.user);
  const addToast = useUIStore(s => s.addToast);
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState('medium');
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/ai/recommendations').then(r => setRecs(r.data)).catch(() => {});
    api.get('/ai/profile-analysis').then(r => setStats(r.data)).catch(() => {});
  }, []);

  const submitMood = async (m) => {
    setMood(m);
    setLoading(true);
    try {
      const { data } = await api.post('/ai/mood', { mood: m, energy });
      setRecs({ recommendations: data.games, basedOn: { mood: m, energy } });
      addToast(`Mood set to ${m}! Generating recommendations...`, 'success');
    } catch { addToast('Failed to get recommendations', 'error'); }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome */}
      <div className="card p-6 bg-gradient-to-r from-agos-accent/10 to-agos-cyan/5">
        <h1 className="font-display font-bold text-2xl mb-1">Welcome back, <span className="text-agos-accent-light">{user?.displayName}</span> 👋</h1>
        <p className="text-agos-muted">Level {user?.level} · {user?.xp} XP · {user?.coins} 🪙 · {user?.gamesPlayed || 0} games played</p>
      </div>

      {/* Mood Selector */}
      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-4">🧠 How are you feeling?</h2>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {MOODS.map(m => (
            <button key={m.id} onClick={() => submitMood(m.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${mood === m.id ? 'border-agos-accent bg-agos-accent/15 text-agos-accent-light' : 'border-agos-border hover:border-agos-accent/50'}`}>
              <span className="text-2xl">{m.icon}</span>
              <span className="text-xs font-medium">{m.label}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-agos-muted">Energy:</span>
          {ENERGIES.map(e => (
            <button key={e} onClick={() => setEnergy(e)}
              className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${energy === e ? 'border-agos-cyan bg-agos-cyan/15 text-agos-cyan' : 'border-agos-border hover:border-agos-cyan/50'}`}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      {recs?.recommendations && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-4">🎮 Recommended for You
            {recs.basedOn && <span className="text-sm font-normal text-agos-muted ml-2">({recs.basedOn.mood} · {recs.basedOn.energy} energy)</span>}
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {recs.recommendations.map(g => (
                <a key={g.id} href={g.url} target="_blank" rel="noopener noreferrer"
                  className="card p-3 hover:border-agos-accent group cursor-pointer">
                  <div className="font-semibold text-sm mb-1 group-hover:text-agos-accent-light truncate">{g.title}</div>
                  <div className="flex gap-1 flex-wrap mb-2">{g.genres?.map(ge => <span key={ge} className="text-[10px] font-mono px-1.5 py-0.5 bg-agos-accent/10 text-agos-accent-light rounded">{ge}</span>)}</div>
                  <div className="flex justify-between text-xs text-agos-muted">
                    <span>⭐ {g.rating}</span>
                    <span>👥 {g.players?.toLocaleString()}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Analysis */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="text-sm text-agos-muted mb-2">Gamer Archetype</div>
            <div className="font-display font-bold text-xl text-agos-accent-light">{stats.archetype?.archetype}</div>
            <p className="text-xs text-agos-muted mt-1">{stats.archetype?.description}</p>
          </div>
          <div className="card p-5">
            <div className="text-sm text-agos-muted mb-2">Playstyle</div>
            {stats.playstyle && Object.entries(stats.playstyle).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-20 capitalize text-agos-muted">{k}</span>
                <div className="flex-1 h-1.5 bg-agos-surface rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-agos-accent to-agos-cyan rounded-full" style={{ width: `${v}%` }} />
                </div>
                <span className="text-xs font-mono text-agos-dim w-6">{v}</span>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <div className="text-sm text-agos-muted mb-2">Stats</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-agos-muted">Games Played</span><span className="font-bold">{stats.stats?.totalGamesPlayed}</span></div>
              <div className="flex justify-between"><span className="text-agos-muted">Moods Submitted</span><span className="font-bold">{stats.stats?.moodCount}</span></div>
              <div className="flex justify-between"><span className="text-agos-muted">Top Genres</span><span className="font-bold text-agos-accent-light">{stats.stats?.favoriteGenres?.join(', ') || '—'}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
