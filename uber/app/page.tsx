'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRideStore } from '@/store/useRideStore';
import { rides } from '@/data/rides';
import { Zap, Users, MapPin, Clock } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useRideStore();
  const { setPickupLocation, setDropoffLocation } = useRideStore();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [errors, setErrors] = useState({ pickup: '', dropoff: '' });

  const handleRequestRide = () => {
    if (!pickup.trim()) {
      setErrors({ ...errors, pickup: 'Pickup location is required' });
      return;
    }
    if (!dropoff.trim()) {
      setErrors({ ...errors, dropoff: 'Dropoff location is required' });
      return;
    }

    setPickupLocation(pickup);
    setDropoffLocation(dropoff);

    if (isAuthenticated) {
      router.push('/ride');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight mb-6">
                Go Anywhere. Get Anything.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Request a ride, hop in, and go. Real quick, real easy.
              </p>

              {/* Location Inputs */}
              <div className="space-y-4 mb-8">
                <LocationInput
                  label="Pickup location"
                  value={pickup}
                  onChange={(value) => {
                    setPickup(value);
                    if (value.trim()) {
                      setErrors({ ...errors, pickup: '' });
                    }
                  }}
                  placeholder="Where to?"
                  error={errors.pickup}
                />
                <LocationInput
                  label="Dropoff location"
                  value={dropoff}
                  onChange={(value) => {
                    setDropoff(value);
                    if (value.trim()) {
                      setErrors({ ...errors, dropoff: '' });
                    }
                  }}
                  placeholder="Where to?"
                  error={errors.dropoff}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleRequestRide}
                className="w-full md:w-auto"
              >
                Request a Ride
              </Button>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-gray-500 font-medium">Ride Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Ride Options
            </h2>
            <p className="text-gray-600">Choose the perfect ride for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rides.map((ride) => (
              <Card key={ride.id} hover>
                <div className="text-center">
                  <div className="text-5xl mb-4">
                    {ride.type === 'UberX' && '🚗'}
                    {ride.type === 'UberXL' && '🚙'}
                    {ride.type === 'UberBlack' && '🖤'}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">{ride.type}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ride.description}</p>
                  <div className="flex gap-4 justify-center text-sm text-gray-600">
                    <span>👥 {ride.capacity} seats</span>
                    <span>⏱️ {ride.arrivalTime} min</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              How Uber Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Open the App</h3>
              <p className="text-gray-600 text-sm">
                Launch Uber and tell us where you're going
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Choose Your Ride</h3>
              <p className="text-gray-600 text-sm">
                Pick the right option for your budget and style
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Sit Back & Relax</h3>
              <p className="text-gray-600 text-sm">
                Watch your driver arrive on the map and enjoy the ride
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Rate & Pay</h3>
              <p className="text-gray-600 text-sm">
                Payment is automatic and you can rate your driver
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
