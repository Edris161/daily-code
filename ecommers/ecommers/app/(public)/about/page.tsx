import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'About Us - Alibaba',
  description: 'Learn about Alibaba, the global e-commerce platform connecting buyers and sellers.',
};

export default function AboutPage() {
  return (
    <div className="container-responsive py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">About Alibaba</h1>
        <p className="text-lg text-text-secondary mb-8">
          Connecting global buyers and sellers through cutting-edge e-commerce technology
        </p>

        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We are committed to making it easy for anyone, anywhere to conduct business through
            digital platforms. By connecting buyers and sellers globally, we create value and
            empower economies.
          </p>
        </Card>

        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Integrity</h3>
              <p className="text-sm text-text-secondary">
                We uphold the highest standards of integrity in all our dealings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Innovation</h3>
              <p className="text-sm text-text-secondary">
                We constantly innovate to provide better solutions for our users.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Inclusion</h3>
              <p className="text-sm text-text-secondary">
                We believe in creating opportunities for everyone, everywhere.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">10M+</p>
              <p className="text-sm text-text-secondary">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">2M+</p>
              <p className="text-sm text-text-secondary">Active Sellers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">190+</p>
              <p className="text-sm text-text-secondary">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">$1T+</p>
              <p className="text-sm text-text-secondary">GMV</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
