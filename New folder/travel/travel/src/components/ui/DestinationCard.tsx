import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Destination } from '@/data/destinations';

// Image imports
import maldivesImg from '@/assets/dest-maldives.jpg';
import peruImg from '@/assets/dest-peru.jpg';
import japanImg from '@/assets/dest-japan.jpg';
import icelandImg from '@/assets/dest-iceland.jpg';
import tanzaniaImg from '@/assets/dest-tanzania.jpg';
import heroImg from '@/assets/hero-santorini.jpg';

const imageMap: Record<string, string> = {
  maldives: maldivesImg,
  peru: peruImg,
  japan: japanImg,
  iceland: icelandImg,
  tanzania: tanzaniaImg,
  hero: heroImg,
};

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  className?: string;
}

export function DestinationCard({ destination, index = 0, className }: DestinationCardProps) {
  const imageSrc = imageMap[destination.image] || heroImg;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('group', className)}
    >
      <Link
        to={`/destinations/${destination.id}`}
        className="block rounded-xl overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`View ${destination.name} in ${destination.country}. Starting from $${destination.price} for ${destination.duration}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt={`${destination.name}, ${destination.country}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
            aria-hidden="true"
          />
          
          {/* Featured Badge */}
          {destination.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
          
          {/* Rating */}
          <div 
            className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm"
            aria-label={`Rating: ${destination.rating} out of 5 stars based on ${destination.reviews} reviews`}
          >
            <Star className="w-4 h-4 fill-gold text-gold" aria-hidden="true" />
            <span className="font-medium text-foreground">{destination.rating}</span>
          </div>
          
          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
            <div className="flex items-center gap-1 text-sm opacity-90 mb-1">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{destination.country}</span>
            </div>
            <h3 className="text-xl font-serif font-semibold">
              {destination.name}
            </h3>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4 md:p-5">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {destination.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{destination.duration}</span>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-muted-foreground">From</span>
              <p className="text-lg font-bold text-primary">
                ${destination.price.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* CTA */}
          <div 
            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm font-medium text-accent group-hover:text-coral-dark transition-colors"
            aria-hidden="true"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Skeleton loader for the card
export function DestinationCardSkeleton() {
  return (
    <div 
      className="rounded-xl overflow-hidden bg-card shadow-soft animate-pulse"
      aria-label="Loading destination"
      role="status"
    >
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-16" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
