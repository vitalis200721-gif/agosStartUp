import { useUIStore } from '../store';

export default function Toasts() {
  const toasts = useUIStore(s => s.toasts);
  const colors = { info: 'border-agos-cyan bg-agos-cyan/10', success: 'border-agos-green bg-agos-green/10', error: 'border-agos-red bg-agos-red/10', warning: 'border-agos-amber bg-agos-amber/10' };
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded-lg border text-sm animate-slide-up ${colors[t.type] || colors.info}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
