// src/lib/api.ts - Main API configuration
import axios from 'axios';

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000,
};

// Storage keys for authentication
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'travel_access_token',
  REFRESH_TOKEN: 'travel_refresh_token',
  USER_DATA: 'travel_user_data',
};

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}/auth/refresh/`,
            { refresh: refreshToken }
          );
          
          const { access } = response.data.data.tokens;
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Clear all auth data
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        
        // Redirect to login
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Export API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    PROFILE: '/auth/profile/',
    REFRESH: '/auth/refresh/',
    LOGOUT: '/auth/logout/',
  },
  DESTINATIONS: {
    LIST: '/destinations/',
    FEATURED: '/destinations/featured/',
    DETAIL: (slug: string) => `/destinations/${slug}/`,
  },
  TOURS: {
    LIST: '/tours/',
    DETAIL: (slug: string) => `/tours/${slug}/`,
    BY_DESTINATION: (slug: string) => `/tours/by-destination/${slug}/`,
  },
  BOOKINGS: {
    CREATE: '/bookings/',
    MY: '/bookings/my/',
  },
  REVIEWS: {
    CREATE: '/reviews/',
    TOUR_REVIEWS: (slug: string) => `/reviews/tour/${slug}/`,
    MY_REVIEWS: '/reviews/my/',
  },
};