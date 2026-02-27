import { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../store';
import api from '../api/client';

const CLUSTER_COLORS = {
  Action: '#ef4444', Shooter: '#f97316', Racing: '#f59e0b', RPG: '#a855f7',
  Adventure: '#8b5cf6', Strategy: '#3b82f6', Puzzle: '#06b6d4', Multiplayer: '#ec4899',
  '.io': '#22c55e', Idle: '#6b7280', Simulation: '#14b8a6', Sports: '#10b981',
  Building: '#f472b6', Horror: '#991b1b', Survival: '#84cc16', Casual: '#fb923c',
  Card: '#0ea5e9', Board: '#8b5cf6', Arcade: '#d946ef', Platformer: '#4ade80',
  Word: '#38bdf8', default: '#7c3aed'
};

export default function MultiverseMap() {
  const addToast = useUIStore(s => s.addToast);
  const [clusters, setClusters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    api.get('/games/clusters').then(r => {
      setClusters(r.data.clusters);
      setLoading(false);
    }).catch(() => { addToast('Failed to load map data', 'error'); setLoading(false); });
  }, []);

  const selectCluster = async (cluster) => {
    setSelected(cluster.genre);
    try {
      const { data } = await api.get('/games', { params: { genre: cluster.genre, limit: 12 } });
      setGames(data.games);
    } catch { addToast('Failed to load games', 'error'); }
  };

  const searchGames = async () => {
    if (!search.trim()) return;
    try {
      const { data } = await api.get('/games', { params: { search, limit: 12 } });
      setGames(data.games);
      setSelected(`Search: ${search}`);
    } catch { addToast('Search failed', 'error'); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl">🪐 Multiverse Map</h1>
        <div className="flex gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchGames()}
            placeholder="Search games..." className="input-field text-sm py-2 w-48" />
          <button onClick={searchGames} className="btn-secondary text-xs">Search</button>
        </div>
      </div>

      {/* Genre Cluster Map */}
      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-4">Genre Clusters</h2>
        <div className="flex flex-wrap gap-3">
          {clusters.map(c => {
            const color = CLUSTER_COLORS[c.genre] || CLUSTER_COLORS.default;
            const size = Math.max(60, Math.min(120, c.count * 12));
            return (
              <button key={c.genre} onClick={() => selectCluster(c)}
                className={`rounded-full flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg ${selected === c.genre ? 'ring-2 ring-white scale-105' : ''}`}
                style={{ width: size, height: size, background: `${color}20`, border: `2px solid ${color}`, boxShadow: selected === c.genre ? `0 0 20px ${color}50` : 'none' }}>
                <span className="text-xs font-bold" style={{ color }}>{c.genre}</span>
                <span className="text-[10px] font-mono text-agos-dim">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Games Grid */}
      {selected && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-4">
            {selected} <span className="text-sm font-normal text-agos-muted">({games.length} games)</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {games.map(g => (
              <a key={g.id} href={g.url} target="_blank" rel="noopener noreferrer"
                className="card p-3 hover:border-agos-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.15)] group cursor-pointer">
                <div className="font-semibold text-sm mb-1 group-hover:text-agos-accent-light truncate">{g.title}</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {g.genres?.map(ge => (
                    <span key={ge} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${CLUSTER_COLORS[ge] || CLUSTER_COLORS.default}20`, color: CLUSTER_COLORS[ge] || CLUSTER_COLORS.default }}>
                      {ge}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-agos-muted">
                  <span>⭐ {g.rating}</span>
                  <span>👥 {g.players?.toLocaleString()}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
