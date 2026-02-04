import { useQuery } from '@tanstack/react-query';
import { toursApi } from '@/lib/api/tours';

export const useTours = (filters?: any) => {
  return useQuery({
    queryKey: ['tours', filters],
    queryFn: () => toursApi.getTours(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTour = (slug: string) => {
  return useQuery({
    queryKey: ['tour', slug],
    queryFn: () => toursApi.getTour(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useToursByDestination = (destinationSlug: string, filters?: any) => {
  return useQuery({
    queryKey: ['tours', 'destination', destinationSlug, filters],
    queryFn: () => toursApi.getToursByDestination(destinationSlug, filters),
    enabled: !!destinationSlug,
    staleTime: 5 * 60 * 1000,
  });
};