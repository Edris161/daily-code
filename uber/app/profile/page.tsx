'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRideStore } from '@/store/useRideStore';
import { useForm } from 'react-hook-form';
import { Heart, Shield, MapPin, CreditCard, Settings } from 'lucide-react';

interface ProfileFormInputs {
  name: string;
  email: string;
  phone: string;
}

export default function Profile() {
  const router = useRouter();
  const { userName, userEmail, userPhone, isAuthenticated, setIsAuthenticated, setUserInfo } =
    useRideStore();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: userName,
      email: userEmail,
      phone: userPhone,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUserInfo(data.name, data.email, data.phone);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">
              You need to be signed in to view your profile
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Your Profile</h1>
            <p className="text-gray-600">Manage your account and settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-black">Personal Information</h2>
                  {!isEditing && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
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
                      label="Phone Number"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone', {
                        required: 'Phone is required',
                        minLength: {
                          value: 10,
                          message: 'Phone must be at least 10 characters',
                        },
                      })}
                      error={errors.phone?.message}
                    />

                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        size="md"
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        isLoading={isSaving}
                        className="flex-1"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {userName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Name</p>
                        <p className="text-xl font-bold text-black">{userName}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-gray-600 text-sm mb-2">Email Address</p>
                      <p className="text-lg text-black font-medium">{userEmail}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-gray-600 text-sm mb-2">Phone Number</p>
                      <p className="text-lg text-black font-medium">{userPhone}</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Account Settings */}
              <Card>
                <h2 className="text-xl font-bold text-black mb-6">Account Settings</h2>

                <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-gray-600" />
                      <span className="font-medium text-black">Payment Methods</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-gray-600" />
                      <span className="font-medium text-black">Privacy & Safety</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings size={20} className="text-gray-600" />
                      <span className="font-medium text-black">Preferences</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Support */}
              <Card>
                <h3 className="font-bold text-black mb-4 flex items-center gap-2">
                  <Heart size={20} />
                  Help & Support
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Need help? Contact our support team
                </p>
                <Button variant="secondary" size="md" className="w-full">
                  Get Help
                </Button>
              </Card>

              {/* Logout */}
              <Card className="bg-red-50 border-red-200">
                <h3 className="font-bold text-black mb-4">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Once you leave, you won't be able to access your account until you sign in again
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Sign Out
                </Button>
              </Card>

              {/* Account Status */}
              <Card className="bg-green-50 border-green-200">
                <div className="text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <h3 className="font-bold text-black">Account Verified</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Your account is fully verified
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
