import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

export default function Factions() {
  const user = useAuthStore(s => s.user);
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);
  const [factions, setFactions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [f, l] = await Promise.all([api.get('/factions'), api.get('/factions/leaderboard')]);
      setFactions(f.data.factions);
      setLeaderboard(l.data.leaderboard);
    } catch { addToast('Failed to load factions', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const joinFaction = async (id) => {
    try {
      const { data } = await api.post(`/factions/${id}/join`);
      addToast(data.message, 'success');
      await fetchMe();
      load();
    } catch (err) { addToast(err.response?.data?.error || 'Failed to join', 'error'); }
  };

  const leaveFaction = async () => {
    try {
      await api.post('/factions/leave');
      addToast('Left faction', 'info');
      await fetchMe();
      load();
    } catch (err) { addToast(err.response?.data?.error || 'Failed to leave', 'error'); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl">⚔️ Factions</h1>
        {user?.faction && <button onClick={leaveFaction} className="btn-secondary text-xs">Leave Faction</button>}
      </div>

      {/* Leaderboard */}
      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-4">🏆 Weekly Leaderboard</h2>
        <div className="space-y-2">
          {leaderboard.map((f, i) => (
            <div key={f._id} className={`flex items-center gap-3 p-3 rounded-lg border ${i === 0 ? 'border-agos-amber bg-agos-amber/5' : 'border-agos-border'}`}>
              <span className="font-display font-bold text-lg w-8 text-center" style={{ color: i < 3 ? ['#f59e0b', '#94a3b8', '#cd7f32'][i] : '#4a4f6e' }}>#{f.rank}</span>
              <span className="text-xl">{f.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{f.name}</div>
                <div className="text-xs text-agos-muted">{f.memberCount} members · {f.territories} territories</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-agos-accent-light">{f.weeklyXp.toLocaleString()} XP</div>
                <div className="text-xs text-agos-dim">Lvl {f.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factions.map(f => {
          const isMine = user?.faction?._id === f._id || user?.faction === f._id;
          return (
            <div key={f._id} className={`card p-5 ${isMine ? 'border-agos-accent ring-1 ring-agos-accent/30' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-display font-bold">{f.name}</h3>
                  <p className="text-xs text-agos-muted">{f.memberCount}/{f.maxMembers} members</p>
                </div>
                {isMine && <span className="ml-auto text-xs font-mono bg-agos-accent/20 text-agos-accent-light px-2 py-1 rounded">YOUR FACTION</span>}
              </div>
              <p className="text-sm text-agos-muted mb-3">{f.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-agos-surface rounded">
                  <div className="font-bold text-sm">{f.xp?.toLocaleString()}</div>
                  <div className="text-[10px] text-agos-dim">TOTAL XP</div>
                </div>
                <div className="text-center p-2 bg-agos-surface rounded">
                  <div className="font-bold text-sm">{f.territories}</div>
                  <div className="text-[10px] text-agos-dim">TERRITORY</div>
                </div>
                <div className="text-center p-2 bg-agos-surface rounded">
                  <div className="font-bold text-sm">Lvl {f.level}</div>
                  <div className="text-[10px] text-agos-dim">LEVEL</div>
                </div>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden bg-agos-surface">
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (f.memberCount / f.maxMembers) * 100)}%`, background: f.color }} />
              </div>
              {!user?.faction && !isMine && (
                <button onClick={() => joinFaction(f._id)} className="btn-primary w-full mt-3 text-xs py-2">Join Faction</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
