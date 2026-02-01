'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RideCard from '@/components/RideCard';
import MapPlaceholder from '@/components/MapPlaceholder';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useRideStore } from '@/store/useRideStore';
import { rides } from '@/data/rides';
import { MapPin, ArrowRight } from 'lucide-react';

export default function RidePage() {
  const router = useRouter();
  const {
    pickupLocation,
    dropoffLocation,
    selectedRideType,
    setSelectedRideType,
    setEstimatedPrice,
    setEstimatedArrivalTime,
    setCurrentRideStatus,
  } = useRideStore();

  const [selectedRide, setSelectedRide] = useState<typeof rides[0] | null>(null);

  const handleSelectRide = (ride: typeof rides[0]) => {
    setSelectedRide(ride);
    setSelectedRideType(ride.type);
    setEstimatedPrice(ride.price);
    setEstimatedArrivalTime(ride.arrivalTime);
  };

  const handleConfirmRide = () => {
    if (selectedRide) {
      setCurrentRideStatus('searching');
      router.push('/dashboard');
    }
  };

  if (!pickupLocation || !dropoffLocation) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">No Location Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select pickup and dropoff locations first
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/')}>
              Back to Home
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Choose Your Ride</h1>
            <p className="text-gray-600">Select the best option for your trip</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <MapPlaceholder
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                showCar={true}
              />

              {/* Trip Details */}
              <Card className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📍</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Pickup</p>
                      <p className="font-semibold text-black">{pickupLocation}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-start gap-4">
                    <div className="text-2xl">📍</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Dropoff</p>
                      <p className="font-semibold text-black">{dropoffLocation}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Ride Selection Section */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-8 space-y-4">
                <h2 className="text-xl font-bold text-black">Available Rides</h2>

                {rides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onSelect={handleSelectRide}
                    isSelected={selectedRide?.id === ride.id}
                  />
                ))}

                {selectedRide && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleConfirmRide}
                    className="w-full mt-6"
                  >
                    Confirm {selectedRide.type}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push('/')}
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
