# AGOS — Golden Path E2E Test

Manual test scenario covering the complete user flow.

## Prerequisites
- MongoDB running locally
- `npm run seed` completed
- Backend running (`npm run dev` in server/)
- Frontend running (`npm run dev` in client/)

## Test Scenario: New User → Full Flow

### 1. Registration
1. Open http://localhost:5173
2. Should redirect to `/login`
3. Click "Create Account" link
4. Fill: DisplayName=`TestGamer`, Email=`test@test.com`, Password=`test123`
5. Click "Initialize Account"
6. **Expected**: Redirect to Dashboard, onboarding modal appears
7. **Verify**: User name shown in topbar

### 2. Onboarding
1. Onboarding modal should be visible (3 steps)
2. Click "Next" → Step 2 (Factions)
3. Click "Next" → Step 3 (Economy)
4. Click "Get Started"
5. **Expected**: Modal closes, dashboard visible
6. **Verify**: Onboarding doesn't reappear on refresh

### 3. Mood Selection + Recommendations
1. On Dashboard, select "Excited" mood
2. Set energy to "High"
3. **Expected**: Loading spinner → game recommendations appear
4. **Verify**: Games shown are Action/Shooter/Racing heavy
5. Click a game card → should open in new tab

### 4. Multiverse Map
1. Navigate to "Multiverse" via sidebar
2. **Verify**: Genre clusters displayed as colored circles
3. Click "Action" cluster
4. **Expected**: Games list appears filtered by Action
5. Use search → type "Chess" → press Enter
6. **Verify**: Chess appears in results

### 5. Join Faction
1. Navigate to "Factions"
2. **Verify**: 5 factions displayed, leaderboard visible
3. Click "Join Faction" on any faction
4. **Expected**: Toast "Joined [faction]!", card shows "YOUR FACTION"
5. **Verify**: User info in topbar still works

### 6. Marketplace Purchase
1. Navigate to "Market"
2. **Verify**: Coins shown in header
3. Browse items, click "Buy" on "Neon Avatar Frame" (50 coins)
4. **Expected**: Toast "Purchased!", coins decrease by 50
5. Click "Inventory" tab
6. **Verify**: Neon Avatar Frame appears in inventory

### 7. Events
1. Navigate to "Events"
2. **Verify**: 3 active events shown with countdown timers
3. Click "Join Event" on "Launch Week Challenge"
4. **Expected**: Toast "Joined event!"

### 8. Profile + Skills
1. Navigate to "Profile"
2. **Verify**: XP bar, level, coins, games played visible
3. If skill points available: click "+1" on a skill
4. **Verify**: Skill bar increases
5. **Verify**: Achievements section visible (may be empty for new user)
6. **Verify**: Playstyle analysis section visible

### 9. Settings & About
1. Click "About" in sidebar
2. **Verify**: Version "v1.0.0" displayed
3. Click "Feedback" button in sidebar
4. **Verify**: Feedback modal opens, select "Bug", type message, submit
5. **Verify**: Toast "Bug report sent!"

### 10. Keyboard & UX
1. Press ESC → any open modal should close
2. Press `/` → search input should focus (on map page)
3. Click sidebar collapse button → sidebar collapses
4. Resize to mobile → sidebar auto-handles

### 11. Admin Panel (login as admin)
1. Logout → Login as admin@agos.gg / admin123
2. Navigate to "Admin" in sidebar
3. **Verify**: Feature toggles visible
4. Toggle "marketplace" off
5. **Verify**: "Market" link disappears from sidebar
6. Toggle back on

### 12. API Health
1. **Verify**: Green dot in topbar (API online)
2. Stop backend server
3. **Verify**: Red dot + "Offline" appears within 60s
4. Restart server → green dot returns

## Pass Criteria
All 12 scenarios complete without console errors (except expected 401 on initial load).
