import api from './axios';

export interface Tour {
  id: number;
  destination: {
    id: number;
    name: string;
    slug: string;
    country: string;
    city: string;
    short_description: string;
  };
  title: string;
  slug: string;
  description: string;
  duration_days: number;
  price: number;
  currency: string;
  max_people: number;
  available_spots: number;
  start_dates: string[];
  included_services: string;
  excluded_services: string;
  gallery: Array<{
    id: number;
    image: {
      id: string;
      file_url: string;
      alt_text: string;
    };
    order: number;
  }>;
  is_active: boolean;
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface TourListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tour[];
}

export interface TourFilters {
  destination?: string;
  min_price?: number;
  max_price?: number;
  min_duration?: number;
  max_duration?: number;
  active?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}

export const toursApi = {
  // Get all tours
  getTours: async (filters?: TourFilters): Promise<TourListResponse> => {
    const response = await api.get('/tours/', { params: filters });
    return response.data;
  },

  // Get single tour
  getTour: async (slug: string): Promise<Tour> => {
    const response = await api.get(`/tours/${slug}/`);
    return response.data;
  },

  // Get tours by destination
  getToursByDestination: async (
    destinationSlug: string, 
    filters?: TourFilters
  ): Promise<TourListResponse> => {
    const response = await api.get(`/tours/by-destination/${destinationSlug}/`, { params: filters });
    return response.data;
  },
};