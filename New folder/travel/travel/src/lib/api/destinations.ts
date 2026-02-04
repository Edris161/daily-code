import api from './axios';

export interface DestinationImage {
  id: string;
  file_url: string;
  alt_text: string;
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  country: string;
  city: string;
  short_description: string;
  full_description: string;
  cover_image: DestinationImage | null;
  gallery: Array<{
    id: number;
    image: DestinationImage;
    order: number;
  }>;
  latitude: number | null;
  longitude: number | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DestinationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Destination[];
}

export const destinationsApi = {
  // Get all destinations with filters
  getDestinations: async (params?: any): Promise<DestinationListResponse> => {
    const response = await api.get('/destinations/', { params });
    return response.data;
  },

  // Get featured destinations
  getFeaturedDestinations: async (): Promise<Destination[]> => {
    const response = await api.get('/destinations/featured/');
    return response.data;
  },

  // Get single destination
  getDestination: async (slug: string): Promise<Destination> => {
    const response = await api.get(`/destinations/${slug}/`);
    return response.data;
  },
};