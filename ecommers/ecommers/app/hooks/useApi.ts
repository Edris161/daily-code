'use client';

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { ApiResponse } from '@/types';

/**
 * Hook for GET requests
 */
export const useApiGet = <T,>(
  url: string | null,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<ApiResponse<T>>({
    queryKey: [url],
    queryFn: () => api.get<T>(url!),
    enabled: !!url,
    ...options,
  });
};

/**
 * Hook for POST requests
 */
export const useApiPost = <T,>(
  options?: UseMutationOptions<ApiResponse<T>, Error, { url: string; data?: unknown }>
) => {
  return useMutation<ApiResponse<T>, Error, { url: string; data?: unknown }>({
    mutationFn: ({ url, data }) => api.post<T>(url, data),
    ...options,
  });
};

/**
 * Hook for PUT requests
 */
export const useApiPut = <T,>(
  options?: UseMutationOptions<ApiResponse<T>, Error, { url: string; data?: unknown }>
) => {
  return useMutation<ApiResponse<T>, Error, { url: string; data?: unknown }>({
    mutationFn: ({ url, data }) => api.put<T>(url, data),
    ...options,
  });
};

/**
 * Hook for PATCH requests
 */
export const useApiPatch = <T,>(
  options?: UseMutationOptions<ApiResponse<T>, Error, { url: string; data?: unknown }>
) => {
  return useMutation<ApiResponse<T>, Error, { url: string; data?: unknown }>({
    mutationFn: ({ url, data }) => api.patch<T>(url, data),
    ...options,
  });
};

/**
 * Hook for DELETE requests
 */
export const useApiDelete = <T,>(
  options?: UseMutationOptions<ApiResponse<T>, Error, string>
) => {
  return useMutation<ApiResponse<T>, Error, string>({
    mutationFn: (url) => api.delete<T>(url),
    ...options,
  });
};
