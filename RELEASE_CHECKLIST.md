# AGOS v1.0.0 — Release Checklist

## Pre-Release
- [x] Feature flags system (`config.js`)
- [x] APP_VERSION = "1.0.0" displayed in UI
- [x] CHANGELOG.md generated
- [x] All features working (Dashboard, Factions, Marketplace, Events, Profile, Map)
- [x] JWT auth (register, login, protected routes)
- [x] Seed script with demo data

## Security
- [x] Helmet security headers
- [x] Rate limiting (auth: 15/15min, actions: 10/min, API: 200/15min)
- [x] Input validation middleware
- [x] CORS restricted to client origin
- [x] JSON body size limit (1MB)
- [x] Passwords hashed with bcrypt (12 rounds)
- [x] JWT tokens with expiry

## Performance
- [x] Lazy-loaded routes (React.lazy + Suspense)
- [x] Skeleton loading components
- [x] `prefers-reduced-motion` CSS support
- [x] API proxy (no CORS in dev)

## Observability
- [x] Analytics event tracker (18 events)
- [x] Error boundary (React)
- [x] Server request logging (method, route, status, ms)
- [x] Rate limit logging
- [x] Health endpoint (`/api/health`)
- [x] API status indicator in UI

## UX
- [x] Onboarding modal (3 steps, skip optional)
- [x] Feedback / bug report modal
- [x] Toast notifications
- [x] Mobile responsive sidebar
- [x] Keyboard shortcuts (ESC closes modals, / focuses search)

## Legal & Admin
- [x] Privacy policy page (/privacy)
- [x] Terms of service page (/terms)
- [x] Admin feature toggle panel (/admin)
- [x] About page with version (/about)

## Deploy
- [x] .env.example with all variables
- [x] GitHub Actions CI workflow
- [x] Production-ready server config
- [x] README with setup instructions

## Docs
- [x] CHANGELOG.md
- [x] RELEASE_CHECKLIST.md (this file)
- [x] ANALYTICS_EVENTS.md
- [x] ARCHITECTURE.md
- [x] Golden Path e2e test
