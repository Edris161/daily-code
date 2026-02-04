import api from './axios';
import { setAuthTokens, clearAuthTokens } from './axios';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER' | 'GUEST';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  full_name: string;
  phone_number?: string;
  password: string;
  password_confirm: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export const authApi = {
  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/', data);
    setAuthTokens(response.data.access, response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', data);
    setAuthTokens(response.data.access, response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } finally {
      clearAuthTokens();
    }
  },

  // Profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile/');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  // Update Profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile/', data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken: string): Promise<{ access: string; refresh: string }> => {
    const response = await api.post('/auth/refresh/', { refresh: refreshToken });
    setAuthTokens(response.data.access, response.data.refresh);
    return response.data;
  },
};