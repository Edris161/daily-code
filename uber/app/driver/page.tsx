'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DriverCard from '@/components/DriverCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useRideStore } from '@/store/useRideStore';
import { drivers } from '@/data/drivers';
import { rideHistory } from '@/data/history';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';

export default function DriverDashboard() {
  const router = useRouter();
  const { userRole, driverIsOnline, setDriverIsOnline, userName } = useRideStore();
  const [acceptedDriver, setAcceptedDriver] = useState<typeof drivers[0] | null>(null);
  const [localDrivers, setLocalDrivers] = useState(drivers);

  const handleToggleOnline = () => {
    setDriverIsOnline(!driverIsOnline);
  };

  const handleAcceptRide = (driver: typeof drivers[0]) => {
    setAcceptedDriver(driver);
    setLocalDrivers((prev) =>
      prev.map((d) =>
        d.id === driver.id ? { ...d, accepted: true } : d
      )
    );
  };

  const handleRejectRide = (driver: typeof drivers[0]) => {
    setLocalDrivers((prev) =>
      prev.filter((d) => d.id !== driver.id)
    );
  };

  if (userRole !== 'driver') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              This page is for drivers only
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
          {/* Header with Online Toggle */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Driver Dashboard</h1>
              <p className="text-gray-600">Manage your rides and earnings</p>
            </div>

            <Button
              variant={driverIsOnline ? 'primary' : 'secondary'}
              size="md"
              onClick={handleToggleOnline}
            >
              {driverIsOnline ? '🟢 Online' : '⭕ Offline'}
            </Button>
          </div>

          {!driverIsOnline && (
            <Card className="mb-8 bg-yellow-50 border-yellow-200">
              <p className="text-black">
                You're currently offline. Go online to start accepting rides.
              </p>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <p className="text-gray-600 text-sm">Today's Earnings</p>
              <p className="text-3xl font-bold text-black mt-2">$156.75</p>
            </Card>
            <Card className="text-center">
              <p className="text-gray-600 text-sm">Rides Completed</p>
              <p className="text-3xl font-bold text-black mt-2">12</p>
            </Card>
            <Card className="text-center">
              <p className="text-gray-600 text-sm">Rating</p>
              <p className="text-3xl font-bold text-black mt-2">4.9 ⭐</p>
            </Card>
            <Card className="text-center">
              <p className="text-gray-600 text-sm">Active Rides</p>
              <p className="text-3xl font-bold text-black mt-2">{localDrivers.length}</p>
            </Card>
          </div>

          {/* Available Ride Requests */}
          {driverIsOnline && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">Available Ride Requests</h2>

              {localDrivers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {localDrivers.map((driver) => (
                    <DriverCard
                      key={driver.id}
                      driver={driver}
                      onAccept={handleAcceptRide}
                      onReject={handleRejectRide}
                      isAccepted={acceptedDriver?.id === driver.id}
                      showActions={true}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <div className="text-5xl mb-4">🚗</div>
                  <p className="text-gray-600">
                    No available ride requests at the moment
                  </p>
                </Card>
              )}
            </div>
          )}

          {acceptedDriver && (
            <Card className="mb-8 border-green-500 border-2 bg-green-50">
              <h2 className="text-xl font-bold text-black mb-4">✅ Ride Accepted</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-black mb-3">Passenger Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>👤 <span className="font-semibold">John Doe</span></p>
                    <p>📱 +1 (555) 123-4567</p>
                    <p className="flex items-center gap-1">
                      ⭐ <span className="font-semibold">4.8</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-3">Trip Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>📍 <span>123 Main St → 456 Park Ave</span></p>
                    <p>💰 <span>Estimated Fare: $18.50</span></p>
                    <p>⏱️ <span>Estimated Time: 22 min</span></p>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => setAcceptedDriver(null)}
                className="w-full mt-6"
              >
                Complete Ride
              </Button>
            </Card>
          )}

          {/* Ride History */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Recent Rides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rideHistory.slice(0, 4).map((ride) => (
                <Card key={ride.id} className="bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-black text-lg">Ride Completed</h3>
                      <p className="text-xs text-gray-500">{ride.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">+${ride.price}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-sm font-semibold">{ride.rating || 5}</span>
                      </div>
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
                      <p className="text-gray-500">Passenger</p>
                      <p className="font-semibold text-black">{ride.driverName}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
