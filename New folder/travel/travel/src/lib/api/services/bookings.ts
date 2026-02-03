// src/lib/api/services/bookings.ts
import { apiClient, API_ENDPOINTS } from '../api';
import { Tour } from './tours';

export interface Booking {
  id: string;
  tour: Tour;
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date: string;
  special_requests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  total_price: number;
  created_at: string;
}

export interface CreateBookingData {
  tour: string; // Tour ID
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date: string;
  special_requests?: string;
}

export const bookingsService = {
  // Create booking
  create: async (bookingData: CreateBookingData): Promise<{ success: boolean; data: Booking; message: string }> => {
    const response = await apiClient.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
    return response.data;
  },

  // Get user bookings
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.MY);
    return response.data;
  },
};