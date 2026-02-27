// AGOS Analytics — lightweight event tracker
// In production, replace console with real analytics (Mixpanel, PostHog, etc.)

const IS_DEV = import.meta.env.DEV;
const events = [];

export function track(eventName, properties = {}) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };
  events.push(event);
  if (IS_DEV) console.log(`📊 [Analytics] ${eventName}`, properties);
  // In production: send to analytics endpoint
  // api.post('/api/analytics', event).catch(() => {});
}

// Pre-defined events
export const Events = {
  APP_OPENED: 'app_opened',
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_COMPLETED: 'login_completed',
  MOOD_SELECTED: 'mood_selected',
  RECOMMENDATION_CLICKED: 'recommendation_clicked',
  GAME_LAUNCHED: 'game_launched',
  XP_GAINED: 'xp_gained',
  COINS_EARNED: 'coins_earned',
  PURCHASE_MADE: 'purchase_made',
  FACTION_JOINED: 'faction_joined',
  REALITY_MODE_TOGGLED: 'reality_mode_toggled',
  EVENT_COMPLETED: 'event_completed',
  EVENT_JOINED: 'event_joined',
  SKILL_ALLOCATED: 'skill_allocated',
  SEARCH_PERFORMED: 'search_performed',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  BUG_REPORTED: 'bug_reported',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  ONBOARDING_SKIPPED: 'onboarding_skipped',
};

export function getEvents() { return [...events]; }
