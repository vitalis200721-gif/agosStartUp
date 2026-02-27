import { useState } from 'react';
import { track, Events } from '../analytics';

const STEPS = [
  {
    icon: '🧠',
    title: 'Tell us your mood',
    description: 'Select how you\'re feeling and your energy level. Our AI will recommend the perfect games for you.'
  },
  {
    icon: '⚔️',
    title: 'Join a Faction',
    description: 'Choose your allegiance! Join a faction, earn XP together, and compete for territory on the weekly leaderboard.'
  },
  {
    icon: '💎',
    title: 'Earn & Spend',
    description: 'Play games to earn XP and coins. Spend them in the marketplace for avatars, boosts, themes, and more.'
  }
];

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else finish();
  };

  const finish = () => {
    localStorage.setItem('agos_onboarded', 'true');
    track(Events.ONBOARDING_COMPLETED, { stepsViewed: step + 1 });
    onComplete();
  };

  const skip = () => {
    localStorage.setItem('agos_onboarded', 'true');
    track(Events.ONBOARDING_SKIPPED, { steppedAt: step });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onKeyDown={e => e.key === 'Escape' && skip()}>
      <div className="card p-8 max-w-md w-full animate-slide-up">
        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-agos-accent' : 'bg-agos-surface'}`} />
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{STEPS[step].icon}</div>
          <h2 className="font-display font-bold text-xl mb-2">{STEPS[step].title}</h2>
          <p className="text-agos-muted text-sm">{STEPS[step].description}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={skip} className="btn-secondary flex-1 text-sm">Skip</button>
          <button onClick={next} className="btn-primary flex-1 text-sm">
            {step < STEPS.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>

        <p className="text-center text-[10px] text-agos-dim mt-3">{step + 1} / {STEPS.length}</p>
      </div>
    </div>
  );
}
