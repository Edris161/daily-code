import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  destinations: [
    { label: 'Maldives', href: '/destinations/maldives' },
    { label: 'Japan', href: '/destinations/kyoto-japan' },
    { label: 'Peru', href: '/destinations/machu-picchu' },
    { label: 'Iceland', href: '/destinations/iceland-aurora' },
    { label: 'Tanzania', href: '/destinations/tanzania-safari' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Travel Insurance', href: '/insurance' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-serif font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-md"
              aria-label="Wanderlust Travel - Home"
            >
              <Compass className="w-8 h-8" aria-hidden="true" />
              Wanderlust
            </Link>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              Crafting unforgettable journeys to the world's most extraordinary destinations since 2010.
            </p>
            
            {/* Contact Info */}
            <address className="mt-6 space-y-3 not-italic text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>123 Adventure Lane, San Francisco, CA 94102</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+1-800-555-0199"
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
                >
                  +1 (800) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@wanderlust.travel"
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
                >
                  hello@wanderlust.travel
                </a>
              </div>
            </address>
          </div>

          {/* Destinations */}
          <nav aria-label="Popular destinations">
            <h3 className="text-lg font-serif font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company information">
            <h3 className="text-lg font-serif font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support and help">
            <h3 className="text-lg font-serif font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Wanderlust Travel. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
