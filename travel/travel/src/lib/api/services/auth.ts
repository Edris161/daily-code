// src/lib/api/services/auth.ts
import { apiClient, API_ENDPOINTS, STORAGE_KEYS } from '../api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password2: string;
  full_name: string;
  phone_number?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

export const authService = {
  // Login
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { data } = response.data;
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refresh);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
    
    return response.data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    const { data } = response.data;
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refresh);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
    
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (refreshToken) {
      try {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
          refresh: refreshToken,
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    // Clear local storage
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
};