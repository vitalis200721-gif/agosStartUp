import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[#060610] text-white overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#060610]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-[11px] font-bold">A</div>
            <span className="font-bold tracking-tight">AGOS</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')} className="px-4 py-1.5 text-sm text-gray-500 hover:text-white transition-colors">Log in</button>
            <button onClick={() => navigate('/register')} className="px-4 py-1.5 text-sm bg-violet-600 text-white font-medium rounded-md hover:bg-violet-500 transition-all">Create Free Account</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-60 right-0 w-[300px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className={`max-w-[680px] mx-auto text-center relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Status strip */}
          <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-[11px] text-gray-500 mb-8">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live quests</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Active factions</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Competitive economy</span>
          </div>

          <h1 className="text-[clamp(36px,5.5vw,64px)] font-bold leading-[1.08] tracking-tight mb-5">
            Play smarter.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Progress faster.</span>
          </h1>

          <p className="text-[17px] text-gray-400 max-w-[480px] mx-auto mb-9 leading-relaxed">
            AGOS matches games to your mood with AI, tracks your progression, and drops you into a live competitive ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate('/register')}
              className="px-7 py-3.5 text-sm bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-500 transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] active:scale-[0.97]">
              Create Free Account
            </button>
            <a href="#demo"
              className="px-7 py-3.5 text-sm text-gray-400 border border-white/8 rounded-lg hover:bg-white/[0.03] hover:text-white transition-all">
              Watch Demo
            </a>
          </div>
          <p className="mt-4 text-[11px] text-gray-600">Free to start. No credit card.</p>
        </div>
      </section>

      {/* ── APP SCREENSHOTS ── */}
      <section className="py-20 px-6 border-y border-white/[0.04]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-2">Inside The Platform</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built like a game. Runs like a system.</h2>
          </div>

          {/* Screenshot 1: Dashboard */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Your Command Center</h3>
                <p className="text-xs text-gray-500">Daily quests, AI mood engine, and live progression — all in one view.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a18] shadow-[0_0_60px_rgba(139,92,246,0.06)]">
              {/* Mock Dashboard UI */}
              <div className="p-1">
                <div className="flex h-[340px] sm:h-[420px]">
                  {/* Sidebar */}
                  <div className="w-[140px] shrink-0 bg-[#0c0c1a] border-r border-white/[0.04] p-3 hidden sm:flex flex-col gap-1">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-violet-500/10 border border-violet-500/15"><div className="w-3 h-3 rounded bg-violet-500/30" /><span className="text-[10px] text-violet-300">Dashboard</span></div>
                    {['Multiverse', 'Factions', 'Market', 'Events', 'Hacking', 'Premium', 'Profile'].map(n => (
                      <div key={n} className="flex items-center gap-2 px-2 py-1.5 rounded"><div className="w-3 h-3 rounded bg-white/5" /><span className="text-[10px] text-gray-600">{n}</span></div>
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="flex-1 p-4 space-y-3 overflow-hidden">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span className="text-[10px] text-emerald-400 font-mono">2 online</span></div>
                      <div className="flex items-center gap-2"><span className="text-[10px] text-gray-400">NeonRaider</span><div className="w-6 h-6 rounded-full bg-violet-500/30 flex items-center justify-center text-[8px] font-bold">N</div></div>
                    </div>
                    {/* Welcome card */}
                    <div className="bg-gradient-to-r from-violet-500/8 to-cyan-500/5 rounded-lg p-4 border border-violet-500/10">
                      <div className="font-semibold text-sm">Welcome back, <span className="text-violet-400">NeonRaider</span></div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                        <span className="text-violet-300">Lvl 7</span><span>2,480 XP</span><span className="text-amber-400">1,850 coins</span>
                      </div>
                      {/* XP Bar */}
                      <div className="w-full bg-white/5 rounded-full h-1 mt-2"><div className="h-full w-[65%] bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" /></div>
                    </div>
                    {/* Quests */}
                    <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                      <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold">Daily Quests</span><span className="text-[9px] text-gray-600 font-mono px-1.5 py-0.5 bg-white/5 rounded">3/4 done</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full w-[75%] bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full" /></div>
                      {[
                        { name: 'Breach Protocol', diff: 'EASY', reward: '+75', done: true },
                        { name: 'Winning Streak', diff: 'MEDIUM', reward: '+150', done: true },
                        { name: 'High Stakes Hack', diff: 'HARD', reward: '+200', done: true },
                        { name: 'Social Butterfly', diff: 'EASY', reward: '+60', done: false },
                      ].map((q, i) => (
                        <div key={i} className={`flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0 ${q.done ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px]">{q.name}</span>
                            <span className={`text-[8px] font-mono px-1 rounded ${q.diff === 'EASY' ? 'text-emerald-400 bg-emerald-500/10' : q.diff === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'}`}>{q.diff}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-amber-400">{q.reward}</span>
                            {q.done && <span className="text-emerald-400 text-[10px]">&#10003;</span>}
                            {!q.done && <span className="text-[8px] px-1.5 py-0.5 bg-violet-500 text-white rounded font-medium">Claim</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots row: Marketplace + Factions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marketplace */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Dynamic Marketplace</h3>
                  <p className="text-xs text-gray-500">Prices shift with demand. Spend smart or fall behind.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a18] p-4 h-[220px] shadow-[0_0_40px_rgba(245,158,11,0.04)]">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Mystery Box', rarity: 'RARE', price: '450', color: 'text-blue-400 bg-blue-500/10' },
                    { name: 'Cyber Theme', rarity: 'EPIC', price: '750', color: 'text-purple-400 bg-purple-500/10' },
                    { name: 'XP Boost (2x)', rarity: 'UNCOMMON', price: '200', color: 'text-green-400 bg-green-500/10' },
                    { name: 'Golden Crown', rarity: 'LEGENDARY', price: '1,600', color: 'text-amber-400 bg-amber-500/10' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                      <div className="text-[11px] font-semibold mb-0.5">{item.name}</div>
                      <span className={`text-[8px] font-mono px-1 rounded ${item.color}`}>{item.rarity}</span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-amber-400 font-semibold">{item.price}</span>
                        <span className="text-[8px] px-2 py-0.5 bg-violet-500 text-white rounded font-medium">Buy</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Factions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-md bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Faction Warfare</h3>
                  <p className="text-xs text-gray-500">Pick a side. Contribute. Fight for weekly leaderboard dominance.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a18] p-4 h-[220px] shadow-[0_0_40px_rgba(239,68,68,0.04)]">
                <div className="text-[10px] font-semibold text-gray-400 mb-2">WEEKLY LEADERBOARD</div>
                <div className="space-y-1.5">
                  {[
                    { rank: '#1', name: 'Solar Vanguard', xp: '4,180', color: 'bg-amber-500/10 border-amber-500/20 text-amber-300' },
                    { rank: '#2', name: 'Crimson Order', xp: '3,680', color: 'bg-white/[0.02] border-white/[0.04] text-gray-400' },
                    { rank: '#3', name: 'Shadow Legion', xp: '3,290', color: 'bg-white/[0.02] border-white/[0.04] text-gray-400' },
                    { rank: '#4', name: 'Frost Covenant', xp: '2,880', color: 'bg-white/[0.02] border-white/[0.04] text-gray-500' },
                    { rank: '#5', name: 'Emerald Syndicate', xp: '2,180', color: 'bg-white/[0.02] border-white/[0.04] text-gray-500' },
                  ].map((f, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-md border ${f.color}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold ${i === 0 ? 'text-amber-400' : 'text-gray-600'}`}>{f.rank}</span>
                        <span className="text-[11px]">{f.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono ${i === 0 ? 'text-emerald-400' : 'text-gray-600'}`}>{f.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-2">Core Systems</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Six systems. Zero filler.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'AI That Reads Your Mood', desc: 'Set how you feel. Get matched to games you actually want to play.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
              { title: 'Quests That Pay Out', desc: 'Four daily missions. Coins and XP on completion. Miss them and they reset.', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
              { title: 'Factions With Rankings', desc: 'Join a faction. Contribute resources weekly. Climb the board or get replaced.', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z' },
              { title: 'Stake or Lose It', desc: 'Hack the system. Bet your coins. Walk away with 10x or walk away with nothing.', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
              { title: 'Economy That Moves', desc: 'Item prices shift based on demand. Timing matters. Strategy wins.', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' },
              { title: 'Live Multiplayer Hub', desc: 'Global chat. Real-time player count. No refresh needed.', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/15 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-violet-500/8 border border-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/12 transition-colors">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                </div>
                <h3 className="font-semibold text-[14px] mb-1">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 border-y border-white/[0.04] bg-white/[0.008]">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Operational in 60 seconds.</h2>
          </div>
          {[
            { n: '01', title: 'Create your account', desc: 'One form. No payment info. You are in.' },
            { n: '02', title: 'Set your mood', desc: 'Our AI matches games to how you feel right now.' },
            { n: '03', title: 'Play. Earn. Compete.', desc: 'Complete quests. Join a faction. Climb the ranks.' },
          ].map((s, i) => (
            <div key={i} className="flex gap-5 py-5 border-b border-white/[0.04] last:border-0 group">
              <span className="text-[11px] font-mono text-gray-600 pt-0.5 group-hover:text-violet-400 transition-colors">{s.n}</span>
              <div>
                <h3 className="font-semibold text-[14px] mb-0.5">{s.title}</h3>
                <p className="text-[13px] text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY AGOS ── */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-2">Why AGOS</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Not another lobby. A full operating system.</h2>
          </div>

          <div className="space-y-4">
            {[
              { vs: 'Discord', point: 'Discord lets you talk. AGOS gives you quests, progression, economy, and competition. Chat is just one layer.' },
              { vs: 'Steam', point: 'Steam sells games. AGOS tells you which one to play based on how you feel right now — then rewards you for playing it.' },
              { vs: 'Random pickers', point: 'Random game pickers have no memory. AGOS learns your patterns. Every recommendation gets sharper.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-red-500/10 text-red-400 rounded">vs {item.vs}</span>
                </div>
                <p className="text-[13px] text-gray-400 leading-relaxed">{item.point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ── */}
      <section id="demo" className="py-20 px-6 border-y border-white/[0.04] bg-white/[0.008]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-2">See It Run</p>
            <h2 className="text-2xl font-bold tracking-tight">Built for players who want more than a game list.</h2>
          </div>
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-violet-600/10 to-cyan-600/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-black aspect-video">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/X8pHiCV1w9o?rel=0&showinfo=0&controls=1&modestbranding=1" title="AGOS Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/[0.025] to-transparent pointer-events-none" />
        <div className="max-w-[550px] mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            The system is live.
            <br />
            <span className="text-gray-500">Your slot is open.</span>
          </h2>
          <p className="text-gray-500 mb-8 text-[15px]">
            Players are completing quests, factions are competing, the economy is moving. The only thing missing is you.
          </p>
          <button onClick={() => navigate('/register')}
            className="px-8 py-4 text-sm bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-500 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] active:scale-[0.97]">
            Enter AGOS
          </button>
          <p className="mt-4 text-[11px] text-gray-700">Free to start. No credit card required.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-[8px] font-bold">A</div>
            <span className="text-xs text-gray-600">AGOS</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-gray-700">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
