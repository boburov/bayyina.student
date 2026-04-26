import axios from 'axios';
import { storage } from '../lib/storage';

export const baseApi = axios.create({
  baseURL: 'https://api.bayyina.org.uz/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token on every request
baseApi.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401: clear token and redirect to login
baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
