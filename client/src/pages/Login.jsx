import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const GOOGLE_URL = API_URL.replace('/api', '') + '/api/auth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError, setToken, fetchMe } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle Google OAuth callback token
  useEffect(() => {
    const token = searchParams.get('token');
    const err = searchParams.get('error');
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      fetchMe().then(() => navigate('/'));
    }
    if (err) {
      clearError();
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (await login(email, password)) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agos-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⬡</div>
          <h1 className="font-display font-bold text-3xl tracking-wider">AGOS</h1>
          <p className="text-agos-muted text-sm mt-1">Autonomous Gaming Operating System</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <h2 className="font-display font-bold text-xl text-center">Welcome Back</h2>
          {error && <div className="text-sm text-agos-red bg-agos-red/10 border border-agos-red/30 rounded-lg p-3">{error}</div>}
          {searchParams.get('error') && <div className="text-sm text-agos-red bg-agos-red/10 border border-agos-red/30 rounded-lg p-3">Google sign-in failed. Please try again.</div>}

          {/* Google Sign In */}
          <a href={GOOGLE_URL}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-all border border-gray-200 shadow-sm hover:shadow">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </a>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-agos-border" />
            <span className="text-xs text-agos-dim">or</span>
            <div className="flex-1 h-px bg-agos-border" />
          </div>

          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input-field" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input-field" required />
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Connecting...' : 'Enter AGOS'}</button>
          <p className="text-center text-sm text-agos-muted">New operator? <Link to="/register" className="text-agos-accent-light hover:underline">Create Account</Link></p>
        </form>
      </div>
    </div>
  );
}
