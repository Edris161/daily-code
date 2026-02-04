import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '@/lib/api/reviews';

export const useTourReviews = (tourSlug: string) => {
  return useQuery({
    queryKey: ['reviews', 'tour', tourSlug],
    queryFn: () => reviewsApi.getTourReviews(tourSlug),
    enabled: !!tourSlug,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.createReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'tour', data.tour] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });
};

export const useMyReviews = () => {
  return useQuery({
    queryKey: ['reviews', 'my'],
    queryFn: reviewsApi.getMyReviews,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
  });
};