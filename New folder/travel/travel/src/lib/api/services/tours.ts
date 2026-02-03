// src/lib/api/services/tours.ts
import { apiClient, API_ENDPOINTS } from '../api';
import { Destination } from './destinations';

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: Destination;
  description: string;
  duration_days: number;
  price: number;
  currency: string;
  max_people: number;
  available_seats: number;
  start_dates: string[];
  included_services: string[];
  excluded_services: string[];
  is_active: boolean;
  created_at: string;
}

export interface TourFilters {
  destination?: string;
  min_price?: number;
  max_price?: number;
  min_duration?: number;
  max_duration?: number;
  search?: string;
  page?: number;
  page_size?: number;
}

export const toursService = {
  // Get all tours
  getAll: async (filters?: TourFilters): Promise<PaginatedResponse<Tour>> => {
    const response = await apiClient.get(API_ENDPOINTS.TOURS.LIST, { params: filters });
    return response.data;
  },

  // Get tour by slug
  getBySlug: async (slug: string): Promise<Tour> => {
    const response = await apiClient.get(API_ENDPOINTS.TOURS.DETAIL(slug));
    return response.data;
  },

  // Get tours by destination
  getByDestination: async (destinationSlug: string): Promise<Tour[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.TOURS.BY_DESTINATION(destinationSlug)
    );
    return response.data;
  },
};