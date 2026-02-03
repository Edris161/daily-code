export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  image: string;
  category: 'beach' | 'adventure' | 'cultural' | 'nature' | 'city';
  highlights: string[];
  rating: number;
  reviews: number;
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: 'maldives',
    name: 'Maldives Paradise',
    country: 'Maldives',
    description: 'Crystal clear waters and overwater bungalows await in this tropical paradise.',
    longDescription: 'Experience the ultimate luxury escape in the Maldives, where crystal-clear turquoise waters meet pristine white sandy beaches. Stay in exclusive overwater bungalows with glass floors, enjoy world-class snorkeling and diving, and witness breathtaking sunsets over the Indian Ocean.',
    price: 3499,
    duration: '7 Days',
    image: 'maldives',
    category: 'beach',
    highlights: ['Overwater Bungalow', 'Snorkeling', 'Sunset Cruise', 'Spa Treatment'],
    rating: 4.9,
    reviews: 342,
    featured: true,
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu Trek',
    country: 'Peru',
    description: 'Discover the ancient Incan citadel nestled high in the Andes Mountains.',
    longDescription: 'Embark on an unforgettable journey through the Sacred Valley to the legendary Machu Picchu. Trek the iconic Inca Trail, explore ancient ruins, and witness the sunrise over one of the world\'s most mysterious archaeological sites.',
    price: 2899,
    duration: '10 Days',
    image: 'peru',
    category: 'adventure',
    highlights: ['Inca Trail Trek', 'Sacred Valley', 'Local Cuisine', 'Expert Guides'],
    rating: 4.8,
    reviews: 256,
    featured: true,
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto Heritage',
    country: 'Japan',
    description: 'Immerse yourself in traditional Japanese culture and stunning cherry blossoms.',
    longDescription: 'Step into a world of ancient temples, serene gardens, and timeless traditions. Experience Kyoto\'s renowned cherry blossom season, participate in authentic tea ceremonies, and explore historic geisha districts.',
    price: 4199,
    duration: '12 Days',
    image: 'japan',
    category: 'cultural',
    highlights: ['Temple Tours', 'Tea Ceremony', 'Geisha District', 'Cherry Blossoms'],
    rating: 4.9,
    reviews: 189,
    featured: true,
  },
  {
    id: 'iceland-aurora',
    name: 'Northern Lights',
    country: 'Iceland',
    description: 'Witness the magical aurora borealis dance across pristine Arctic skies.',
    longDescription: 'Chase the mystical Northern Lights across Iceland\'s dramatic landscapes. Explore ice caves, soak in geothermal hot springs, and marvel at powerful waterfalls and glaciers in this land of fire and ice.',
    price: 3799,
    duration: '8 Days',
    image: 'iceland',
    category: 'nature',
    highlights: ['Aurora Hunting', 'Ice Caves', 'Hot Springs', 'Glacier Hiking'],
    rating: 4.7,
    reviews: 298,
    featured: true,
  },
  {
    id: 'tanzania-safari',
    name: 'Serengeti Safari',
    country: 'Tanzania',
    description: 'Experience the great migration and Africa\'s most iconic wildlife.',
    longDescription: 'Witness the awe-inspiring great migration and encounter Africa\'s legendary Big Five in their natural habitat. Stay in luxury safari lodges, enjoy game drives at sunrise and sunset, and experience the raw beauty of the African savanna.',
    price: 5299,
    duration: '9 Days',
    image: 'tanzania',
    category: 'nature',
    highlights: ['Game Drives', 'Big Five', 'Luxury Lodge', 'Maasai Culture'],
    rating: 4.9,
    reviews: 176,
    featured: true,
  },
  {
    id: 'santorini-greece',
    name: 'Santorini Escape',
    country: 'Greece',
    description: 'White-washed villages and stunning sunsets on the Aegean Sea.',
    longDescription: 'Discover the enchanting beauty of Santorini with its iconic blue-domed churches and white-washed buildings cascading down volcanic cliffs. Savor local wines, explore ancient ruins, and witness the world\'s most spectacular sunsets.',
    price: 2499,
    duration: '6 Days',
    image: 'hero',
    category: 'beach',
    highlights: ['Wine Tasting', 'Sunset Views', 'Beach Clubs', 'Archaeological Sites'],
    rating: 4.8,
    reviews: 412,
    featured: false,
  },
];

export const categories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'beach', label: 'Beach & Islands' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'nature', label: 'Nature & Wildlife' },
  { id: 'city', label: 'City Breaks' },
];
