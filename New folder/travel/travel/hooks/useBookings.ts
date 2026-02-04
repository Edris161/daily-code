import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '@/lib/api/bookings';

export const useBookings = (params?: any) => {
  return useQuery({
    queryKey: ['bookings', 'my', params],
    queryFn: () => bookingsApi.getMyBookings(params),
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsApi.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsApi.cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};