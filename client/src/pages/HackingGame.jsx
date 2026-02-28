import { useState, useEffect, useRef } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const PHASE = { IDLE: 'idle', LOADING: 'loading', HACKING: 'hacking', RESULT: 'result' };

export default function HackingGame() {
  const user = useAuthStore(s => s.user);
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);

  const [phase, setPhase] = useState(PHASE.IDLE);
  const [config, setConfig] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [bet, setBet] = useState(50);
  const [challenge, setChallenge] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('');
  const progressRef = useRef(null);

  // Load game config on mount
  useEffect(() => {
    api.get('/hacking/config').then(r => setConfig(r.data)).catch(() => {});
  }, []);

  const startHack = async () => {
    if (bet < 10 || bet > 1000 || user?.coins < bet) return;
    setPhase(PHASE.LOADING);
    setProgress(0);
    setResult(null);

    try {
      // Get the challenge grid (for visual effect)
      const { data: challengeData } = await api.get(`/hacking/challenge?difficulty=${difficulty}`);
      setChallenge(challengeData);
      setPhase(PHASE.HACKING);

      // Animate the "hacking" progress
      let p = 0;
      const hackLines = [
        'Initializing exploit framework...',
        'Scanning target ports...',
        'Bypassing firewall layer 1...',
        'Injecting payload...',
        'Decrypting access tokens...',
        'Elevating privileges...',
        'Extracting data packets...',
        'Covering tracks...',
        'Finalizing breach...',
      ];

      const interval = setInterval(() => {
        p += Math.random() * 15 + 5;
        if (p > 100) p = 100;
        setProgress(Math.min(p, 100));
        setGlitchText(hackLines[Math.floor(Math.random() * hackLines.length)]);
        if (p >= 100) clearInterval(interval);
      }, 300);

      // After ~3 seconds, resolve the hack on the server
      setTimeout(async () => {
        clearInterval(interval);
        setProgress(100);
        try {
          const { data } = await api.post('/hacking/attempt', { difficulty, betAmount: bet });
          setResult(data);
          setPhase(PHASE.RESULT);
          await fetchMe();
        } catch (err) {
          addToast(err.response?.data?.error || 'Hack failed!', 'error');
          setPhase(PHASE.IDLE);
        }
      }, 3000);

    } catch (err) {
      addToast('Failed to start hack', 'error');
      setPhase(PHASE.IDLE);
    }
  };

  const selectedConfig = config?.difficulties?.find(d => d.key === difficulty);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl">🔓 Cyber Hacking</h1>
        <div className="flex items-center gap-2 bg-agos-card rounded-lg px-4 py-2 border border-agos-border">
          <span className="text-lg">🪙</span>
          <span className="font-display font-bold text-agos-amber">{user?.coins?.toLocaleString()}</span>
        </div>
      </div>

      {phase === PHASE.IDLE && config && (
        <div className="space-y-5">
          {/* Terminal window aesthetic */}
          <div className="card p-6 font-mono text-sm space-y-4">
            <div className="text-agos-green text-xs">
              <span className="text-agos-dim">root@agos</span>:<span className="text-agos-cyan">~</span>$ <span className="animate-pulse">█</span>
            </div>
            <div className="text-agos-muted text-xs leading-relaxed">
              Welcome to AGOS Breach Protocol v2.0<br/>
              Select difficulty and stake to begin hacking.<br/>
              Higher risk = higher reward. Choose wisely, hacker.
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {config.difficulties.map(d => (
              <button
                key={d.key}
                onClick={() => setDifficulty(d.key)}
                className={`card p-4 text-center transition-all cursor-pointer ${
                  difficulty === d.key
                    ? 'border-agos-accent shadow-[0_0_20px_rgba(124,58,237,0.3)] scale-[1.02]'
                    : 'hover:border-agos-accent/40'
                }`}
              >
                <div className="text-2xl mb-1">
                  {d.key === 'easy' ? '🟢' : d.key === 'medium' ? '🟡' : d.key === 'hard' ? '🔴' : '💀'}
                </div>
                <div className="font-display font-bold text-sm">{d.label}</div>
                <div className="text-[10px] text-agos-muted mt-1">{d.winChance}% chance</div>
                <div className="text-xs font-bold text-agos-amber mt-0.5">{d.multiplier}x</div>
              </button>
            ))}
          </div>

          {/* Bet Amount */}
          <div className="card p-5 space-y-3">
            <label className="text-xs font-mono text-agos-muted">STAKE AMOUNT</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={config.minBet}
                max={Math.min(config.maxBet, user?.coins || 0)}
                value={bet}
                onChange={e => setBet(Number(e.target.value))}
                className="flex-1 accent-agos-accent"
              />
              <div className="w-24 text-center">
                <span className="font-display font-bold text-lg text-agos-amber">{bet}</span>
                <span className="text-xs text-agos-muted ml-1">🪙</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-agos-dim">
              <span>Min: {config.minBet}</span>
              <span>Max: {Math.min(config.maxBet, user?.coins || 0)}</span>
            </div>

            {/* Quick bet buttons */}
            <div className="flex gap-2">
              {[50, 100, 250, 500].filter(v => v <= (user?.coins || 0)).map(v => (
                <button key={v} onClick={() => setBet(v)}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-all ${bet === v ? 'border-agos-accent bg-agos-accent/15 text-agos-accent-light' : 'border-agos-border text-agos-muted hover:border-agos-accent/40'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Potential Winnings */}
          {selectedConfig && (
            <div className="card p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-agos-muted">Potential Reward</div>
                <div className="font-display font-bold text-agos-green text-lg">
                  +{Math.floor(bet * selectedConfig.multiplier)} 🪙
                </div>
              </div>
              <button
                onClick={startHack}
                disabled={user?.coins < bet}
                className="px-8 py-3 bg-gradient-to-r from-agos-accent to-agos-pink text-white font-display font-bold rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:scale-105 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ⚡ INITIATE HACK
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hacking Animation */}
      {phase === PHASE.HACKING && challenge && (
        <div className="space-y-4">
          <div className="card p-6 font-mono text-xs space-y-3 bg-black/40 border-agos-accent/40">
            {/* Matrix-like grid */}
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${challenge.gridSize}, 1fr)` }}>
              {challenge.grid.map((hex, i) => (
                <div key={i} className={`p-2 text-center rounded text-[10px] font-bold transition-all duration-200 ${
                  challenge.targetSequence.includes(hex)
                    ? 'bg-agos-accent/30 text-agos-accent-light border border-agos-accent animate-pulse'
                    : 'bg-agos-surface/50 text-agos-dim border border-agos-border/30'
                }`}>
                  {hex}
                </div>
              ))}
            </div>

            {/* Target sequence */}
            <div className="border-t border-agos-border/50 pt-3">
              <div className="text-agos-cyan text-[10px] mb-1">TARGET SEQUENCE:</div>
              <div className="flex gap-2">
                {challenge.targetSequence.map((hex, i) => (
                  <span key={i} className="px-2 py-1 bg-agos-accent/20 border border-agos-accent/50 rounded text-agos-accent-light font-bold">
                    {hex}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="text-agos-green text-[10px]">{glitchText}</div>
              <div className="w-full bg-agos-surface rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-agos-accent to-agos-cyan transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right text-[10px] text-agos-muted">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {phase === PHASE.RESULT && result && (
        <div className="space-y-4">
          <div className={`card p-8 text-center space-y-4 ${
            result.won
              ? 'border-agos-green/50 shadow-[0_0_40px_rgba(34,197,94,0.2)]'
              : 'border-agos-red/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
          }`}>
            <div className="text-5xl">{result.won ? '🎉' : '🚨'}</div>
            <div className={`font-display font-bold text-xl ${result.won ? 'text-agos-green' : 'text-agos-red'}`}>
              {result.won ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
            </div>
            <div className="text-sm text-agos-muted">{result.message}</div>
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <div className="text-agos-dim text-[10px]">Balance</div>
                <div className="font-bold text-agos-amber">{result.coinsAfter} 🪙</div>
              </div>
              <div>
                <div className="text-agos-dim text-[10px]">XP Gained</div>
                <div className="font-bold text-agos-cyan">+{result.xpGained}</div>
              </div>
            </div>

            <button
              onClick={() => { setPhase(PHASE.IDLE); setResult(null); }}
              className="px-6 py-2.5 bg-agos-accent text-white font-bold rounded-lg hover:bg-agos-accent-light transition-all"
            >
              ⚡ Hack Again
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {phase === PHASE.LOADING && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-agos-muted">Connecting to target...</span>
          </div>
        </div>
      )}
    </div>
  );
}
