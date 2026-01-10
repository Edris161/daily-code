    import { motion } from 'framer-motion';
import { MapPin, Users, Award, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import heroImage from '@/assets/hero-santorini.jpg';

const teamMembers = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & CEO',
    bio: 'With 20 years in luxury travel, Sarah founded Wanderlust to share her passion for transformative journeys.',
  },
  {
    name: 'James Chen',
    role: 'Head of Destinations',
    bio: 'James has visited over 100 countries and personally vets every destination we offer.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Customer Experience',
    bio: 'Elena ensures every traveler receives personalized attention from booking to return.',
  },
  {
    name: 'Marcus Thompson',
    role: 'Adventure Specialist',
    bio: 'A certified mountaineer and diver, Marcus designs our most thrilling expedition packages.',
  },
];

const values = [
  {
    icon: Globe,
    title: 'Sustainable Travel',
    description: 'We partner with local communities and eco-conscious operators to minimize our environmental footprint.',
  },
  {
    icon: Users,
    title: 'Authentic Experiences',
    description: 'We go beyond tourist attractions to connect you with local cultures and hidden gems.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'From planning to execution, we maintain the highest standards in every aspect of your journey.',
  },
  {
    icon: MapPin,
    title: 'Personal Touch',
    description: 'Every itinerary is tailored to your preferences, ensuring a truly unique adventure.',
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground px-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              About Wanderlust
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Crafting extraordinary journeys since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Wanderlust was born from a simple belief: travel should be transformative, 
                not transactional. Founded in 2010 by a group of passionate explorers, 
                we set out to create a travel company that values authentic experiences 
                over checkboxes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to have helped over 50,000 travelers discover the 
                world's most extraordinary destinations. From the ancient temples of 
                Kyoto to the pristine beaches of the Maldives, we've built relationships 
                with local guides, boutique hotels, and hidden gems that you won't find 
                anywhere else.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate travelers dedicated to crafting your perfect journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-soft"
              >
                <div className="aspect-square bg-secondary flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-serif font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
