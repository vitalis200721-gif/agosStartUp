import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const RARITY_COLORS = { common: 'text-gray-400', uncommon: 'text-green-400', rare: 'text-blue-400', epic: 'text-purple-400', legendary: 'text-amber-400' };

export default function Marketplace() {
  const user = useAuthStore(s => s.user);
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [category, setCategory] = useState('');
  const [tab, setTab] = useState('shop');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [m, i] = await Promise.all([
        api.get('/economy/marketplace', { params: category ? { category } : {} }),
        api.get('/economy/inventory')
      ]);
      setItems(m.data.items);
      setInventory(i.data.inventory);
    } catch { addToast('Failed to load marketplace', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [category]);

  const purchase = async (itemId) => {
    try {
      const { data } = await api.post(`/economy/purchase/${itemId}`);
      addToast(`🎉 Purchased ${data.item}! -${data.spent} coins`, 'success');
      await fetchMe();
      load();
    } catch (err) { addToast(err.response?.data?.error || 'Purchase failed', 'error'); }
  };

  const useItem = async (itemId) => {
    try {
      const { data } = await api.post(`/economy/use/${itemId}`);
      // Show success celebration toast
      addToast(`✨ ${data.message}`, 'success');
      // Refresh user to get new coins/theme
      await fetchMe();
      // Reload inventory
      load();
    } catch (err) { addToast(err.response?.data?.error || 'Failed to use item', 'error'); }
  };

  const categories = ['', 'avatar', 'badge', 'theme', 'boost', 'cosmetic', 'special'];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl">💎 Marketplace</h1>
        <div className="flex items-center gap-2 bg-agos-card rounded-lg px-4 py-2 border border-agos-border">
          <span className="text-lg">🪙</span>
          <span className="font-display font-bold text-agos-amber">{user?.coins?.toLocaleString()}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab('shop')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'shop' ? 'bg-agos-accent/15 text-agos-accent-light border border-agos-accent' : 'border border-agos-border text-agos-muted hover:border-agos-accent/50'}`}>🏪 Shop</button>
        <button onClick={() => setTab('inventory')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'inventory' ? 'bg-agos-accent/15 text-agos-accent-light border border-agos-accent' : 'border border-agos-border text-agos-muted hover:border-agos-accent/50'}`}>🎒 Inventory ({inventory.length})</button>
      </div>

      {tab === 'shop' && (
        <>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c || 'all'} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${category === c ? 'border-agos-accent bg-agos-accent/15 text-agos-accent-light' : 'border-agos-border text-agos-muted hover:border-agos-accent/50'}`}>
                {c || 'All'}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(item => (
                <div key={item._id} className="card p-5 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <span className={`text-[10px] font-mono uppercase ${RARITY_COLORS[item.rarity]}`}>{item.rarity}</span>
                    </div>
                  </div>
                  <p className="text-xs text-agos-muted mb-3">{item.description}</p>
                  {item.effects?.xpBoost > 0 && <div className="text-xs text-agos-cyan mb-1">⚡ +{item.effects.xpBoost}% XP for {item.effects.duration}min</div>}
                  {item.effects?.coinBoost > 0 && <div className="text-xs text-agos-amber mb-1">🧲 +{item.effects.coinBoost}% coins for {item.effects.duration}min</div>}
                  {item.isLimited && <div className="text-xs text-agos-pink mb-2">🔥 Limited: {item.stockRemaining} left</div>}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-bold text-agos-amber">🪙 {item.currentPrice}</span>
                    <button onClick={() => purchase(item._id)} disabled={user?.coins < item.currentPrice}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${user?.coins >= item.currentPrice ? 'bg-agos-accent text-white hover:bg-agos-accent-light' : 'bg-agos-surface text-agos-dim cursor-not-allowed'}`}>
                      {user?.coins >= item.currentPrice ? 'Buy' : 'Need more coins'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'inventory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.length === 0 ? (
            <div className="col-span-full text-center py-12 text-agos-muted">Your inventory is empty. Visit the shop to buy items!</div>
          ) : inventory.map((inv, i) => (
            <div key={i} className="card p-4 flex items-center justify-between gap-3 group hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all">
              <div className="flex items-center gap-3">
                <span className="text-3xl drop-shadow-md">{inv.itemId?.icon || '📦'}</span>
                <div>
                  <div className="font-semibold text-sm">{inv.itemId?.name || 'Unknown Item'}</div>
                  <div className="text-xs text-agos-muted">Qty: {inv.quantity}</div>
                </div>
              </div>
              <button 
                onClick={() => useItem(inv.itemId?._id)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-agos-current text-white hover:bg-agos-accent-light hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
