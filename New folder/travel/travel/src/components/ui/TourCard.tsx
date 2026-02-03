import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Mountain, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Tour } from '@/data/tours';

interface TourCardProps {
  tour: Tour;
  index?: number;
  className?: string;
}

const difficultyColors = {
  Easy: 'bg-forest/10 text-forest',
  Moderate: 'bg-gold/20 text-foreground',
  Challenging: 'bg-coral/10 text-coral-dark',
};

export function TourCard({ tour, index = 0, className }: TourCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('group', className)}
    >
      <div className="h-full rounded-xl overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-300 border border-border">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{tour.destination}</p>
              <h3 className="text-xl font-serif font-semibold text-foreground">
                {tour.name}
              </h3>
            </div>
            <span 
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-full flex-shrink-0',
                difficultyColors[tour.difficulty]
              )}
            >
              {tour.difficulty}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {tour.description}
          </p>
        </div>
        
        {/* Details */}
        <div className="p-5 md:p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center text-center p-3 bg-secondary rounded-lg">
              <Calendar className="w-5 h-5 text-primary mb-1" aria-hidden="true" />
              <span className="text-muted-foreground text-xs">Duration</span>
              <span className="font-medium text-foreground">{tour.duration.split('/')[0]}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-primary mb-1" aria-hidden="true" />
              <span className="text-muted-foreground text-xs">Group</span>
              <span className="font-medium text-foreground">{tour.groupSize}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-secondary rounded-lg">
              <Mountain className="w-5 h-5 text-primary mb-1" aria-hidden="true" />
              <span className="text-muted-foreground text-xs">Level</span>
              <span className="font-medium text-foreground">{tour.difficulty}</span>
            </div>
          </div>
          
          {/* Included */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">What's Included</h4>
            <ul className="grid grid-cols-2 gap-1" aria-label="Included amenities">
              {tour.included.slice(0, 4).map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-forest flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Next Departure */}
          <div className="text-sm text-muted-foreground">
            <span>Next departure: </span>
            <span className="font-medium text-foreground">{tour.departureDates[0]}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-5 md:p-6 pt-0 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-2xl font-bold text-primary">
              ${tour.price.toLocaleString()}
            </p>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
          <Button asChild variant="coral">
            <Link 
              to={`/booking?tour=${tour.id}`}
              aria-label={`Book ${tour.name} for $${tour.price.toLocaleString()}`}
            >
              Book Tour
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
