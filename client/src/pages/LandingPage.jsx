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
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400">⬡</span>
            <span className="font-bold text-sm" style={{ fontFamily: '"Exo 2", sans-serif' }}>AGOS</span>
            <span className="text-[10px] text-gray-600">v2.0 · Autonomous Gaming Operating System</span>
          </div>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="/login" className="hover:text-gray-400 transition-colors">Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
