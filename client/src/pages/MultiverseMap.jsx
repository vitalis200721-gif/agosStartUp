import { useState, useEffect } from 'react';
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
  const [activeGame, setActiveGame] = useState(null);

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
      {selected && !activeGame && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-4">
            {selected} <span className="text-sm font-normal text-agos-muted">({games.length} games)</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {games.map(g => (
              <div key={g._id || g.id} onClick={() => setActiveGame(g)}
                className="card border border-agos-border hover:border-agos-accent hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] group cursor-pointer transition-all overflow-hidden flex flex-col h-full bg-[#1e293b]/50">
                
                {/* Thumbnail Image */}
                <div className="w-full aspect-[16/9] bg-black overflow-hidden relative">
                  {g.image ? (
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-display opacity-30">{g.title.substring(0,2)}</div>
                  )}
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-agos-accent flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <div className="font-semibold text-sm mb-1 group-hover:text-agos-accent-light truncate">{g.title}</div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {g.genres?.map(ge => (
                      <span key={ge} className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded" style={{ background: `${CLUSTER_COLORS[ge] || CLUSTER_COLORS.default}20`, color: CLUSTER_COLORS[ge] || CLUSTER_COLORS.default }}>
                        {ge}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-end text-xs text-agos-muted mt-auto pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">⭐ {g.rating || '4.5'}</span>
                    <span className="flex items-center gap-1">👥 {g.players ? (g.players/1000).toFixed(1)+'k' : '5k'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Game Player Modal */}
      {activeGame && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col">
          {/* Header Bar */}
          <div className="h-14 bg-agos-bg border-b border-agos-border flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="font-display font-bold text-lg text-white">{activeGame.title}</div>
              <div className="hidden md:flex gap-2">
                {activeGame.genres?.map(ge => (
                  <span key={ge} className="text-[10px] uppercase font-mono px-2 py-1 rounded-full border border-white/10 text-agos-muted">
                    {ge}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => setActiveGame(null)} 
              className="px-4 py-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              Exit Game
            </button>
          </div>
          
          {/* Iframe Container */}
          <div className="flex-1 w-full bg-black relative">
            <iframe 
              src={`https://www.crazygames.com/embed/${activeGame.embedSlug || activeGame.id}`} 
              style={{ width: '100%', height: '100%', border: 'none' }} 
              allow="gamepad; microphone; camera; display-capture; midi; xr-spatial-tracking; fullscreen"
              title={activeGame.title}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
