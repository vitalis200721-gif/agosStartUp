import { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuthStore } from '../store';

const TABS = [
  { key: 'xp', label: 'Top Explorers (XP)', icon: '⭐' },
  { key: 'coins', label: 'Wealthiest (Coins)', icon: '💰' },
  { key: 'hackingWins', label: 'Best Hackers', icon: '💻' }
];

export default function Leaderboard() {
  const [tab, setTab] = useState('xp');
  const [data, setData] = useState({ players: [], myRank: null });
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    setLoading(true);
    api.get(`/leaderboard?type=${tab}`).then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [tab]);

  const getValueLabel = (player) => {
    if (tab === 'xp') return `${player.xp?.toLocaleString() || 0} XP`;
    if (tab === 'coins') return `${player.coins?.toLocaleString() || 0} Coins`;
    if (tab === 'hackingWins') return `${player.hackingWins || 0} Wins`;
    return '';
  };

  const getValueColor = () => {
    if (tab === 'xp') return 'text-violet-400';
    if (tab === 'coins') return 'text-amber-400';
    if (tab === 'hackingWins') return 'text-emerald-400';
    return 'text-white';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in p-4 lg:p-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-agos-surface via-agos-accent/10 to-transparent rounded-xl p-6 border border-agos-border">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <span className="text-4xl drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">🏆</span> 
          Global <span className="text-agos-accent">Leaderboard</span>
        </h1>
        <p className="text-agos-dim mt-2">The highest-ranking operators in the AGOS ecosystem.</p>
        {data.myRank && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-agos-accent/10 border border-agos-accent/30 rounded-full text-sm">
            <span className="text-agos-muted">Your Global Rank:</span>
            <span className="font-bold font-mono text-agos-accent-light">#{data.myRank}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-black/40 rounded-xl overflow-x-auto border border-agos-border scrollbar-hide">
        {TABS.map(t => (
          <button 
            key={t.key} 
            onClick={() => setTab(t.key)}
            className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              tab === t.key 
                ? 'bg-agos-accent/20 text-agos-accent-light border border-agos-accent/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                : 'text-agos-muted hover:bg-white/5 border border-transparent hover:text-white hover:border-white/10'
            }`}
          >
            <span className="text-lg">{t.icon}</span> <span className="font-bold">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-agos-surface rounded-xl border border-agos-border overflow-hidden min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data.players.length === 0 ? (
          <div className="p-12 text-center text-agos-dim flex flex-col items-center gap-3">
            <span className="text-4xl opacity-50">👻</span>
            <p>The leaderboard is currently empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 border-b border-white/5 text-xs uppercase tracking-wider text-agos-muted font-mono">
                    <th className="py-4 px-6 w-16 text-center">Rank</th>
                    <th className="py-4 px-6">Operator</th>
                    <th className="py-4 px-6">Faction</th>
                    <th className="py-4 px-6 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.players.map((p, i) => {
                    const rank = i + 1;
                    const isMe = user && p._id === user.id;

                    // Medals & Coloring
                    let rankDisplay = `#${rank}`;
                    let rankColor = 'text-agos-dim font-mono';
                    let rowBg = 'hover:bg-white/5 transition-colors';
                    let avatarBg = 'bg-agos-accent/20 text-agos-accent-light border-white/10';

                    if (rank === 1) {
                      rankDisplay = '🥇';
                      rankColor = 'text-2xl drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]';
                      rowBg = 'bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 hover:from-yellow-500/20';
                      avatarBg = 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]';
                    } else if (rank === 2) {
                      rankDisplay = '🥈';
                      rankColor = 'text-2xl drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]';
                      rowBg = 'bg-gradient-to-r from-gray-400/10 to-transparent border-l-4 border-gray-400 hover:from-gray-400/20';
                      avatarBg = 'bg-gradient-to-br from-gray-300 to-gray-400 text-black border-gray-300 shadow-[0_0_10px_rgba(156,163,175,0.5)]';
                    } else if (rank === 3) {
                      rankDisplay = '🥉';
                      rankColor = 'text-2xl drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]';
                      rowBg = 'bg-gradient-to-r from-amber-600/10 to-transparent border-l-4 border-amber-600 hover:from-amber-600/20';
                      avatarBg = 'bg-gradient-to-br from-amber-600 to-amber-700 text-white border-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.5)]';
                    } else {
                      rowBg += ' border-l-4 border-transparent hover:border-white/20';
                    }

                    if (isMe && rank > 3) {
                      rowBg = 'bg-agos-accent/10 border-l-4 border-agos-accent hover:bg-agos-accent/20';
                    }

                    return (
                      <tr key={p._id} className={rowBg}>
                        <td className={`py-4 px-6 text-center ${rankColor}`}>
                          {rankDisplay}
                        </td>
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden shrink-0 border ${avatarBg}`}>
                                {p.avatar ? (
                                  <img src={p.avatar} alt={p.displayName} className="w-full h-full object-cover" />
                                ) : (
                                  p.displayName?.charAt(0).toUpperCase() || '?'
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  {p.displayName}
                                  {isMe && <span className="text-[9px] bg-agos-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wider">You</span>}
                                </div>
                                <div className="text-xs text-agos-muted font-mono">Level {p.level || 1}</div>
                              </div>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                          {p.faction ? (
                            <div className="flex items-center gap-2 text-sm">
                              <span>{p.faction.icon}</span>
                              <span style={{ color: p.faction.color }} className="font-medium">
                                {p.faction.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-agos-dim text-xs italic">Unaffiliated</span>
                          )}
                        </td>
                        <td className={`py-4 px-6 text-right font-mono font-bold ${getValueColor()}`}>
                          {getValueLabel(p)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
}
