import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '../store';
import api from '../api/client';

const DIFF_COLORS = {
  easy: 'text-agos-green',
  medium: 'text-agos-amber',
  hard: 'text-agos-red',
  legendary: 'text-agos-pink'
};

const DIFF_BG = {
  easy: 'bg-agos-green/10 border-agos-green/30',
  medium: 'bg-agos-amber/10 border-agos-amber/30',
  hard: 'bg-agos-red/10 border-agos-red/30',
  legendary: 'bg-agos-pink/10 border-agos-pink/30'
};

export default function QuestsWidget() {
  const fetchMe = useAuthStore(s => s.fetchMe);
  const addToast = useUIStore(s => s.addToast);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(null);

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/quests');
      setQuests(data.quests);
    } catch { }
    setLoading(false);
  };

  const completeQuest = async (questId) => {
    setCompleting(questId);
    try {
      const { data } = await api.post(`/quests/complete/${questId}`);
      addToast(`🎯 ${data.message}`, 'success');
      await fetchMe();
      loadQuests();
    } catch (err) {
      addToast(err.response?.data?.error || 'Cannot complete quest', 'error');
    }
    setCompleting(null);
  };

  const completedCount = quests.filter(q => q.isCompleted).length;

  if (loading) {
    return (
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎯</span>
          <span className="font-display font-bold text-sm">Daily Quests</span>
        </div>
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 bg-agos-surface rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <span className="font-display font-bold text-sm">Daily Quests</span>
        </div>
        <span className="text-[10px] font-mono text-agos-muted px-2 py-0.5 bg-agos-surface rounded-full border border-agos-border">
          {completedCount}/{quests.length} done
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-agos-surface rounded-full h-1.5 mb-4">
        <div
          className="h-full bg-gradient-to-r from-agos-accent to-agos-cyan rounded-full transition-all duration-500"
          style={{ width: `${quests.length > 0 ? (completedCount / quests.length) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-2">
        {quests.map(quest => (
          <div
            key={quest._id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              quest.isCompleted
                ? 'bg-agos-green/5 border-agos-green/20 opacity-60'
                : `${DIFF_BG[quest.difficulty]} hover:scale-[1.01]`
            }`}
          >
            <span className="text-xl shrink-0">{quest.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-xs ${quest.isCompleted ? 'line-through text-agos-dim' : ''}`}>
                  {quest.title}
                </span>
                <span className={`text-[9px] font-mono uppercase ${DIFF_COLORS[quest.difficulty]}`}>
                  {quest.difficulty}
                </span>
              </div>
              <div className="text-[10px] text-agos-muted truncate">{quest.description}</div>
              <div className="flex gap-2 mt-0.5 text-[9px]">
                <span className="text-agos-amber">+{quest.coinReward} 🪙</span>
                <span className="text-agos-cyan">+{quest.xpReward} XP</span>
              </div>
            </div>
            {quest.isCompleted ? (
              <span className="text-agos-green text-sm font-bold">✓</span>
            ) : (
              <button
                onClick={() => completeQuest(quest._id)}
                disabled={completing === quest._id}
                className="px-3 py-1.5 bg-agos-accent text-white text-[10px] font-bold rounded-lg hover:bg-agos-accent-light hover:scale-105 transition-all active:scale-95 shrink-0 disabled:opacity-50"
              >
                {completing === quest._id ? '...' : 'Claim'}
              </button>
            )}
          </div>
        ))}
      </div>

      {completedCount === quests.length && quests.length > 0 && (
        <div className="mt-3 text-center text-xs text-agos-green font-bold animate-pulse">
          🎉 All quests completed! Come back tomorrow for new ones!
        </div>
      )}
    </div>
  );
}
