// src/lib/api/services/destinations.ts
import { apiClient, API_ENDPOINTS } from '../api';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  short_description: string;
  full_description?: string;
  image_url?: string;
  gallery_images?: Array<{
    id: string;
    image: string;
    alt_text: string;
    uploaded_at: string;
  }>;
  latitude?: number;
  longitude?: number;
  is_featured: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const destinationsService = {
  // Get all destinations
  getAll: async (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    country?: string;
    city?: string;
    is_featured?: boolean;
  }): Promise<PaginatedResponse<Destination>> => {
    const response = await apiClient.get(API_ENDPOINTS.DESTINATIONS.LIST, { params });
    return response.data;
  },

  // Get featured destinations
  getFeatured: async (): Promise<Destination[]> => {
    const response = await apiClient.get(API_ENDPOINTS.DESTINATIONS.FEATURED);
    return response.data;
  },

  // Get destination by slug
  getBySlug: async (slug: string): Promise<Destination> => {
    const response = await apiClient.get(API_ENDPOINTS.DESTINATIONS.DETAIL(slug));
    return response.data;
  },
};