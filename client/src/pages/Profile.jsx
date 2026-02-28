import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const SKILL_ICONS = { exploration: '🧭', combat: '⚔️', strategy: '🧠', social: '👥', creativity: '🎨' };

export default function Profile() {
  const user = useAuthStore(s => s.user);
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);
  const [analysis, setAnalysis] = useState(null);
  const [allAchievements, setAllAchievements] = useState([]);

  useEffect(() => {
    api.get('/ai/profile-analysis').then(r => setAnalysis(r.data)).catch(() => {});
    api.get('/achievements').then(r => setAllAchievements(r.data.achievements)).catch(console.error);
  }, []);

  const allocateSkill = async (skill) => {
    try {
      await api.post('/auth/skills', { skill });
      await fetchMe();
      addToast(`Upgraded ${skill}!`, 'success');
    } catch (err) { addToast(err.response?.data?.error || 'Failed', 'error'); }
  };

  if (!user) return null;

  const xpForNextLevel = Math.pow(user.level, 2) * 100;
  const xpProgress = (user.xp / xpForNextLevel) * 100;

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl">
      <h1 className="font-display font-bold text-2xl">🧬 Profile</h1>

      {/* Profile Card */}
      <div className="card p-6 bg-gradient-to-br from-agos-accent/10 to-agos-cyan/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-agos-accent/30 flex items-center justify-center text-2xl font-bold font-display">
            {user.displayName?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-display font-bold text-xl">{user.displayName}</h2>
            <p className="text-sm text-agos-muted">{user.email}</p>
            {analysis?.archetype && (
              <span className="text-xs font-mono bg-agos-accent/20 text-agos-accent-light px-2 py-0.5 rounded mt-1 inline-block">{analysis.archetype.archetype}</span>
            )}
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-agos-muted mb-1">
            <span>Level {user.level}</span>
            <span>{user.xp} / {xpForNextLevel} XP</span>
          </div>
          <div className="h-2 bg-agos-surface rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-agos-accent to-agos-cyan rounded-full transition-all" style={{ width: `${Math.min(100, xpProgress)}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="text-center"><div className="font-display font-bold text-lg">{user.level}</div><div className="text-[10px] text-agos-dim">LEVEL</div></div>
          <div className="text-center"><div className="font-display font-bold text-lg">{user.xp?.toLocaleString()}</div><div className="text-[10px] text-agos-dim">TOTAL XP</div></div>
          <div className="text-center"><div className="font-display font-bold text-lg text-agos-amber">{user.coins?.toLocaleString()}</div><div className="text-[10px] text-agos-dim">COINS</div></div>
          <div className="text-center"><div className="font-display font-bold text-lg">{user.gamesPlayed}</div><div className="text-[10px] text-agos-dim">GAMES</div></div>
        </div>
      </div>

      {/* Skill Tree */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">🌳 Skill Tree</h2>
          <span className="text-sm font-mono text-agos-cyan">{user.skillPoints || 0} points available</span>
        </div>
        <div className="space-y-3">
          {user.skills && Object.entries(user.skills).map(([skill, level]) => (
            <div key={skill} className="flex items-center gap-3">
              <span className="text-xl w-8 text-center">{SKILL_ICONS[skill]}</span>
              <span className="text-sm font-medium w-24 capitalize">{skill}</span>
              <div className="flex-1 flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className={`h-4 flex-1 rounded-sm transition-all ${i < level ? 'bg-gradient-to-r from-agos-accent to-agos-cyan' : 'bg-agos-surface'}`} />
                ))}
              </div>
              <span className="text-xs font-mono w-6 text-agos-dim">{level}</span>
              {user.skillPoints > 0 && level < 10 && (
                <button onClick={() => allocateSkill(skill)} className="text-xs text-agos-cyan hover:text-agos-accent-light transition-colors">+1</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-4">🏆 Achievements ({user.achievements?.length || 0} / {allAchievements.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allAchievements.length > 0 ? allAchievements.map(a => {
            const isUnlocked = user.achievements?.some(ua => ua._id === a._id);
            return (
              <div key={a._id} className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                isUnlocked 
                  ? 'bg-agos-accent/10 border-agos-accent/50 shadow-[0_0_15px_rgba(124,58,237,0.15)] opacity-100' 
                  : 'bg-agos-surface border-agos-border opacity-40 grayscale hover:grayscale-0 hover:opacity-100 cursor-help'
              }`} title={!isUnlocked ? `Condition: ${a.condition?.type.replace('_', ' ')} x${a.condition?.value}` : 'Unlocked!'}>
                <div className="text-3xl relative">
                  {a.icon}
                  {!isUnlocked && <div className="absolute -bottom-1 -right-1 text-sm bg-black rounded-full p-0.5">🔒</div>}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{a.title}</div>
                  <div className="text-[10px] text-agos-muted leading-tight mt-0.5">{a.description}</div>
                  <div className="text-[9px] font-mono text-agos-dim mt-1 uppercase">Reward: {a.xpReward} XP / {a.coinReward} Coins</div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full text-center py-6 text-agos-muted text-sm">Loading achievements database...</div>
          )}
        </div>
      </div>

      {/* Playstyle */}
      {analysis?.playstyle && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-4">📊 Playstyle Analysis</h2>
          <div className="space-y-2">
            {Object.entries(analysis.playstyle).map(([trait, value]) => (
              <div key={trait} className="flex items-center gap-3">
                <span className="text-sm w-24 capitalize text-agos-muted">{trait}</span>
                <div className="flex-1 h-2.5 bg-agos-surface rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-agos-accent to-agos-pink rounded-full transition-all duration-500" style={{ width: `${value}%` }} />
                </div>
                <span className="text-xs font-mono w-8 text-agos-dim">{value}%</span>
              </div>
            ))}
          </div>
          {analysis.archetype && (
            <div className="mt-4 p-3 bg-agos-accent/5 rounded-lg border border-agos-accent/20">
              <div className="text-sm font-semibold text-agos-accent-light">{analysis.archetype.archetype}</div>
              <p className="text-xs text-agos-muted mt-1">{analysis.archetype.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
