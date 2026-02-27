# Changelog

All notable changes to AGOS will be documented in this file.

## [1.0.0] — 2026-02-27

### 🚀 Launch Features
- **AI Core**: Mood-based game recommendations with 8 moods × 3 energy levels
- **Gamer Archetype**: AI classifies players (Explorer, Strategist, Killer, etc.)
- **Playstyle Analysis**: 5-axis radar (aggression, exploration, social, competitive, creative)
- **Multiverse Map**: Interactive genre cluster visualization with game browsing
- **Factions**: 5 factions, join/leave, XP contribution, weekly leaderboard, territory scoring
- **Marketplace**: 10 items, dynamic pricing (demand/rarity/scarcity), inventory system
- **Events**: Timed challenges with XP/coin rewards, auto-generation, progress tracking
- **Profile**: XP/level system, skill tree (5 skills × 10 levels), achievement badges
- **Reality Distortion Mode**: CSS glitch effect toggle

### 🔐 Auth
- JWT-based authentication (register, login, protected routes)
- Role system (user/admin)

### 🛠 Tech Stack
- Frontend: React 18 + Vite + TailwindCSS + Zustand
- Backend: Node.js + Express + MongoDB (Mongoose)
- Scheduling: node-cron (faction resets, event management)
