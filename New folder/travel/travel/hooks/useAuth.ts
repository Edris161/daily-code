import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, User } from '@/lib/api/auth';
import { useAuth as useAuthContext } from '../providers/AuthProvider';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.clear();
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.getProfile,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
    },
  });
};