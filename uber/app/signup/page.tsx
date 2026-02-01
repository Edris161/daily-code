'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRideStore } from '@/store/useRideStore';
import { useForm } from 'react-hook-form';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  role: 'passenger' | 'driver';
}

export default function Signup() {
  const router = useRouter();
  const { setIsAuthenticated, setUserInfo, setUserRole } = useRideStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormInputs>({
    defaultValues: {
      role: 'passenger',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const selectedRole = watch('role');

  const onSubmit = async (data: SignupFormInputs) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fake account creation
    setUserInfo(data.name, data.email, '+1 (555) 000-0000');
    setUserRole(data.role);
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
            <h1 className="text-3xl font-bold text-black mb-2">Create your account</h1>
            <p className="text-gray-600">Join millions of riders and drivers worldwide</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Card
                  hover
                  onClick={() => {
                    document.getElementById('role-passenger')?.click();
                  }}
                  className={`cursor-pointer transition-all p-4 text-center ${
                    selectedRole === 'passenger'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-2">🚗</div>
                  <h3 className="font-bold text-black">Ride</h3>
                  <p className="text-xs text-gray-600">Find rides</p>
                  <input
                    id="role-passenger"
                    type="radio"
                    value="passenger"
                    {...register('role')}
                    className="hidden"
                  />
                </Card>

                <Card
                  hover
                  onClick={() => {
                    document.getElementById('role-driver')?.click();
                  }}
                  className={`cursor-pointer transition-all p-4 text-center ${
                    selectedRole === 'driver'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-2">👨‍💼</div>
                  <h3 className="font-bold text-black">Drive</h3>
                  <p className="text-xs text-gray-600">Earn money</p>
                  <input
                    id="role-driver"
                    type="radio"
                    value="driver"
                    {...register('role')}
                    className="hidden"
                  />
                </Card>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-black font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
