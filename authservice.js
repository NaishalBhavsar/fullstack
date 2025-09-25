import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Signup
export const signup = (data) => API.post('/auth/signup', data);

// Login
export const login = (data) => API.post('/auth/login', data);

// Profile
export const getProfile = () => API.get('/auth/profile');

// Logout (client-side)
export const logout = () => localStorage.removeItem('token');
