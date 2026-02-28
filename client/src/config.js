// AGOS Feature Flags & App Config
// Toggle features on/off for quick disable during incidents

export const APP_VERSION = '1.0.0';
export const APP_NAME = 'AGOS';
export const APP_FULL_NAME = 'Autonomous Gaming Operating System';

export const FEATURES = {
  dashboard: true,
  multiverse: true,
  marketplace: true,
  factions: true,
  mood: true,
  realityMode: true,
  events: true,
  profile: true,
  skillTree: true,
  achievements: true,
  onboarding: true,
  analytics: true,
  feedbackButton: true,
  whatsNew: true,
  hacking: true,
};

// Helper to check feature
export function isEnabled(feature) {
  return FEATURES[feature] === true;
}
