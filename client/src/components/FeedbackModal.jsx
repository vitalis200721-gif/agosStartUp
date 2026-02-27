import { useState } from 'react';
import { APP_VERSION } from '../config';
import { track, Events } from '../analytics';
import { useUIStore } from '../store';

export default function FeedbackModal({ onClose }) {
  const [type, setType] = useState('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const addToast = useUIStore(s => s.addToast);

  const submit = () => {
    if (!message.trim()) return;
    track(type === 'bug' ? Events.BUG_REPORTED : Events.FEEDBACK_SUBMITTED, {
      type, message, appVersion: APP_VERSION, route: window.location.pathname,
    });
    setSubmitted(true);
    addToast(type === 'bug' ? 'Bug report sent!' : 'Feedback submitted!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose} onKeyDown={e => e.key === 'Escape' && onClose()}>
      <div className="card p-6 max-w-md w-full animate-slide-up" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="font-display font-bold text-lg">Thank you!</h2>
            <p className="text-sm text-agos-muted mt-1">We'll review your {type} shortly.</p>
            <button onClick={onClose} className="btn-secondary mt-4 text-sm">Close</button>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-lg mb-4">📬 Send Feedback</h2>
            <div className="flex gap-2 mb-4">
              {[['feedback', '💬'], ['bug', '🐛'], ['idea', '💡']].map(([t, icon]) => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${type === t ? 'border-agos-accent bg-agos-accent/15 text-agos-accent-light' : 'border-agos-border text-agos-muted'}`}>
                  {icon} {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
              className="input-field resize-none mb-3" placeholder={type === 'bug' ? 'Describe the bug...' : 'Your feedback...'} />
            <div className="flex gap-2">
              <button onClick={onClose} className="btn-secondary flex-1 text-sm">Cancel</button>
              <button onClick={submit} disabled={!message.trim()} className="btn-primary flex-1 text-sm">Send</button>
            </div>
            <p className="text-[10px] text-agos-dim mt-2 text-center">v{APP_VERSION} · {window.location.pathname}</p>
          </>
        )}
      </div>
    </div>
  );
}
