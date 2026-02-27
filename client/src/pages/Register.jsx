import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function Register() {
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (await register(form.email, form.password, form.displayName)) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agos-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⬡</div>
          <h1 className="font-display font-bold text-3xl tracking-wider">AGOS</h1>
          <p className="text-agos-muted text-sm mt-1">Join the autonomous gaming network</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <h2 className="font-display font-bold text-xl text-center">Create Account</h2>
          {error && <div className="text-sm text-agos-red bg-agos-red/10 border border-agos-red/30 rounded-lg p-3">{error}</div>}
          <input value={form.displayName} onChange={e => setForm({...form, displayName: e.target.value})} placeholder="Display Name" className="input-field" required />
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" className="input-field" required />
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password (min 6 chars)" className="input-field" required minLength={6} />
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Initializing...' : 'Initialize Account'}</button>
          <p className="text-center text-sm text-agos-muted">Already registered? <Link to="/login" className="text-agos-accent-light hover:underline">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
