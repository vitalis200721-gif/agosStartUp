# AGOS Architecture

## High-Level Overview

```
┌─────────────┐     REST API      ┌──────────────┐     Mongoose     ┌──────────┐
│   React UI  │ ◄──────────────► │ Express API  │ ◄──────────────► │ MongoDB  │
│ (Vite/SPA)  │    JWT Bearer     │  (Node.js)   │                  │          │
└─────────────┘                   └──────────────┘                  └──────────┘
                                         │
                                    ┌────┴────┐
                                    │ node-   │
                                    │ cron    │
                                    └─────────┘
```

## Frontend Modules

| Module | Path | Description |
|--------|------|-------------|
| `App` | `src/App.jsx` | Router, lazy loading, error boundary, onboarding |
| `Layout` | `src/components/Layout.jsx` | Sidebar, topbar, API health, feedback |
| `Dashboard` | `src/pages/Dashboard.jsx` | Mood selector, AI recommendations, stats |
| `MultiverseMap` | `src/pages/MultiverseMap.jsx` | Genre clusters, game search, game grid |
| `Factions` | `src/pages/Factions.jsx` | Leaderboard, faction cards, join/leave |
| `Marketplace` | `src/pages/Marketplace.jsx` | Shop/inventory tabs, purchase, categories |
| `Events` | `src/pages/Events.jsx` | Event list, challenges, countdown, join |
| `Profile` | `src/pages/Profile.jsx` | XP bar, skill tree, achievements, analysis |
| `AdminPanel` | `src/pages/AdminPanel.jsx` | Feature toggles (admin only) |
| `Auth Store` | `src/store/index.js` | Zustand: auth + UI state |
| `API Client` | `src/api/client.js` | Axios + JWT interceptor |
| `Analytics` | `src/analytics.js` | Event tracking (19 events) |
| `Config` | `src/config.js` | Feature flags, APP_VERSION |

## Backend Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/register` | POST | — | Create account |
| `/api/auth/login` | POST | — | Get JWT token |
| `/api/auth/me` | GET | ✅ | Current user |
| `/api/auth/me` | PUT | ✅ | Update profile |
| `/api/auth/skills` | POST | ✅ | Allocate skill point |
| `/api/ai/mood` | POST | ✅ | Submit mood → get recs |
| `/api/ai/recommendations` | GET | ✅ | Get recommendations |
| `/api/ai/profile-analysis` | GET | ✅ | Archetype + playstyle |
| `/api/ai/play-log` | POST | ✅ | Log game play |
| `/api/factions` | GET | — | List factions |
| `/api/factions/:slug` | GET | — | Faction detail |
| `/api/factions/:id/join` | POST | ✅ | Join faction |
| `/api/factions/leave` | POST | ✅ | Leave faction |
| `/api/factions/leaderboard` | GET | — | Weekly ranking |
| `/api/economy/marketplace` | GET | — | Browse items |
| `/api/economy/purchase/:id` | POST | ✅ | Buy item |
| `/api/economy/inventory` | GET | ✅ | User inventory |
| `/api/economy/balance` | GET | ✅ | Coin balance |
| `/api/events` | GET | — | List events |
| `/api/events/:id` | GET | ✅ | Event detail |
| `/api/events/:id/join` | POST | ✅ | Join event |
| `/api/events/:id/progress` | PUT | ✅ | Update progress |
| `/api/games` | GET | — | List games |
| `/api/games/clusters` | GET | — | Genre clusters |
| `/api/games/:id` | GET | — | Game detail |
| `/api/health` | GET | — | Health check |

## Data Models

| Model | Key Fields |
|-------|------------|
| **User** | email, password(hashed), displayName, role, coins, xp, level, skills{5}, faction, inventory[], achievements[] |
| **Faction** | name, slug, icon, color, members[], xp, weeklyXp, territories, leader |
| **GameProfile** | user, gamerArchetype, playstyle{5}, moodHistory[], playHistory[], genrePreferences(Map) |
| **Achievement** | title, icon, category, rarity, xpReward, condition{type,value} |
| **Event** | title, type, status, dates, rewards, challenges[], participants[] |
| **MarketItem** | name, category, rarity, basePrice, currentPrice, stock, effects |

## Security Layers

1. **Helmet** — HTTP security headers
2. **CORS** — Restricted to client origin
3. **Rate Limiting** — Auth (15/15min), Actions (10/min), General (200/15min)
4. **JWT** — Bearer token auth, 7d expiry
5. **bcrypt** — Password hashing (12 rounds)
6. **Input Validation** — Server-side validation middleware
7. **Body Limit** — 1MB JSON max
