export interface Driver {
  id: string;
  name: string;
  rating: number;
  distance: number; // km
  vehicle: string;
  licensePlate: string;
  phone: string;
  accepted?: boolean;
}

export const drivers: Driver[] = [
  {
    id: '1',
    name: 'James Wilson',
    rating: 4.9,
    distance: 2,
    vehicle: 'Honda Civic - Gray',
    licensePlate: 'ABC 123',
    phone: '+1 (555) 123-4567',
    accepted: false,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    rating: 4.85,
    distance: 3,
    vehicle: 'Toyota Prius - Silver',
    licensePlate: 'XYZ 789',
    phone: '+1 (555) 234-5678',
    accepted: false,
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    rating: 4.95,
    distance: 1,
    vehicle: 'Hyundai Elantra - Black',
    licensePlate: 'DEF 456',
    phone: '+1 (555) 345-6789',
    accepted: false,
  },
  {
    id: '4',
    name: 'Sarah Chen',
    rating: 4.88,
    distance: 4,
    vehicle: 'Ford Fusion - White',
    licensePlate: 'GHI 012',
    phone: '+1 (555) 456-7890',
    accepted: false,
  },
];
