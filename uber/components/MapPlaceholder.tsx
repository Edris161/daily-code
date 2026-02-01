'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  pickupLocation?: string;
  dropoffLocation?: string;
  showCar?: boolean;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  pickupLocation = 'Pickup Location',
  dropoffLocation = 'Dropoff Location',
  showCar = true,
}) => {
  const [carPosition, setCarPosition] = useState(0);

  useEffect(() => {
    if (!showCar) return;

    const interval = setInterval(() => {
      setCarPosition((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [showCar]);

  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
      {/* Map Container */}
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-gray-600" />
            </div>
            <p className="text-gray-500 font-medium">Map View</p>
          </div>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#666666', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          {/* Line from pickup to dropoff */}
          <line
            x1="15%"
            y1="30%"
            x2="85%"
            y2="70%"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Pickup Location Marker */}
        <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              <MapPin size={20} />
            </div>
          </motion.div>
          <div className="bg-white rounded shadow px-2 py-1 mt-2 text-xs font-medium text-gray-800 whitespace-nowrap">
            {pickupLocation}
          </div>
        </div>

        {/* Dropoff Location Marker */}
        <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              <MapPin size={20} />
            </div>
          </motion.div>
          <div className="bg-white rounded shadow px-2 py-1 mt-2 text-xs font-medium text-gray-800 whitespace-nowrap">
            {dropoffLocation}
          </div>
        </div>

        {/* Animated Car */}
        {showCar && (
          <div className="absolute top-1/2 -translate-y-1/2">
            <motion.div
              animate={{ left: `${carPosition}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            >
              <div className="bg-black text-white rounded-lg w-8 h-5 flex items-center justify-center text-xs font-bold shadow-lg transform -rotate-45">
                🚗
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Distance</p>
            <p className="text-lg font-bold text-black">5.2 km</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-lg font-bold text-black">12 min</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Fare</p>
            <p className="text-lg font-bold text-black">$18.50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
