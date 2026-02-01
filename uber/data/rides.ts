export interface Ride {
  id: string;
  type: 'UberX' | 'UberXL' | 'UberBlack';
  price: number;
  arrivalTime: number; // minutes
  capacity: number;
  description: string;
  image?: string;
}

export const rides: Ride[] = [
  {
    id: '1',
    type: 'UberX',
    price: 15,
    arrivalTime: 4,
    capacity: 4,
    description: 'Affordable, everyday rides',
  },
  {
    id: '2',
    type: 'UberXL',
    price: 25,
    arrivalTime: 6,
    capacity: 6,
    description: 'Room for your crew',
  },
  {
    id: '3',
    type: 'UberBlack',
    price: 45,
    arrivalTime: 8,
    capacity: 4,
    description: 'Premium rides with professional drivers',
  },
];
