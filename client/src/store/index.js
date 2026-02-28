import { create } from 'zustand';
import api from '../api/client';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('agos_token'),
  loading: false,
  error: null,

  setToken: (token) => {
    localStorage.setItem('agos_token', token);
    set({ token });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('agos_token', data.token);
      set({ user: data.user, token: data.token, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Login failed', loading: false });
      return false;
    }
  },

  register: async (email, password, displayName) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { email, password, displayName });
      localStorage.setItem('agos_token', data.token);
      set({ user: data.user, token: data.token, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Registration failed', loading: false });
      return false;
    }
  },

  fetchMe: async () => {
    if (!get().token) return;
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user });
    } catch { set({ user: null, token: null }); localStorage.removeItem('agos_token'); }
  },

  logout: () => {
    localStorage.removeItem('agos_token');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null })
}));

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  realityDistortion: false,
  onlineUsers: 0,
  toasts: [],
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleReality: () => set(s => ({ realityDistortion: !s.realityDistortion })),
  setOnlineUsers: (count) => set({ onlineUsers: count }),
  addToast: (msg, type = 'info') => {
    const id = Date.now();
    set(s => ({ toasts: [...s.toasts, { id, msg, type }] }));
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 4000);
  }
}));
