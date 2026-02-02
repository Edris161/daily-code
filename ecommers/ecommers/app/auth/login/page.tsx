'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/forms/LoginForm';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuthStore();

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Call API endpoint to authenticate
      // const response = await api.post('/auth/login', {
      //   email: data.email,
      //   password: data.password,
      // });
      
      // Mock implementation
      const mockUser = {
        id: '1',
        email: data.email,
        name: 'John Doe',
        role: 'buyer' as const,
        status: 'active' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const mockToken = {
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        expiresIn: 3600,
      };
      
      auth.login(mockUser, mockToken);
      router.push('/buyer/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-text-secondary text-sm mt-2">Sign in to your Alibaba account</p>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error || undefined}
          />
        </CardBody>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-text-secondary text-sm mb-4">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
            Create one here
          </Link>
        </p>
        <p className="text-text-tertiary text-xs">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
