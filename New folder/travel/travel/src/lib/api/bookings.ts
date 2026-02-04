import api from './axios';

export interface Booking {
  id: number;
  tour: {
    id: number;
    title: string;
    slug: string;
    price: number;
    currency: string;
    destination: {
      name: string;
      country: string;
    };
  };
  user: number | null;
  user_email: string;
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date: string;
  special_requests: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  total_amount: number;
  booking_reference: string;
  can_be_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  tour_id: number;
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date: string;
  special_requests?: string;
}

export interface BookingListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Booking[];
}

export const bookingsApi = {
  // Create booking
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    const response = await api.post('/bookings/', data);
    return response.data;
  },

  // Get user bookings
  getMyBookings: async (params?: any): Promise<BookingListResponse> => {
    const response = await api.get('/bookings/my/', { params });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId: number): Promise<void> => {
    await api.post(`/bookings/${bookingId}/cancel/`);
  },

  // Update booking status (admin)
  updateBookingStatus: async (bookingId: number, status: string): Promise<Booking> => {
    const response = await api.put(`/bookings/${bookingId}/status/`, { status });
    return response.data;
  },

  // Get all bookings (admin)
  getAllBookings: async (params?: any): Promise<BookingListResponse> => {
    const response = await api.get('/bookings/admin/', { params });
    return response.data;
  },
};