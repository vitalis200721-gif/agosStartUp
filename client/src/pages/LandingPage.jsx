import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060d] text-white overflow-x-hidden" style={{ fontFamily: '"Inter", "Exo 2", system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#06060d]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-bold text-lg tracking-tight">AGOS</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Log in
            </button>
            <button onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all">
              Create Free Account
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/8 rounded-full blur-[180px] pointer-events-none" />

        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-6">
            AI-Powered Gaming Platform
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold leading-[1.08] tracking-tight mb-6">
            Stop guessing.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Start playing smarter.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            AGOS learns what you like, recommends what you'll love, and gives you a reason to keep playing — with quests, rewards, and a live community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate('/register')}
              className="px-8 py-4 text-base bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              Create Free Account
            </button>
            <a href="#trailer"
              className="px-8 py-4 text-base text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all">
              Watch Demo
            </a>
          </div>

          <p className="mt-5 text-xs text-gray-600">Free to start. No credit card required.</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '30,000+', label: 'Games indexed' },
            { value: '8', label: 'AI-driven features' },
            { value: '4', label: 'Competing factions' },
            { value: '<10s', label: 'To your first recommendation' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center pb-6">
          <p className="text-[11px] text-gray-600">Built on data from CrazyGames, one of the largest browser gaming platforms.</p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-3">Core Platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Six systems. One platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              ), title: 'AI That Knows You', desc: 'Tell us your mood. Get games you actually want to play — not random lists.' },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              ), title: 'Daily Quests That Pay', desc: 'Four new missions every day. Complete them, earn coins and XP. Simple loop, real progress.' },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              ), title: 'Factions With Stakes', desc: 'Join one of four factions. Contribute resources. Compete for weekly dominance.' },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
              ), title: 'Live Multiplayer Chat', desc: 'Real-time global chat. See who is online. No page refresh needed.' },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /></svg>
              ), title: 'Marketplace Economy', desc: 'Buy items, open mystery boxes, equip themes. Prices shift based on demand.' },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              ), title: 'Hacking Mini-Game', desc: 'Stake your coins. Crack the code. Walk away with up to 10x — or lose it all.' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[15px] mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Playing in under a minute.
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { step: '01', title: 'Create your account', desc: 'One form. No credit card. You are in.' },
              { step: '02', title: 'Set your mood', desc: 'Our AI recommends games based on how you actually feel right now.' },
              { step: '03', title: 'Play, earn, compete', desc: 'Complete quests. Climb the ranks. Join a faction. Make it yours.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 py-6 border-b border-white/5 last:border-b-0 group">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-gray-500 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-colors">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPETITIVE ADVANTAGE ─── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-3">Why AGOS</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Not another game launcher.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-500 font-medium"></th>
                  <th className="py-4 px-4 text-center">
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-semibold">AGOS</span>
                  </th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium">Steam</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium">Discord</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'AI game recommendations', agos: true, steam: false, discord: false },
                  { feature: 'Mood-based matching', agos: true, steam: false, discord: false },
                  { feature: 'Built-in progression (XP, levels)', agos: true, steam: true, discord: false },
                  { feature: 'Live multiplayer chat', agos: true, steam: true, discord: true },
                  { feature: 'Faction competition', agos: true, steam: false, discord: false },
                  { feature: 'Daily quests with rewards', agos: true, steam: false, discord: false },
                  { feature: 'In-app economy & marketplace', agos: true, steam: true, discord: false },
                  { feature: 'Free browser games', agos: true, steam: false, discord: false },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-gray-400">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.agos ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs leading-5">&#10003;</span>
                      ) : (
                        <span className="text-gray-700">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.steam ? <span className="text-gray-500 text-xs">&#10003;</span> : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.discord ? <span className="text-gray-500 text-xs">&#10003;</span> : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── DEMO / TRAILER ─── */}
      <section id="trailer" className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-3">See It In Action</p>
            <h2 className="text-3xl font-bold tracking-tight">
              Built for players who want more.
            </h2>
          </div>
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/X8pHiCV1w9o?rel=0&showinfo=0&controls=1&modestbranding=1"
                title="AGOS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Your next favorite game
            <br />
            <span className="text-gray-500">is waiting.</span>
          </h2>
          <p className="text-gray-500 mb-8 text-base">
            Join AGOS. Set your mood. Let the AI do the rest.
          </p>
          <button onClick={() => navigate('/register')}
            className="px-10 py-4 text-base bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.06)]">
            Create Free Account
          </button>
          <p className="mt-4 text-xs text-gray-700">Free to start. Setup takes 10 seconds.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-[10px]">A</div>
            <span className="text-sm font-semibold text-gray-400">AGOS</span>
            <span className="text-[10px] text-gray-700 hidden sm:inline">Autonomous Gaming Operating System</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
            <span className="text-gray-800">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
