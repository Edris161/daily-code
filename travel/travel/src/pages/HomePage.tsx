import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Heart, Plane } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { destinations } from '@/data/destinations';
import heroImage from '@/assets/hero-santorini.jpg';

const features = [
  {
    icon: Shield,
    title: 'Trusted Experts',
    description: 'Over 15 years of crafting unforgettable journeys with 24/7 support.',
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: "We'll match any comparable trip at a lower price.",
  },
  {
    icon: Heart,
    title: 'Curated Experiences',
    description: 'Handpicked destinations and exclusive local experiences.',
  },
  {
    icon: Plane,
    title: 'Seamless Travel',
    description: 'From booking to return, we handle every detail.',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '15+', label: 'Years Experience' },
  { value: '4.9', label: 'Average Rating' },
];

export default function HomePage() {
  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-wide text-center text-primary-foreground px-4 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm md:text-base font-medium tracking-wider uppercase mb-4 opacity-90">
              Premium Travel Experiences
            </p>
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
            >
              Discover the World's
              <br />
              <span className="text-coral">Most Beautiful</span> Places
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Embark on extraordinary journeys to breathtaking destinations. 
              Let us craft your perfect adventure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/destinations">
                  Explore Destinations
                  <ArrowRight className="w-5 h-5 ml-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/tours">View Tour Packages</Link>
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12 md:py-16" aria-label="Company statistics">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section
        className="py-16 md:py-24 bg-background"
        aria-labelledby="destinations-heading"
      >
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
              Featured Destinations
            </p>
            <h2
              id="destinations-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4"
            >
              Handpicked Experiences
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From tropical paradises to ancient wonders, explore our curated selection
              of the world's most extraordinary destinations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/destinations">
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-16 md:py-24 bg-secondary"
        aria-labelledby="features-heading"
      >
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
              Why Wanderlust
            </p>
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4"
            >
              Travel With Confidence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 bg-primary"
        aria-labelledby="cta-heading"
      >
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-4"
            >
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Let our travel experts help you plan the trip of a lifetime. 
              Get personalized recommendations and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="coral" size="xl">
                <Link to="/booking">Start Planning</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="xl"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
