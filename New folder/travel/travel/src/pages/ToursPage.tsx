import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { TourCard } from '@/components/ui/TourCard';
import { tours } from '@/data/tours';

export default function ToursPage() {
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
              Tour Packages
            </h1>
            <p className="text-lg text-muted-foreground">
              Expertly crafted journeys with everything included. Choose your
              adventure and let us handle the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 md:py-16 bg-background" aria-label="Available tours">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
