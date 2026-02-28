import { useState, useEffect } from 'react';
import api from '../api/client';

const TABS = [
  { key: 'xp', label: 'XP', icon: '⚡' },
  { key: 'coins', label: 'Coins', icon: '🪙' },
  { key: 'level', label: 'Level', icon: '🎖️' },
];

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const [tab, setTab] = useState('xp');
  const [data, setData] = useState({ players: [], myRank: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/leaderboard?type=${tab}`).then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [tab]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-agos-surface via-agos-accent/5 to-agos-surface rounded-xl p-6 border border-agos-border">
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><span className="text-3xl">🏆</span> Leaderboard</h1>
        <p className="text-agos-dim text-sm mt-1">Top players across the AGOS ecosystem</p>
        {data.myRank && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-agos-accent/10 rounded-full text-sm">
            <span className="text-agos-accent-light">Your Rank:</span>
            <span className="font-bold text-agos-accent">#{data.myRank}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-agos-accent text-white shadow-lg shadow-agos-accent/20' : 'bg-agos-surface border border-agos-border text-agos-dim hover:text-white hover:border-agos-accent/30'}`}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-agos-surface rounded-xl border border-agos-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-agos-dim animate-pulse">Loading leaderboard...</div>
        ) : data.players.length === 0 ? (
          <div className="p-8 text-center text-agos-dim">No players yet. Be the first!</div>
        ) : (
          <div className="divide-y divide-agos-border">
            {data.players.map((p, i) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-agos-accent/5 ${i < 3 ? 'bg-agos-accent/[0.03]' : ''}`}>
                {/* Rank */}
                <div className="w-10 text-center">
                  {i < 3 ? (
                    <span className="text-2xl">{MEDALS[i]}</span>
                  ) : (
                    <span className="text-agos-dim font-mono text-sm">#{i + 1}</span>
                  )}
                </div>
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' : i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-agos-accent/20 text-agos-accent-light'}`}>
                  {p.displayName?.charAt(0).toUpperCase() || '?'}
                </div>
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{p.displayName}</div>
                  <div className="text-[10px] text-agos-dim">
                    {p.faction && <span className="px-1.5 py-0.5 bg-agos-accent/10 rounded-full text-agos-accent-light">{p.faction}</span>}
                  </div>
                </div>
                {/* Stats */}
                <div className="text-right">
                  <div className="font-bold text-sm">
                    {tab === 'xp' && <span className="text-violet-400">{p.xp?.toLocaleString()} XP</span>}
                    {tab === 'coins' && <span className="text-amber-400">{p.coins?.toLocaleString()} 🪙</span>}
                    {tab === 'level' && <span className="text-emerald-400">Lvl {p.level}</span>}
                  </div>
                  <div className="text-[10px] text-agos-dim">Lvl {p.level}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
