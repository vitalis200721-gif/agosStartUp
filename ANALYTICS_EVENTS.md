# AGOS Analytics — Event Taxonomy

## Event Catalog

| Event | Trigger | Properties |
|-------|---------|------------|
| `app_opened` | App loads | `version` |
| `signup_completed` | Registration success | `userId` |
| `login_completed` | Login success | `userId` |
| `mood_selected` | Mood button clicked | `mood`, `energy` |
| `recommendation_clicked` | Game card clicked | `gameId`, `gameTitle`, `genre` |
| `game_launched` | External game opened | `gameId`, `gameTitle`, `url` |
| `xp_gained` | XP added to user | `amount`, `source` |
| `coins_earned` | Coins added | `amount`, `source` |
| `purchase_made` | Marketplace purchase | `itemId`, `itemName`, `price`, `category` |
| `faction_joined` | User joins faction | `factionId`, `factionName` |
| `reality_mode_toggled` | Reality Distortion toggled | `enabled` |
| `event_joined` | User joins an event | `eventId`, `eventTitle` |
| `event_completed` | User completes event | `eventId`, `rewards` |
| `skill_allocated` | Skill point spent | `skill`, `newLevel` |
| `search_performed` | Game search executed | `query`, `resultCount` |
| `feedback_submitted` | Feedback form sent | `type`, `message` |
| `bug_reported` | Bug report sent | `type`, `message`, `route`, `appVersion` |
| `onboarding_completed` | Onboarding finished | `stepsViewed` |
| `onboarding_skipped` | Onboarding skipped | `skippedAt` |

## Implementation

Events are tracked via `src/analytics.js`:
```js
import { track, Events } from './analytics';
track(Events.MOOD_SELECTED, { mood: 'excited', energy: 'high' });
```

In development: logged to console (`📊 [Analytics]`).
In production: replace with Mixpanel, PostHog, or custom endpoint.
