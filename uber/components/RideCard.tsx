'use client';

import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Ride } from '@/data/rides';

interface RideCardProps {
  ride: Ride;
  onSelect: (ride: Ride) => void;
  isSelected?: boolean;
}

const RideCard: React.FC<RideCardProps> = ({ ride, onSelect, isSelected = false }) => {
  return (
    <Card
      hover
      onClick={() => onSelect(ride)}
      className={`cursor-pointer transition-all ${
        isSelected ? 'border-black bg-gray-50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">{ride.type}</h3>
          <p className="text-sm text-gray-600">{ride.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-black">${ride.price}</div>
          <div className="text-xs text-gray-500">est.</div>
        </div>
      </div>

      <div className="flex gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>{ride.arrivalTime} min away</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span>👥 {ride.capacity} seats</span>
        </div>
      </div>

      <Button
        variant={isSelected ? 'primary' : 'secondary'}
        size="md"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(ride);
        }}
      >
        {isSelected ? 'Selected' : 'Select Ride'}
      </Button>
    </Card>
  );
};

export default RideCard;
