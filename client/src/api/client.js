import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agos_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('agos_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
