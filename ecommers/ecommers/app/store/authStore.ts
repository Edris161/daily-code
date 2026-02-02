'use client';

import { User, AuthToken, UserRole } from '@/types';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ROLE: 'user_role',
};

interface AuthStore {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: AuthToken | null) => void;
  setIsLoading: (loading: boolean) => void;
  login: (user: User, token: AuthToken) => void;
  logout: () => void;
  refreshToken: (token: AuthToken) => void;
  initializeAuth: () => void;
}

let store: AuthStore = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => {
    store.user = user;
  },
  setToken: (token) => {
    if (token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
      }
    }
    store.token = token;
  },
  setIsLoading: (loading) => {
    store.isLoading = loading;
  },
  login: (user, token) => {
    store.user = user;
    store.token = token;
    store.isAuthenticated = true;
    store.isLoading = false;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, user.role);
    }
  },
  logout: () => {
    store.user = null;
    store.token = null;
    store.isAuthenticated = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  },
  refreshToken: (token) => {
    store.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
    }
  },
  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        store.token = { accessToken: token, refreshToken: '', expiresIn: 0 };
      }
    }
    store.isLoading = false;
  },
};

export const useAuthStore = (): AuthStore => store;
