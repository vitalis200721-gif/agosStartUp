import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const COLOR_MAP = {
  cyan: { border: 'border-agos-cyan/50', bg: 'bg-agos-cyan/10', text: 'text-agos-cyan', shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]', glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]' },
  accent: { border: 'border-agos-accent', bg: 'bg-agos-accent/10', text: 'text-agos-accent-light', shadow: 'shadow-[0_0_30px_rgba(124,58,237,0.2)]', glow: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]' },
  amber: { border: 'border-agos-amber/50', bg: 'bg-agos-amber/10', text: 'text-agos-amber', shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]', glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]' },
  pink: { border: 'border-agos-pink/50', bg: 'bg-agos-pink/10', text: 'text-agos-pink', shadow: 'shadow-[0_0_30px_rgba(236,72,153,0.15)]', glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]' },
};

export default function PremiumStore() {
  const user = useAuthStore(s => s.user);
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);

  useEffect(() => {
    api.get('/premium/packages').then(r => setPackages(r.data.packages)).catch(() => {});
    setLoading(false);
  }, []);

  const handlePurchase = async (pkg) => {
    setPurchasing(pkg.id);
    // Simulate a "payment processing" delay
    await new Promise(r => setTimeout(r, 2000));
    try {
      const { data } = await api.post('/premium/purchase', { packageId: pkg.id });
      setShowSuccess(data);
      addToast(`🎉 ${data.message}`, 'success');
      await fetchMe();
    } catch (err) {
      addToast(err.response?.data?.error || 'Purchase failed', 'error');
    }
    setPurchasing(null);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl">👑 Premium Store</h1>
        <div className="flex items-center gap-2 bg-agos-card rounded-lg px-4 py-2 border border-agos-border">
          <span className="text-lg">🪙</span>
          <span className="font-display font-bold text-agos-amber">{user?.coins?.toLocaleString()}</span>
        </div>
      </div>

      {/* Demo banner */}
      <div className="card p-4 border-agos-amber/30 bg-agos-amber/5 flex items-center gap-3">
        <span className="text-2xl">🧪</span>
        <div>
          <div className="font-semibold text-sm text-agos-amber">Demo Mode</div>
          <div className="text-xs text-agos-muted">This is a demo store. No real money is charged. Coins are added instantly for testing.</div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSuccess(null)}>
          <div className="card p-8 max-w-sm mx-4 text-center space-y-4 border-agos-green/50 shadow-[0_0_60px_rgba(34,197,94,0.3)] animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="text-6xl">🎊</div>
            <div className="font-display font-bold text-xl text-agos-green">Payment Successful!</div>
            <div className="text-sm text-agos-muted">{showSuccess.message}</div>
            <div className="flex justify-center gap-6">
              <div>
                <div className="text-[10px] text-agos-dim">Coins Added</div>
                <div className="font-bold text-agos-amber text-lg">+{showSuccess.coinsAdded?.toLocaleString()} 🪙</div>
              </div>
              <div>
                <div className="text-[10px] text-agos-dim">XP Bonus</div>
                <div className="font-bold text-agos-cyan text-lg">+{showSuccess.xpGained}</div>
              </div>
            </div>
            <button onClick={() => setShowSuccess(null)}
              className="px-6 py-2 bg-agos-accent text-white font-bold rounded-lg hover:bg-agos-accent-light transition-all">
              Awesome! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map(pkg => {
          const c = COLOR_MAP[pkg.color] || COLOR_MAP.cyan;
          return (
            <div key={pkg.id} className={`card p-6 relative flex flex-col items-center text-center transition-all duration-300 ${c.border} ${c.shadow} ${c.glow} hover:scale-[1.03]`}>
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-agos-accent text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  ⭐ Most Popular
                </div>
              )}

              <div className="text-4xl mb-3 mt-2">{pkg.icon}</div>
              <h3 className={`font-display font-bold text-lg ${c.text}`}>{pkg.name}</h3>

              <div className="my-4">
                <span className="font-display font-bold text-3xl">${pkg.price}</span>
              </div>

              <div className="space-y-1 text-sm mb-4 w-full">
                <div className="flex justify-between px-2">
                  <span className="text-agos-muted">Coins</span>
                  <span className="font-bold text-agos-amber">{pkg.coins.toLocaleString()} 🪙</span>
                </div>
                {pkg.bonusCoins > 0 && (
                  <div className="flex justify-between px-2">
                    <span className="text-agos-muted">Bonus</span>
                    <span className="font-bold text-agos-green">+{pkg.bonusCoins.toLocaleString()} 🪙</span>
                  </div>
                )}
                <div className="flex justify-between px-2 pt-1 border-t border-agos-border/50">
                  <span className="text-agos-muted">Total</span>
                  <span className="font-bold text-agos-text">{(pkg.coins + pkg.bonusCoins).toLocaleString()} 🪙</span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(pkg)}
                disabled={purchasing === pkg.id}
                className={`w-full py-3 rounded-xl font-display font-bold text-sm transition-all ${
                  purchasing === pkg.id
                    ? 'bg-agos-surface text-agos-dim cursor-wait'
                    : `${c.bg} ${c.text} border ${c.border} hover:scale-105 active:scale-95`
                }`}
              >
                {purchasing === pkg.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Buy for $${pkg.price}`
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-6 py-4 text-xs text-agos-dim">
        <span>🔒 Secure Checkout</span>
        <span>⚡ Instant Delivery</span>
        <span>🛡️ Money-Back Guarantee</span>
      </div>
    </div>
  );
}
