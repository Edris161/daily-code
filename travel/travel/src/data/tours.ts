export interface Tour {
  id: string;
  name: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  groupSize: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  departureDates: string[];
}

export const tours: Tour[] = [
  {
    id: 'maldives-luxury',
    name: 'Maldives Luxury Retreat',
    destination: 'Maldives',
    description: 'All-inclusive luxury experience with overwater villa, spa treatments, and private dining.',
    price: 4999,
    duration: '7 Days / 6 Nights',
    groupSize: 'Private',
    difficulty: 'Easy',
    included: ['Overwater Villa', 'All Meals', 'Spa Package', 'Snorkeling', 'Sunset Cruise', 'Airport Transfers'],
    departureDates: ['Feb 15, 2026', 'Mar 10, 2026', 'Apr 5, 2026'],
  },
  {
    id: 'inca-trail-classic',
    name: 'Classic Inca Trail',
    destination: 'Peru',
    description: 'The iconic 4-day trek to Machu Picchu through stunning Andean landscapes.',
    price: 1899,
    duration: '4 Days / 3 Nights',
    groupSize: '8-12 People',
    difficulty: 'Challenging',
    included: ['Expert Guide', 'Camping Gear', 'All Meals', 'Permits', 'Porter Service', 'Train Return'],
    departureDates: ['Jan 20, 2026', 'Feb 15, 2026', 'Mar 12, 2026', 'Apr 8, 2026'],
  },
  {
    id: 'japan-cultural',
    name: 'Japan Cultural Immersion',
    destination: 'Japan',
    description: 'Deep dive into Japanese culture from Tokyo to Kyoto with local experiences.',
    price: 5499,
    duration: '14 Days / 13 Nights',
    groupSize: '6-10 People',
    difficulty: 'Easy',
    included: ['JR Rail Pass', 'Ryokan Stay', 'Tea Ceremony', 'Cooking Class', 'Temple Tours', 'Local Guides'],
    departureDates: ['Mar 25, 2026', 'Apr 1, 2026', 'Oct 15, 2026'],
  },
  {
    id: 'iceland-complete',
    name: 'Iceland Complete Adventure',
    destination: 'Iceland',
    description: 'Ring road adventure with Northern Lights, glaciers, and geothermal wonders.',
    price: 4299,
    duration: '10 Days / 9 Nights',
    groupSize: '8-14 People',
    difficulty: 'Moderate',
    included: ['4x4 Vehicle', 'All Accommodation', 'Glacier Hike', 'Ice Cave Tour', 'Hot Springs', 'Whale Watching'],
    departureDates: ['Jan 10, 2026', 'Feb 5, 2026', 'Sep 20, 2026', 'Oct 15, 2026'],
  },
  {
    id: 'tanzania-safari-deluxe',
    name: 'Deluxe Safari Experience',
    destination: 'Tanzania',
    description: 'Luxury safari with exclusive lodges and expert wildlife guides.',
    price: 6999,
    duration: '9 Days / 8 Nights',
    groupSize: '4-6 People',
    difficulty: 'Easy',
    included: ['Luxury Lodges', 'Private Safari Vehicle', 'Expert Guide', 'All Meals', 'Domestic Flights', 'Park Fees'],
    departureDates: ['Jun 15, 2026', 'Jul 10, 2026', 'Aug 5, 2026', 'Sep 1, 2026'],
  },
];
