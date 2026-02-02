import Link from 'next/link';

export default function PublicHome() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container-responsive py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Welcome to Alibaba
        </h2>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Enterprise-level multi-vendor e-commerce platform. Buy and sell from sellers
          and suppliers worldwide.
        </p>
        <div className="space-x-4">
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Start Shopping
          </Link>
          <Link
            href="/register?role=seller"
            className="inline-block px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Become a Seller
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-responsive py-16 bg-neutral-50 dark:bg-neutral-900">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Alibaba?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Global Marketplace</h4>
            <p className="text-text-secondary">Connect with buyers and sellers from around the world</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Secure Transactions</h4>
            <p className="text-text-secondary">Enterprise-grade security for all your transactions</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Business Intelligence</h4>
            <p className="text-text-secondary">Advanced analytics and reporting tools for sellers</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-responsive py-16">
        <div className="bg-primary text-white rounded-lg p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of sellers and buyers on Alibaba today
          </p>
          <div className="space-x-4">
            <Link
              href="/register?role=buyer"
              className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-neutral-100 transition-colors font-semibold"
            >
              Register as Buyer
            </Link>
            <Link
              href="/register?role=seller"
              className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Register as Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
