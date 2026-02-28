import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FEATURES = [
  { icon: '🎮', title: 'AI Game Recommendations', desc: 'Get personalized game suggestions based on your mood, energy, and playstyle.' },
  { icon: '⚔️', title: 'Faction Wars', desc: 'Join a faction, contribute resources, and compete for global dominance.' },
  { icon: '💎', title: 'Dynamic Marketplace', desc: 'Buy and sell items with real-time dynamic pricing based on supply and demand.' },
  { icon: '🔓', title: 'Cyber Hacking', desc: 'Risk your coins in our hacking mini-game. Higher risk = higher reward!' },
  { icon: '🎯', title: 'Daily Quests', desc: 'Complete daily missions across 5 categories to earn coins and XP.' },
  { icon: '💬', title: 'Live Multiplayer Chat', desc: 'Chat with other players in real-time via WebSockets.' },
  { icon: '👑', title: 'Premium Store', desc: 'Purchase coin packages to accelerate your progress.' },
  { icon: '🪐', title: 'Multiverse Map', desc: 'Explore an interactive game universe with faction territories.' },
];

const STATS = [
  { value: '10+', label: 'Game Features' },
  { value: '15', label: 'Daily Quests' },
  { value: '4', label: 'Factions' },
  { value: '∞', label: 'Possibilities' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060d] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#06060d]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-purple-400">⬡</span>
            <span className="font-bold text-lg tracking-wider" style={{ fontFamily: '"Exo 2", sans-serif' }}>AGOS</span>
            <span className="text-[9px] font-mono text-gray-600 ml-1">v2.0</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm text-gray-300 hover:text-white transition-colors">
              Log In
            </button>
            <button onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 transition-all">
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 mb-6">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Now live — V2.0 with Multiplayer & Mini-Games
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: '"Exo 2", sans-serif' }}>
            The Ultimate
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Gaming Operating System
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered game recommendations, real-time multiplayer, faction wars, daily quests,
            and a cyberpunk marketplace — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/register')}
              className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:scale-105 transition-all active:scale-95"
              style={{ fontFamily: '"Exo 2", sans-serif' }}>
              🚀 Get Started — It's Free
            </button>
            <button onClick={() => navigate('/login')}
              className="px-8 py-4 text-lg border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all">
              I have an account →
            </button>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-6 text-xs text-gray-600">
            Demo: <span className="text-gray-500 font-mono">demo@agos.gg</span> / <span className="text-gray-500 font-mono">demo123</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: '"Exo 2", sans-serif' }}>
                {s.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: '"Exo 2", sans-serif' }}>
              Everything a Gamer Needs
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              From AI-driven personalization to real-time combat — AGOS redefines how you experience gaming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: '"Exo 2", sans-serif' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in 10 seconds. No credit card required.', icon: '🧬' },
              { step: '02', title: 'Set Your Mood', desc: 'Tell us how you feel and our AI recommends the perfect games.', icon: '🧠' },
              { step: '03', title: 'Play & Earn', desc: 'Complete quests, hack systems, trade items, and climb the ranks.', icon: '🏆' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl">
                  {s.icon}
                </div>
                <div className="text-xs text-purple-400 font-mono mb-2">STEP {s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Trailer Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-[10px] text-pink-300 uppercase tracking-wider font-bold">
                🎬 Featured</div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ fontFamily: '"Exo 2", sans-serif' }}>
                Experience the
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> Next Generation </span>
                of Gaming
              </h2>
              <p className="text-gray-400 leading-relaxed">
                AGOS brings the future of gaming platforms to life. Watch the trailer and discover
                a universe where AI meets multiplayer, where every action matters, and every
                player writes their own story.
              </p>
              <div className="flex flex-wrap gap-3">
                {['AI-Powered', 'Real-Time', 'Competitive', 'Cyberpunk'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-mono border border-white/10 rounded-full text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Video Side */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-[0_0_40px_rgba(124,58,237,0.15)]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/X8pHiCV1w9o?rel=0&showinfo=0&controls=1&modestbranding=1"
                  title="AGOS Gaming Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#06060d] border border-white/10 rounded-full text-[10px] text-gray-500 font-mono">
                ▶ Watch Trailer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: '"Exo 2", sans-serif' }}>
            Ready to Enter the
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Multiverse</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join AGOS today. Free forever. No credit card needed. Your gaming adventure starts now.
          </p>
          <button onClick={() => navigate('/register')}
            className="px-10 py-4 text-lg bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] hover:scale-105 transition-all active:scale-95"
            style={{ fontFamily: '"Exo 2", sans-serif' }}>
            ⬡ Create Your Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-purple-400">⬡</span>
                <span className="font-bold text-lg" style={{ fontFamily: '"Exo 2", sans-serif' }}>AGOS</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Autonomous Gaming Operating System — the next-generation platform where AI meets gaming.
                Join thousands of players in the multiverse.
              </p>
              {/* Social Media Links */}
              <div className="flex gap-3">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/30 transition-all hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-teal-500/20 hover:border-teal-500/30 transition-all hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Platform</h4>
              <div className="space-y-2">
                <a href="/login" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Dashboard</a>
                <a href="/login" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Marketplace</a>
                <a href="/login" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Hacking Arena</a>
                <a href="/login" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Premium Store</a>
              </div>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Company</h4>
              <div className="space-y-2">
                <a href="/privacy" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="/terms" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Terms of Service</a>
                <a href="/register" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Create Account</a>
                <a href="/login" className="block text-xs text-gray-600 hover:text-purple-400 transition-colors">Log In</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] text-gray-700">© 2026 AGOS. All rights reserved. Built with ❤️</span>
            <span className="text-[10px] text-gray-700 font-mono">v2.0 · Autonomous Gaming Operating System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
