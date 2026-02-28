import { useState, useEffect } from 'react';
import api from '../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('overview');
  const [coinInput, setCoinInput] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data)).catch(() => {});
    api.get('/admin/users').then(r => setUsers(r.data.users || [])).catch(() => {});
  }, []);

  const giveCoins = async (userId, amount) => {
    try {
      await api.post('/admin/give-coins', { userId, amount: Number(amount) });
      setMsg(`Gave ${amount} coins!`);
      const r = await api.get('/admin/users');
      setUsers(r.data.users || []);
      setTimeout(() => setMsg(''), 3000);
    } catch { setMsg('Error'); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-red-500/10 via-agos-surface to-agos-surface rounded-xl p-6 border border-red-500/20">
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><span className="text-3xl">🛡️</span> Admin Dashboard</h1>
        <p className="text-agos-dim text-sm mt-1">Platform management and analytics</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[{ key: 'overview', label: '📊 Overview' }, { key: 'users', label: '👥 Users' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-agos-surface border border-agos-border text-agos-dim hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {msg && <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-sm text-emerald-400 text-center">{msg}</div>}

      {tab === 'overview' && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats.totalUsers} color="text-violet-400" />
          <StatCard label="Total Coins" value={stats.totalCoinsInEconomy?.toLocaleString()} color="text-amber-400" />
          <StatCard label="Top Player" value={stats.topPlayer?.displayName || '-'} color="text-emerald-400" />
          <StatCard label="Top Level" value={`Lvl ${stats.topPlayer?.level || 0}`} color="text-cyan-400" />

          {stats.factionStats?.length > 0 && (
            <div className="col-span-full bg-agos-surface rounded-xl p-4 border border-agos-border">
              <h3 className="font-semibold text-sm mb-3">Faction Distribution</h3>
              <div className="space-y-2">
                {stats.factionStats.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-agos-dim">{f._id || 'No faction'}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-agos-dim">{f.count} members</span>
                      <span className="font-mono text-violet-400">{f.totalXp?.toLocaleString()} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-agos-surface rounded-xl border border-agos-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agos-border text-left text-agos-dim">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">XP</th>
                <th className="px-4 py-3 font-medium">Coins</th>
                <th className="px-4 py-3 font-medium">Faction</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-agos-border">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-agos-accent/5">
                  <td className="px-4 py-2.5">
                    <div className="font-medium">{u.displayName}</div>
                    <div className="text-[10px] text-agos-dim">{u.email}</div>
                  </td>
                  <td className="px-4 py-2.5 text-violet-400">{u.level}</td>
                  <td className="px-4 py-2.5">{u.xp?.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-amber-400">{u.coins?.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-agos-dim">{u.faction || '-'}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        placeholder="amt"
                        className="w-16 px-2 py-1 bg-agos-bg border border-agos-border rounded text-xs"
                        value={coinInput[u._id] || ''}
                        onChange={e => setCoinInput({ ...coinInput, [u._id]: e.target.value })}
                      />
                      <button
                        onClick={() => giveCoins(u._id, coinInput[u._id])}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs hover:bg-emerald-500/30 transition-colors">
                        Give
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-agos-surface rounded-xl p-4 border border-agos-border">
      <div className="text-xs text-agos-dim mb-1">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
