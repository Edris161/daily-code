// lib/api.ts
import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookie.get('access_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
