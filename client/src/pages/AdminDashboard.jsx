import { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuthStore } from '../store';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const user = useAuthStore(s => s.user);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ coins: 0, xp: 0, role: 'user', isBanned: false });

  const loadData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data.users);
    } catch (err) {
      console.error('Admin Load Error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') loadData();
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEdit = (u) => {
    setEditingUser(u);
    setEditForm({ coins: u.coins, xp: u.xp, role: u.role, isBanned: u.isBanned || false });
  };

  const saveEdit = async () => {
    try {
      await api.put(`/admin/users/${editingUser._id}`, editForm);
      setEditingUser(null);
      loadData();
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to PERMANENTLY delete this user? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      loadData();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) return (
    <div className="flex bg-black items-center justify-center p-12">
      <div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            <span className="text-red-500">🛡️</span> Admin <span className="text-agos-accent">Command</span>
          </h1>
          <p className="text-agos-dim mt-1">Global ecosystem overview & user management.</p>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-agos-surface border border-agos-border rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full border-b border-l border-blue-500/20" />
            <div className="text-agos-dim text-sm mb-1 font-mono">Total Operators</div>
            <div className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
          </div>
          <div className="bg-agos-surface border border-agos-border rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full border-b border-l border-amber-500/20" />
            <div className="text-agos-dim text-sm mb-1 font-mono">Economy Volume</div>
            <div className="text-3xl font-bold text-amber-400">{stats.totalCoinsInEconomy.toLocaleString()} 🪙</div>
          </div>
          <div className="bg-agos-surface border border-agos-border rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full border-b border-l border-purple-500/20" />
            <div className="text-agos-dim text-sm mb-1 font-mono">Top Player Level</div>
            <div className="text-3xl font-bold text-agos-accent-light">Lvl {stats.topPlayer?.level || 0}</div>
            <div className="text-[10px] text-agos-muted absolute bottom-4 left-5 truncate max-w-[80%]">{stats.topPlayer?.displayName || 'N/A'}</div>
          </div>
          <div className="bg-agos-surface border border-agos-border rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full border-b border-l border-emerald-500/20" />
            <div className="text-agos-dim text-sm mb-1 font-mono">Active Factions</div>
            <div className="text-3xl font-bold text-emerald-400">{stats.factionStats?.length || 0}</div>
          </div>
        </div>
      )}

      {/* User Management */}
      <div className="bg-agos-surface border border-agos-border rounded-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-agos-border bg-black/40 flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span className="text-agos-accent">👥</span> User Roster
          </h2>
          <span className="px-3 py-1 bg-agos-accent/10 text-agos-accent border border-agos-accent/30 rounded-full text-xs font-mono">
            {users.length} Users Found
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/60 border-b border-agos-border/50 text-xs uppercase tracking-wider text-agos-muted font-mono">
                <th className="py-3 px-6">Operator</th>
                <th className="py-3 px-6">Stats</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-6">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      {u.displayName}
                      {u.role === 'admin' && <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded border border-red-500/30">ADMIN</span>}
                    </div>
                    <div className="text-[10px] text-agos-dim font-mono mt-0.5">{u.email}</div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="text-xs text-white">Lvl {u.level} <span className="text-agos-dim ml-1">({u.xp} XP)</span></div>
                    <div className="text-[11px] text-amber-400 mt-0.5">{u.coins.toLocaleString()} Coins</div>
                  </td>
                  <td className="py-3 px-6">
                    {u.isBanned ? (
                      <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-500 rounded text-[10px] font-bold">BANNED</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-500 rounded text-[10px] uppercase font-bold">Active</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(u)} className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Edit User">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(u._id)} className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete User">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-agos-surface border border-agos-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-agos-border flex items-center justify-between bg-black/40">
              <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                <span className="text-agos-accent">🛠️</span> Edit {editingUser.displayName}
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-agos-dim hover:text-white">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-agos-dim mb-1">Coins Balance</label>
                <input 
                  type="number" 
                  value={editForm.coins} 
                  onChange={e => setEditForm({...editForm, coins: e.target.value})}
                  className="w-full bg-black/50 border border-agos-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-agos-accent"
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono text-agos-dim mb-1">Total XP</label>
                <input 
                  type="number" 
                  value={editForm.xp} 
                  onChange={e => setEditForm({...editForm, xp: e.target.value})}
                  className="w-full bg-black/50 border border-agos-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-agos-accent"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editForm.role === 'admin'} 
                    onChange={e => setEditForm({...editForm, role: e.target.checked ? 'admin' : 'user'})}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className={editForm.role === 'admin' ? 'text-red-400 font-bold' : 'text-white'}>Admin Access</span>
                </label>
                
                <label className="flex items-center gap-2 text-sm cursor-pointer ml-auto">
                  <input 
                    type="checkbox" 
                    checked={editForm.isBanned} 
                    onChange={e => setEditForm({...editForm, isBanned: e.target.checked})}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className={editForm.isBanned ? 'text-red-500 font-bold' : 'text-white'}>BAN ACCOUNT</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-agos-border bg-black/20 flex items-center justify-end gap-3">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-sm font-bold text-agos-dim hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} className="px-6 py-2 bg-agos-accent hover:bg-agos-accent-light text-white text-sm font-bold rounded-lg shadow-lg shadow-agos-accent/20 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
