import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { DestinationCard, DestinationCardSkeleton } from '@/components/ui/DestinationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { destinations, categories, type Destination } from '@/data/destinations';
import { cn } from '@/lib/utils';










export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading] = useState(false);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === 'all' || dest.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <Layout>
      {/* Page Header */}
      <section
        className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary"
        aria-labelledby="page-heading"
      >
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              id="page-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
            >
              Explore Destinations
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover extraordinary places around the world. From tropical beaches
              to ancient wonders, find your perfect escape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-destinations" className="sr-only">
                Search destinations
              </label>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="search-destinations"
                type="search"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  className={cn(
                    'transition-all',
                    activeCategory === category.id && 'shadow-soft'
                  )}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 bg-background" aria-label="Destination results">
        <div className="container-wide">
          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
            Showing {filteredDestinations.length} destination
            {filteredDestinations.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && (
              <span> in {categories.find((c) => c.id === activeCategory)?.label}</span>
            )}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
                No destinations found
              </h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
