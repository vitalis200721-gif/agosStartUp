import { useState, useEffect } from 'react';
import { useUIStore } from '../store';
import api from '../api/client';

export default function Events() {
  const addToast = useUIStore(s => s.addToast);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/events', { params: filter ? { status: filter } : {} });
      setEvents(data.events);
    } catch { addToast('Failed to load events', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const joinEvent = async (id) => {
    try {
      await api.post(`/events/${id}/join`);
      addToast('Joined event! 🎉', 'success');
      load();
    } catch (err) { addToast(err.response?.data?.error || 'Failed to join', 'error'); }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return 'Ended';
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    if (h > 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
    return `${h}h ${m}m`;
  };

  const typeColors = { challenge: 'text-agos-cyan', tournament: 'text-agos-pink', seasonal: 'text-agos-amber', flash: 'text-agos-green', community: 'text-agos-accent-light' };
  const statusColors = { active: 'bg-agos-green/20 text-agos-green', upcoming: 'bg-agos-cyan/20 text-agos-cyan', ended: 'bg-agos-dim/20 text-agos-dim' };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="font-display font-bold text-2xl">🌠 Events</h1>

      <div className="flex gap-2">
        {['', 'active', 'upcoming', 'ended'].map(s => (
          <button key={s || 'all'} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${filter === s ? 'border-agos-accent bg-agos-accent/15 text-agos-accent-light' : 'border-agos-border text-agos-muted'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event._id} className="card p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg">{event.title}</h3>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${statusColors[event.status]}`}>{event.status}</span>
                </div>
                <p className="text-sm text-agos-muted">{event.description}</p>
                <span className={`text-xs font-mono uppercase ${typeColors[event.type]}`}>{event.type}</span>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm text-agos-amber">{formatTime(event.timeRemaining)}</div>
                <div className="text-xs text-agos-dim">{event.participantCount} joined</div>
              </div>
            </div>

            {/* Challenges */}
            {event.challenges?.length > 0 && (
              <div className="space-y-2 mb-4">
                {event.challenges.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-agos-surface rounded-lg">
                    <span className="text-xs font-mono text-agos-dim w-5 text-center">{i + 1}</span>
                    <span className="text-sm flex-1">{c.title}</span>
                    <span className="text-xs font-mono text-agos-cyan">+{c.reward?.xp} XP</span>
                    <span className="text-xs font-mono text-agos-amber">+{c.reward?.coins} 🪙</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex gap-4 text-xs text-agos-muted">
                <span>🏆 {event.rewards?.xp} XP</span>
                <span>🪙 {event.rewards?.coins} coins</span>
              </div>
              {event.status === 'active' && (
                <button onClick={() => joinEvent(event._id)} className="btn-primary text-xs py-2 px-4 ml-auto">Join Event</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
