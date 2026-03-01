import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // High-quality game covers for the background
  const bgGames = [
    "Cyberpunk 2077", "Valorant", "Minecraft", "League of Legends",
    "Apex Legends", "Grand Theft Auto V", "Elden Ring", "Overwatch 2",
    "Call of Duty Warzone", "World of Warcraft", "Rocket League", "Fortnite",
    "CSGO 2", "Dota 2", "Genshin Impact", "Red Dead Redemption 2",
    "The Witcher 3", "Baldur's Gate 3", "Hollow Knight", "Terraria",
    "Stardew Valley", "Rainbow Six Siege", "Destiny 2", "Rust",
    "CyberDino", "Turnfight", "Real Warships", "VECK.IO", "Super Mario Odyssey",
    "God of War", "Spider-Man", "Halo Infinite", "Forza Horizon 5",
    "Fall Guys", "Among Us", "Phasmophobia", "Dead by Daylight"
  ];

  // Helper to generate a reliable thumbnail URL
  const getImageUrl = (title) => {
    const query = encodeURIComponent(`"${title}" game art cover`);
    return `https://tse2.mm.bing.net/th?q=${query}&w=640&h=360&c=7&rs=1&p=0`;
  };

  useEffect(() => { setVisible(true); }, []);

  const goReg = () => navigate('/register');

  return (
    <div className="min-h-screen bg-[#05050f] text-white overflow-x-hidden relative" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-diagonal {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
        .bg-scroll-track {
          display: flex;
          width: max-content;
          animation: scroll-diagonal 60s linear infinite;
        }
        .bg-scroll-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 10px;
          transform: rotate(-15deg) scale(1.2);
        }
      `}} />

      {/* Animated Game Wall Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050f] via-transparent to-[#05050f] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05050f] via-transparent to-[#05050f] z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-scroll-grid">
            <div className="bg-scroll-track">
              {/* Duplicate array for seamless infinite scroll */}
              {[...bgGames, ...bgGames].map((title, i) => (
                <div key={i} className="w-[300px] h-[170px] rounded-xl overflow-hidden shadow-2xl mr-5 shrink-0 opacity-80">
                  <img src={getImageUrl(title)} className="w-full h-full object-cover" alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="bg-scroll-track" style={{ animationDuration: '75s', animationDirection: 'reverse' }}>
              {[...bgGames].reverse().concat([...bgGames].reverse()).map((title, i) => (
                <div key={i} className="w-[300px] h-[170px] rounded-xl overflow-hidden shadow-2xl mr-5 shrink-0 opacity-80">
                  <img src={getImageUrl(title)} className="w-full h-full object-cover" alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="bg-scroll-track" style={{ animationDuration: '90s' }}>
              {[...bgGames.slice(8), ...bgGames.slice(0, 8), ...bgGames.slice(8), ...bgGames.slice(0, 8)].map((title, i) => (
                <div key={i} className="w-[300px] h-[170px] rounded-xl overflow-hidden shadow-2xl mr-5 shrink-0 opacity-80">
                  <img src={getImageUrl(title)} className="w-full h-full object-cover" alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="bg-scroll-track" style={{ animationDuration: '82s', animationDirection: 'reverse' }}>
              {[...bgGames.slice(15), ...bgGames.slice(0, 15), ...bgGames.slice(15), ...bgGames.slice(0, 15)].map((title, i) => (
                <div key={i} className="w-[300px] h-[170px] rounded-xl overflow-hidden shadow-2xl mr-5 shrink-0 opacity-80">
                  <img src={getImageUrl(title)} className="w-full h-full object-cover" alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Base dark grid grid */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#05050f]/70 backdrop-blur-2xl border-b border-violet-500/[0.08]">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-[11px] font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]">A</div>
            <span className="font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">AGOS</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')} className="px-4 py-1.5 text-sm text-gray-400 hover:text-white transition-colors">Log in</button>
            <button onClick={goReg} className="px-4 py-2 text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]">Create Free Account</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Massive glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/[0.08] rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-fuchsia-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 left-10 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className={`max-w-[700px] mx-auto text-center relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Status strip */}
          <div className="inline-flex items-center gap-4 px-5 py-2 bg-gradient-to-r from-violet-500/[0.08] to-fuchsia-500/[0.05] border border-violet-500/[0.12] rounded-full text-[11px] text-violet-300 mb-8 shadow-[0_0_20px_rgba(139,92,246,0.08)]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />Live quests</span>
            <span className="w-px h-3 bg-violet-500/20" />
            <span className="text-fuchsia-300">Active factions</span>
            <span className="w-px h-3 bg-violet-500/20" />
            <span className="text-cyan-300">Competitive economy</span>
          </div>

          <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight mb-6">
            Play smarter.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              Progress faster.
            </span>
          </h1>

          <p className="text-[17px] text-gray-400 max-w-[500px] mx-auto mb-10 leading-relaxed">
            AGOS matches games to your mood with AI, tracks your progression, and drops you into a live competitive ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={goReg}
              className="px-8 py-4 text-sm bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Create Free Account
            </button>
            <a href="#demo"
              className="px-8 py-4 text-sm text-gray-300 border border-white/10 rounded-xl hover:bg-white/[0.04] hover:border-violet-500/20 hover:text-white transition-all">
              Watch Demo
            </a>
          </div>
          <p className="mt-5 text-[11px] text-gray-600">Free to start. No credit card.</p>
        </div>
      </section>

      {/* ── SCREENSHOT SECTION ── */}
      <section className="py-20 px-6 relative">
        {/* Section glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-semibold mb-2">Inside The Platform</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built like a game. <span className="text-violet-400">Runs like a system.</span></h2>
          </div>

          {/* Dashboard Mock */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-violet-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.15)]">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Your Command Center</h3>
                <p className="text-xs text-gray-500">Daily quests, AI mood engine, and live progression — one view.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-violet-500/[0.08] bg-[#0a0a18] shadow-[0_0_80px_rgba(139,92,246,0.06),0_0_30px_rgba(139,92,246,0.04)]">
              <div className="p-1">
                <div className="flex h-[360px] sm:h-[430px]">
                  {/* Sidebar */}
                  <div className="w-[150px] shrink-0 bg-gradient-to-b from-[#0c0c1a] to-[#09091a] border-r border-violet-500/[0.06] p-3 hidden sm:flex flex-col gap-1">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-violet-500/15 border border-violet-500/20 shadow-[0_0_8px_rgba(139,92,246,0.1)]"><div className="w-3 h-3 rounded bg-violet-500/40" /><span className="text-[10px] text-violet-300 font-medium">Dashboard</span></div>
                    {['Multiverse', 'Factions', 'Market', 'Events', 'Hacking', 'Premium', 'Profile'].map(n => (
                      <div key={n} className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-white/[0.03] transition-colors" onClick={goReg}><div className="w-3 h-3 rounded bg-white/5" /><span className="text-[10px] text-gray-600 hover:text-gray-400">{n}</span></div>
                    ))}
                  </div>
                  {/* Main */}
                  <div className="flex-1 p-4 space-y-3 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" /><span className="text-[10px] text-emerald-400 font-mono">2 online</span></div>
                      <div className="flex items-center gap-2"><span className="text-[10px] text-gray-400">NeonRaider</span><span className="text-[9px] text-violet-300 font-mono bg-violet-500/10 px-1.5 rounded">Lvl 7</span><div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[8px] font-bold shadow-[0_0_8px_rgba(139,92,246,0.3)]">N</div></div>
                    </div>
                    {/* Welcome */}
                    <div className="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-cyan-500/5 rounded-lg p-4 border border-violet-500/15 shadow-[inset_0_1px_0_rgba(139,92,246,0.1)]">
                      <div className="font-semibold text-sm">Welcome back, <span className="text-violet-400">NeonRaider</span></div>
                      <div className="flex items-center gap-3 mt-1 text-[10px]">
                        <span className="text-violet-300 font-semibold">Lvl 7</span><span className="text-gray-500">2,480 XP</span><span className="text-amber-400 font-semibold">1,850 coins</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-2.5"><div className="h-full w-[65%] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" /></div>
                    </div>
                    {/* Quests */}
                    <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.05]">
                      <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold">Daily Quests</span><span className="text-[9px] text-emerald-400 font-mono px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">3/4 done</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1 mb-2.5"><div className="h-full w-[75%] bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.3)]" /></div>
                      {[
                        { name: 'Breach Protocol', diff: 'EASY', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', reward: '+75', done: true },
                        { name: 'Winning Streak', diff: 'MEDIUM', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', reward: '+150', done: true },
                        { name: 'High Stakes Hack', diff: 'HARD', color: 'text-red-400 bg-red-500/10 border-red-500/20', reward: '+200', done: true },
                        { name: 'Social Butterfly', diff: 'EASY', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', reward: '+60', done: false },
                      ].map((q, i) => (
                        <div key={i} className={`flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0 ${q.done ? 'opacity-40' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium">{q.name}</span>
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${q.color}`}>{q.diff}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-amber-400 font-semibold">{q.reward}</span>
                            {q.done && <span className="text-emerald-400 text-[11px]">&#10003;</span>}
                            {!q.done && <span className="text-[8px] px-2 py-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold cursor-pointer hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] transition-all" onClick={goReg}>Claim</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market + Factions row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marketplace */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Dynamic Marketplace</h3>
                  <p className="text-xs text-gray-500">Prices shift with demand. Timing wins.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-amber-500/[0.08] bg-[#0a0a18] p-4 h-[240px] shadow-[0_0_40px_rgba(245,158,11,0.04)]">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Mystery Box', rarity: 'RARE', price: '450', rc: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                    { name: 'Cyber Theme', rarity: 'EPIC', price: '750', rc: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
                    { name: 'XP Boost (2x)', rarity: 'UNCOMMON', price: '200', rc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { name: 'Golden Crown', rarity: 'LEGENDARY', price: '1,600', rc: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.05] hover:border-violet-500/15 hover:bg-white/[0.03] transition-all cursor-pointer" onClick={goReg}>
                      <div className="text-[11px] font-semibold mb-1">{item.name}</div>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${item.rc}`}>{item.rarity}</span>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[10px] text-amber-400 font-bold">{item.price}</span>
                        <span className="text-[8px] px-2.5 py-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold shadow-[0_0_6px_rgba(139,92,246,0.3)]">Buy</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Factions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.15)]">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Faction Warfare</h3>
                  <p className="text-xs text-gray-500">Pick a side. Fight for weekly dominance.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-red-500/[0.08] bg-[#0a0a18] p-4 h-[240px] shadow-[0_0_40px_rgba(239,68,68,0.04)]">
                <div className="text-[10px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wider">Weekly Leaderboard</div>
                <div className="space-y-1.5">
                  {[
                    { rank: '#1', name: 'Solar Vanguard', xp: '4,180', bg: 'bg-gradient-to-r from-amber-500/10 to-orange-500/5 border-amber-500/25', rankC: 'text-amber-400', xpC: 'text-emerald-400' },
                    { rank: '#2', name: 'Crimson Order', xp: '3,680', bg: 'bg-white/[0.02] border-white/[0.05]', rankC: 'text-gray-500', xpC: 'text-gray-400' },
                    { rank: '#3', name: 'Shadow Legion', xp: '3,290', bg: 'bg-white/[0.02] border-white/[0.05]', rankC: 'text-gray-500', xpC: 'text-gray-500' },
                    { rank: '#4', name: 'Frost Covenant', xp: '2,880', bg: 'bg-white/[0.015] border-white/[0.04]', rankC: 'text-gray-600', xpC: 'text-gray-600' },
                    { rank: '#5', name: 'Emerald Syndicate', xp: '2,180', bg: 'bg-white/[0.015] border-white/[0.04]', rankC: 'text-gray-600', xpC: 'text-gray-600' },
                  ].map((f, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer hover:bg-white/[0.03] transition-all ${f.bg}`} onClick={goReg}>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-bold w-4 ${f.rankC}`}>{f.rank}</span>
                        <span className="text-[11px] font-medium">{f.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-semibold ${f.xpC}`}>{f.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-400 font-semibold mb-2">Core Systems</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Six systems. <span className="text-fuchsia-400">Zero filler.</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'AI That Reads Your Mood', desc: 'Set how you feel. Get matched to games you actually want to play.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', color: 'from-violet-500/15 to-fuchsia-500/10 border-violet-500/15 text-violet-400' },
              { title: 'Quests That Pay Out', desc: 'Four daily missions. Coins and XP on completion. Miss them and they reset.', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/15 text-emerald-400' },
              { title: 'Factions With Rankings', desc: 'Join a faction. Contribute weekly. Climb the board or get replaced.', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z', color: 'from-red-500/15 to-orange-500/10 border-red-500/15 text-red-400' },
              { title: 'Stake or Lose It', desc: 'Hack the system. Bet your coins. Walk away with 10x or walk away with nothing.', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', color: 'from-cyan-500/15 to-blue-500/10 border-cyan-500/15 text-cyan-400' },
              { title: 'Economy That Moves', desc: 'Item prices shift based on demand. Timing matters. Strategy wins.', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941', color: 'from-amber-500/15 to-yellow-500/10 border-amber-500/15 text-amber-400' },
              { title: 'Live Multiplayer Hub', desc: 'Global chat. Real-time player count. No refresh needed.', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z', color: 'from-fuchsia-500/15 to-pink-500/10 border-fuchsia-500/15 text-fuchsia-400' },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/15 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(139,92,246,0.06)]">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br border flex items-center justify-center mb-3.5 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-all ${f.color}`}>
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                </div>
                <h3 className="font-semibold text-[14px] mb-1">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Operational in <span className="text-cyan-400">60 seconds.</span></h2>
          </div>
          {[
            { n: '01', title: 'Create your account', desc: 'One form. No payment info. You are in.', color: 'text-violet-400' },
            { n: '02', title: 'Set your mood', desc: 'Our AI matches games to how you feel right now.', color: 'text-fuchsia-400' },
            { n: '03', title: 'Play. Earn. Compete.', desc: 'Complete quests. Join a faction. Climb the ranks.', color: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i} className="flex gap-5 py-5 border-b border-white/[0.04] last:border-0 group">
              <div className={`text-[12px] font-mono font-bold pt-0.5 group-hover:drop-shadow-[0_0_6px_currentColor] transition-all ${s.color}`}>{s.n}</div>
              <div>
                <h3 className="font-semibold text-[14px] mb-0.5">{s.title}</h3>
                <p className="text-[13px] text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY AGOS ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-semibold mb-2">Why AGOS</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Not another lobby. <span className="text-violet-400">A full operating system.</span></h2>
          </div>
          <div className="space-y-3">
            {[
              { vs: 'Discord', point: 'Discord lets you talk. AGOS gives you quests, progression, economy, and competition. Chat is just one layer.', color: 'border-indigo-500/15 hover:border-indigo-500/25 text-indigo-400 bg-indigo-500/10' },
              { vs: 'Steam', point: 'Steam sells games. AGOS tells you which one to play based on how you feel right now — then rewards you for playing.', color: 'border-blue-500/15 hover:border-blue-500/25 text-blue-400 bg-blue-500/10' },
              { vs: 'Random pickers', point: 'Random pickers have no memory. AGOS learns your patterns. Every recommendation gets sharper.', color: 'border-fuchsia-500/15 hover:border-fuchsia-500/25 text-fuchsia-400 bg-fuchsia-500/10' },
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-xl border bg-white/[0.015] hover:bg-white/[0.03] transition-all ${item.color.split(' ').slice(0,2).join(' ')}`}>
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold ${item.color}`}>vs {item.vs}</span>
                <p className="text-[13px] text-gray-400 leading-relaxed mt-3">{item.point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRAZYGAMES PARTNER ── */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/15 rounded-full text-[11px] text-cyan-300 font-semibold mb-4 shadow-[0_0_12px_rgba(34,211,238,0.1)]">
              Official Gaming Partner
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Powered by <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">CrazyGames</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              30,000+ free browser games. Our AI scans the full library to find your perfect match.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { title: 'Bullet Force', cat: 'Shooter', players: '12M+', rating: '4.7', grad: 'from-red-500/15 to-orange-500/8', border: 'border-red-500/15 hover:border-red-500/30' },
              { title: 'Moto X3M', cat: 'Racing', players: '25M+', rating: '4.8', grad: 'from-emerald-500/15 to-teal-500/8', border: 'border-emerald-500/15 hover:border-emerald-500/30' },
              { title: 'Shell Shockers', cat: 'Multiplayer', players: '18M+', rating: '4.5', grad: 'from-amber-500/15 to-yellow-500/8', border: 'border-amber-500/15 hover:border-amber-500/30' },
              { title: 'Basketball Stars', cat: 'Sports', players: '15M+', rating: '4.6', grad: 'from-orange-500/15 to-red-500/8', border: 'border-orange-500/15 hover:border-orange-500/30' },
              { title: 'Subway Surfers', cat: 'Runner', players: '50M+', rating: '4.9', grad: 'from-violet-500/15 to-fuchsia-500/8', border: 'border-violet-500/15 hover:border-violet-500/30' },
              { title: 'Among Us', cat: 'Social', players: '30M+', rating: '4.7', grad: 'from-cyan-500/15 to-blue-500/8', border: 'border-cyan-500/15 hover:border-cyan-500/30' },
              { title: 'Temple Run 2', cat: 'Adventure', players: '20M+', rating: '4.6', grad: 'from-teal-500/15 to-emerald-500/8', border: 'border-teal-500/15 hover:border-teal-500/30' },
              { title: 'Stickman Hook', cat: 'Casual', players: '22M+', rating: '4.8', grad: 'from-fuchsia-500/15 to-pink-500/8', border: 'border-fuchsia-500/15 hover:border-fuchsia-500/30' },
            ].map((g, i) => (
              <a key={i} href="https://www.crazygames.com" target="_blank" rel="noopener noreferrer"
                className={`group p-4 rounded-xl border bg-gradient-to-br hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 ${g.grad} ${g.border}`}>
                <h4 className="font-semibold text-[13px] mb-1 group-hover:text-cyan-300 transition-colors">{g.title}</h4>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 rounded-full text-gray-400 border border-white/5">{g.cat}</span>
                <div className="flex items-center justify-between mt-2.5 text-[10px] text-gray-500">
                  <span className="text-amber-400/70">{g.rating}</span>
                  <span>{g.players}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a href="https://www.crazygames.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/15 rounded-xl text-sm text-cyan-300 font-semibold hover:bg-cyan-500/15 hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:scale-[1.02] transition-all">
              Explore 30,000+ Games on CrazyGames
              <span className="text-lg">&#8594;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-400 font-semibold mb-2">See It Run</p>
            <h2 className="text-2xl font-bold tracking-tight">Built for players who want <span className="text-fuchsia-400">more.</span></h2>
          </div>
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/15 via-fuchsia-600/10 to-cyan-600/15 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-xl overflow-hidden border border-violet-500/[0.1] bg-black aspect-video shadow-[0_0_40px_rgba(139,92,246,0.08)]">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/X8pHiCV1w9o?rel=0&showinfo=0&controls=1&modestbranding=1" title="AGOS Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/[0.04] via-fuchsia-600/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/[0.06] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-[550px] mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
            The system is live.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Your slot is open.</span>
          </h2>
          <p className="text-gray-400 mb-8 text-[15px]">
            Players are completing quests, factions are competing, the economy is moving. The only thing missing is you.
          </p>
          <button onClick={goReg}
            className="px-10 py-4 text-sm bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            Enter AGOS
          </button>
          <p className="mt-4 text-[11px] text-gray-600">Free to start. Setup takes 10 seconds.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-violet-500/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-[8px] font-bold shadow-[0_0_6px_rgba(139,92,246,0.3)]">A</div>
            <span className="text-xs text-gray-600">AGOS</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-gray-700">
            <a href="/privacy" className="hover:text-violet-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-violet-400 transition-colors">Terms</a>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
