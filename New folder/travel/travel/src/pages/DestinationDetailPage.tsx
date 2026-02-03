import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Check, Calendar, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';
import { tours } from '@/data/tours';

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

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold mb-4">Destination Not Found</h1>
            <Button asChild>
              <Link to="/destinations">Back to Destinations</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedTours = tours.filter(
    (t) => t.destination.toLowerCase() === destination.country.toLowerCase()
  );
  const imageSrc = imageMap[destination.image] || heroImg;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={imageSrc}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Destinations
              </Link>
              <div className="flex items-center gap-2 text-primary-foreground/90 mb-2">
                <MapPin className="w-5 h-5" />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-gold text-gold" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="opacity-80">({destination.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{destination.duration}</span>
                </div>
                <div className="text-lg font-bold">
                  From ${destination.price.toLocaleString()}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  About This Destination
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {destination.longDescription}
                </p>

                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {destination.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {relatedTours.length > 0 && (
                  <>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                      Available Tours
                    </h3>
                    <div className="space-y-4">
                      {relatedTours.map((tour) => (
                        <div
                          key={tour.id}
                          className="p-4 md:p-6 bg-card rounded-xl border border-border shadow-soft"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground mb-1">
                                {tour.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {tour.description}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {tour.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Next: {tour.departureDates[0]}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">From</p>
                                <p className="text-2xl font-bold text-primary">
                                  ${tour.price.toLocaleString()}
                                </p>
                              </div>
                              <Button asChild variant="coral">
                                <Link to={`/booking?tour=${tour.id}`}>Book</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-28 bg-card rounded-xl border border-border shadow-card p-6"
              >
                <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                  Book This Trip
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Starting from</span>
                    <span className="text-2xl font-bold text-primary">
                      ${destination.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">{destination.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground capitalize">
                      {destination.category}
                    </span>
                  </div>
                </div>
                <Button asChild variant="coral" className="w-full" size="lg">
                  <Link to={`/booking?destination=${destination.id}`}>
                    Request Booking
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free cancellation up to 30 days before departure
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
