import { APP_VERSION } from '../config';

export default function About() {
  return (
    <div className="space-y-6 max-w-2xl animate-slide-up">
      <h1 className="font-display font-bold text-2xl">About AGOS</h1>
      <div className="card p-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">⬡</div>
          <h2 className="font-display font-bold text-2xl">AGOS</h2>
          <p className="text-agos-muted text-sm">Autonomous Gaming Operating System</p>
          <span className="inline-block mt-2 px-3 py-1 bg-agos-accent/15 text-agos-accent-light rounded-full font-mono text-xs">v{APP_VERSION}</span>
        </div>
        <div className="space-y-3 text-sm text-agos-muted">
          <p>AGOS is an AI-powered gaming command center that helps you discover games based on your mood, compete in factions, and earn rewards.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-agos-surface rounded-lg text-center">
              <div className="text-lg mb-1">🧠</div><div className="text-xs">AI Recommendations</div>
            </div>
            <div className="p-3 bg-agos-surface rounded-lg text-center">
              <div className="text-lg mb-1">⚔️</div><div className="text-xs">Faction Warfare</div>
            </div>
            <div className="p-3 bg-agos-surface rounded-lg text-center">
              <div className="text-lg mb-1">💎</div><div className="text-xs">Economy Engine</div>
            </div>
            <div className="p-3 bg-agos-surface rounded-lg text-center">
              <div className="text-lg mb-1">🌠</div><div className="text-xs">Live Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
