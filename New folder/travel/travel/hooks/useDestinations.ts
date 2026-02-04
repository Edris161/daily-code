import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '@/lib/api/destinations';

export const useDestinations = (params?: any) => {
  return useQuery({
    queryKey: ['destinations', params],
    queryFn: () => destinationsApi.getDestinations(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedDestinations = () => {
  return useQuery({
    queryKey: ['destinations', 'featured'],
    queryFn: destinationsApi.getFeaturedDestinations,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDestination = (slug: string) => {
  return useQuery({
    queryKey: ['destination', slug],
    queryFn: () => destinationsApi.getDestination(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};