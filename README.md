# AGOS — Autonomous Gaming Operating System

> AI-powered gaming command center · v1.0.0

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** running locally (or MongoDB Atlas URI)

### Install & Run

```bash
# 1. Clone the repo
git clone <your-repo>
cd agos

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Configure environment
cd ../server
cp ../.env.example .env
# Edit .env if needed (defaults work for local dev)

# 4. Seed database
npm run seed
# Creates: demo@agos.gg/demo123 + admin@agos.gg/admin123

# 5. Start both servers
# Terminal 1:
cd server && npm run dev     # → http://localhost:5000

# Terminal 2:
cd client && npm run dev     # → http://localhost:5173
```

## 🏗 Architecture

```
agos/
├── client/                    # React (Vite) SPA
│   └── src/
│       ├── api/               # Axios + JWT interceptor
│       ├── components/        # Layout, ErrorBoundary, Toasts, Skeletons, Modals
│       ├── pages/             # 10 pages (lazy-loaded)
│       ├── store/             # Zustand (auth + UI)
│       ├── analytics.js       # Event tracker (19 events)
│       └── config.js          # Feature flags + APP_VERSION
├── server/                    # Node.js + Express API
│   └── src/
│       ├── controllers/       # 6 controllers
│       ├── middleware/         # Auth, errors, rate limit, logging, validation
│       ├── models/            # 6 Mongoose models
│       ├── routes/            # 6 route files
│       ├── services/          # AI, Faction, Economy, Event engines
│       └── seeds/             # Database seeder
├── ARCHITECTURE.md            # Full system architecture
├── ANALYTICS_EVENTS.md        # Event taxonomy (19 events)
├── CHANGELOG.md               # v1.0.0 release notes
├── RELEASE_CHECKLIST.md       # Launch readiness checklist
└── E2E_TEST.md                # Manual test scenario (12 steps)
```

## 🔒 Security

| Layer | Implementation |
|-------|---------------|
| Headers | Helmet (CSP, HSTS, etc.) |
| Rate Limiting | Auth: 15/15min · Actions: 10/min · API: 200/15min |
| Auth | JWT Bearer (7d expiry) |
| Passwords | bcrypt (12 rounds) |
| Validation | Server-side input validation |
| CORS | Restricted to client origin |
| Body Limit | 1MB JSON max |

## 📡 API

Full route table: see [ARCHITECTURE.md](./ARCHITECTURE.md)

Key endpoints:
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Get JWT
- `POST /api/ai/mood` — Submit mood → recommendations
- `GET /api/factions/leaderboard` — Faction ranking
- `POST /api/economy/purchase/:id` — Buy item
- `GET /api/health` — Health check

## 🚢 Deployment

### Frontend → Vercel

```bash
cd client
npx vercel --prod
# Set env: VITE_API_URL=https://your-api.railway.app
```

### Backend → Railway

```bash
cd server
railway init
railway up
# Set envs: MONGODB_URI, JWT_SECRET, CLIENT_URL, NODE_ENV=production
```

### Database → MongoDB Atlas

1. Create free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Get connection string
3. Set `MONGODB_URI` in server env

## 📊 Analytics

19 tracked events. See [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md).
In dev: logs to console. In prod: swap to Mixpanel/PostHog/custom.

## 🛠 Feature Flags

All features can be toggled in `client/src/config.js`:
```js
export const FEATURES = { multiverse: true, marketplace: true, factions: true, ... };
```
Admin users can toggle live via `/admin` panel.

## 📄 Docs

- [CHANGELOG.md](./CHANGELOG.md) — Release notes
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md) — Event taxonomy
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — Launch readiness
- [E2E_TEST.md](./E2E_TEST.md) — Golden path test
