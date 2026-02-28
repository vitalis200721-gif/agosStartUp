import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useAuthStore, useUIStore } from './store';
import { isEnabled, APP_VERSION } from './config';
import { track, Events } from './analytics';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Toasts from './components/Toasts';
import OnboardingModal from './components/OnboardingModal';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy-loaded pages (code splitting)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Factions = lazy(() => import('./pages/Factions'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Events_ = lazy(() => import('./pages/Events'));
const Profile = lazy(() => import('./pages/Profile'));
const MultiverseMap = lazy(() => import('./pages/MultiverseMap'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const HackingGame = lazy(() => import('./pages/HackingGame'));
const PremiumStore = lazy(() => import('./pages/PremiumStore'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-agos-muted font-mono">Loading...</span>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = useAuthStore(s => s.token);
  return token ? children : <Navigate to="/welcome" />;
}

export default function App() {
  const fetchMe = useAuthStore(s => s.fetchMe);
  const token = useAuthStore(s => s.token);
  const realityDistortion = useUIStore(s => s.realityDistortion);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    fetchMe();
    track(Events.APP_OPENED, { version: APP_VERSION });
  }, []);

  // Show onboarding for new users
  useEffect(() => {
    if (token && isEnabled('onboarding') && !localStorage.getItem('agos_onboarded')) {
      setShowOnboarding(true);
    }
  }, [token]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        document.querySelector('[data-search-input]')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <ErrorBoundary>
      <div className={realityDistortion ? 'reality-distortion' : ''}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/welcome" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                {isEnabled('factions') && <Route path="factions" element={<Factions />} />}
                {isEnabled('marketplace') && <Route path="marketplace" element={<Marketplace />} />}
                {isEnabled('events') && <Route path="events" element={<Events_ />} />}
                {isEnabled('multiverse') && <Route path="map" element={<MultiverseMap />} />}
                {isEnabled('profile') && <Route path="profile" element={<Profile />} />}
                {isEnabled('hacking') && <Route path="hacking" element={<HackingGame />} />}
                {isEnabled('premium') && <Route path="premium" element={<PremiumStore />} />}
                {isEnabled('leaderboard') && <Route path="leaderboard" element={<Leaderboard />} />}
                <Route path="about" element={<About />} />
                {isEnabled('admin') && <Route path="admin" element={<AdminDashboard />} />}
                <Route path="admin-panel" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toasts />
        {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
      </div>
    </ErrorBoundary>
  );
}
