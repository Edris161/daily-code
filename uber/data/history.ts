export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  rideType: 'UberX' | 'UberXL' | 'UberBlack';
  price: number;
  duration: number; // minutes
  distance: number; // km
  driverName: string;
  rating?: number;
  status: 'completed' | 'cancelled';
}

export const rideHistory: RideHistory[] = [
  {
    id: '1',
    date: '2024-01-28',
    pickup: '123 Main St, Downtown',
    dropoff: '456 Park Ave, Uptown',
    rideType: 'UberX',
    price: 18.5,
    duration: 22,
    distance: 5.2,
    driverName: 'James Wilson',
    rating: 5,
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-01-27',
    pickup: 'Airport Terminal 2',
    dropoff: '789 Central Blvd, Midtown',
    rideType: 'UberXL',
    price: 32.0,
    duration: 35,
    distance: 8.1,
    driverName: 'Maria Garcia',
    rating: 4,
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-01-26',
    pickup: '321 Oak Lane',
    dropoff: '654 Elm Street',
    rideType: 'UberX',
    price: 12.5,
    duration: 15,
    distance: 3.5,
    driverName: 'Ahmed Hassan',
    rating: 5,
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-01-25',
    pickup: 'Grand Central Station',
    dropoff: 'Madison Square Garden',
    rideType: 'UberBlack',
    price: 48.0,
    duration: 18,
    distance: 2.8,
    driverName: 'Sarah Chen',
    rating: 5,
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-01-24',
    pickup: '100 Water St',
    dropoff: '500 5th Ave',
    rideType: 'UberX',
    price: 15.0,
    duration: 20,
    distance: 4.2,
    driverName: 'James Wilson',
    rating: 4,
    status: 'completed',
  },
];
