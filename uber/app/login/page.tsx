'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRideStore } from '@/store/useRideStore';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { setIsAuthenticated, setUserInfo, setUserRole } = useRideStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fake authentication
    const userRole = data.email.includes('driver') ? 'driver' : 'passenger';
    setUserInfo(
      data.email.split('@')[0],
      data.email,
      '+1 (555) 000-0000'
    );
    setUserRole(userRole as 'passenger' | 'driver');
    setIsAuthenticated(true);

    setIsLoading(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your Uber account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email or Phone"
              placeholder="name@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-black hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              disabled={!watch('email') || !watch('password')}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-black font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold text-black mb-2">Demo Accounts:</p>
            <p>📧 passenger@example.com / password123</p>
            <p>🚗 driver@example.com / password123</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
