'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import MapPlaceholder from '@/components/MapPlaceholder';
import { useRideStore } from '@/store/useRideStore';
import { rideHistory } from '@/data/history';
import { Star, MapPin, Clock, DollarSign, Phone } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const {
    currentRideStatus,
    pickupLocation,
    dropoffLocation,
    selectedRideType,
    estimatedPrice,
    estimatedArrivalTime,
    userName,
    userRole,
    setCurrentRideStatus,
    resetRide,
  } = useRideStore();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelRide = () => {
    setCurrentRideStatus('cancelled');
    resetRide();
    setShowCancelModal(false);
  };

  const handleNewRide = () => {
    resetRide();
    router.push('/');
  };

  if (userRole !== 'passenger') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              This page is for passengers only
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
            <h1 className="text-3xl font-bold text-black">My Rides</h1>
            <p className="text-gray-600">Track your trips and history</p>
          </div>

          {/* Active Ride Section */}
          {currentRideStatus !== 'idle' && (
            <Card className="mb-8 border-black border-2">
              <h2 className="text-2xl font-bold text-black mb-6">Active Trip</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Map */}
                <MapPlaceholder
                  pickupLocation={pickupLocation || 'Pickup'}
                  dropoffLocation={dropoffLocation || 'Dropoff'}
                  showCar={currentRideStatus === 'ongoing'}
                />

                {/* Trip Details */}
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div>
                    <div className="inline-block bg-black text-white px-4 py-2 rounded-full font-semibold text-sm">
                      {currentRideStatus === 'searching' && '🔍 Finding Driver...'}
                      {currentRideStatus === 'accepted' && '✅ Driver Accepted'}
                      {currentRideStatus === 'arrived' && '📍 Driver Arrived'}
                      {currentRideStatus === 'ongoing' && '🚗 On The Way'}
                      {currentRideStatus === 'completed' && '✓ Completed'}
                      {currentRideStatus === 'cancelled' && '❌ Cancelled'}
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-black flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-bold text-black">{pickupLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-gray-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-bold text-black">{dropoffLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trip Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="text-center">
                      <Clock size={20} className="mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">ETA</p>
                      <p className="font-bold text-lg text-black">{estimatedArrivalTime} min</p>
                    </Card>
                    <Card className="text-center">
                      <DollarSign size={20} className="mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Fare</p>
                      <p className="font-bold text-lg text-black">${estimatedPrice}</p>
                    </Card>
                  </div>

                  {/* Driver Info */}
                  {currentRideStatus !== 'searching' && (
                    <Card className="bg-gray-50">
                      <h3 className="font-bold text-black mb-3">Driver Info</h3>
                      <div className="space-y-2 text-sm">
                        <p>👤 <span className="font-semibold">James Wilson</span></p>
                        <p>🚗 <span>Honda Civic</span></p>
                        <p>🎫 <span>License: ABC 123</span></p>
                        <p className="flex items-center gap-1">
                          ⭐ <span className="font-semibold">4.9</span>
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* Actions */}
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowCancelModal(true)}
                    className="w-full"
                  >
                    Cancel Ride
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* No Active Ride */}
          {currentRideStatus === 'idle' && (
            <Card className="text-center mb-8 py-12">
              <div className="text-5xl mb-4">🚗</div>
              <h2 className="text-2xl font-bold text-black mb-2">No Active Trip</h2>
              <p className="text-gray-600 mb-6">
                Request a ride to get started
              </p>
              <Button variant="primary" size="lg" onClick={handleNewRide}>
                Request a Ride
              </Button>
            </Card>
          )}

          {/* Ride History */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Recent Rides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rideHistory.map((ride) => (
                <Card key={ride.id} hover className="bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-black text-lg">{ride.rideType}</h3>
                      <p className="text-xs text-gray-500">{ride.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">${ride.price}</p>
                      {ride.rating && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-sm font-semibold">{ride.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin size={14} />
                      {ride.pickup}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin size={14} />
                      {ride.dropoff}
                    </p>
                  </div>

                  <div className="flex gap-4 text-sm border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-semibold text-black">{ride.distance} km</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold text-black">{ride.duration} min</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Driver</p>
                      <p className="font-semibold text-black">{ride.driverName}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm">
            <h2 className="text-2xl font-bold text-black mb-4">Cancel Ride?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this ride?
            </p>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
              >
                Keep Ride
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCancelRide}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Cancel Ride
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
