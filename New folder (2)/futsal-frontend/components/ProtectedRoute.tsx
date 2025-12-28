'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // ✅ correct import for TS

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token'); // ✅ get token
    if (!token) router.push('/login');
  }, [router]);

  return <>{children}</>;
}
