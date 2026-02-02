'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
  // Initialize stores on mount
  useEffect(() => {
    const auth = useAuthStore();
    const cart = useCartStore();
    auth.initializeAuth();
    cart.initializeCart();
  }, []);

  return <>{children}</>;
};
