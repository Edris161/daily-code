'use client';

import React from 'react';
import { Star, MapPin } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Driver } from '@/data/drivers';

interface DriverCardProps {
  driver: Driver;
  onAccept?: (driver: Driver) => void;
  onReject?: (driver: Driver) => void;
  isAccepted?: boolean;
  showActions?: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  onAccept,
  onReject,
  isAccepted = false,
  showActions = true,
}) => {
  return (
    <Card className="bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">{driver.name}</h3>
          <p className="text-sm text-gray-600">{driver.vehicle}</p>
          <p className="text-xs text-gray-500 mt-1">License: {driver.licensePlate}</p>
        </div>
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded">
          <Star size={16} className="text-yellow-500" />
          <span className="font-semibold text-black">{driver.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600 mb-4 text-sm">
        <MapPin size={16} />
        <span>{driver.distance} km away</span>
      </div>

      <div className="bg-white p-3 rounded mb-4 text-sm">
        <p className="text-gray-600">📱 {driver.phone}</p>
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onReject?.(driver)}
            className="flex-1"
          >
            Reject
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => onAccept?.(driver)}
            className="flex-1"
            disabled={isAccepted}
          >
            {isAccepted ? 'Accepted' : 'Accept'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DriverCard;
