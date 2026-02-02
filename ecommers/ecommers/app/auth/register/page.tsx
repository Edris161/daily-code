'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Call API endpoint to register
      // const response = await api.post('/auth/register', {
      //   name: data.fullName,
      //   email: data.email,
      //   password: data.password,
      //   role: searchParams.get('role') || 'buyer',
      // });

      // Mock implementation
      console.log('Register attempt:', data);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to email verification
      router.push('/auth/email-verify?email=' + encodeURIComponent(data.email));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-text-secondary text-sm mt-2">Join Alibaba and start trading</p>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error || undefined}
          />
        </CardBody>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-text-secondary text-sm mb-4">
          By registering, you agree to our{' '}
          <a href="/(public)/terms" className="text-primary hover:text-primary-dark">
            Terms & Conditions
          </a>
        </p>
        <p className="text-text-tertiary text-xs">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
