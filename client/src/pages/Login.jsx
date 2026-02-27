import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function Login() {
  const [email, setEmail] = useState('demo@agos.gg');
  const [password, setPassword] = useState('demo123');
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

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
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input-field" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input-field" required />
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Connecting...' : 'Enter AGOS'}</button>
          <p className="text-center text-sm text-agos-muted">New operator? <Link to="/register" className="text-agos-accent-light hover:underline">Create Account</Link></p>
        </form>
        <p className="text-center text-xs text-agos-dim mt-4">Demo: demo@agos.gg / demo123</p>
      </div>
    </div>
  );
}
