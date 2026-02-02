'use client';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Package, Heart, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BuyerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-text-secondary">Here's what's happening with your account</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Orders</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Spent</p>
              <p className="text-2xl font-bold text-foreground">$2,450</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Heart className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Wishlist Items</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Pending Reviews</p>
              <p className="text-2xl font-bold text-foreground">2</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Recent Orders</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pb-4 border-b border-border-light last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-foreground">Order #ORD-001{i}</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
                      In Transit
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">Premium Wireless Headphones</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-foreground">$199.99</p>
                    <a href="#" className="text-xs text-primary hover:text-primary-dark">
                      View Details →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/buyer/orders">
              <Button variant="outline" fullWidth className="mt-4">
                View All Orders
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            <Link href="/buyer/cart">
              <Button variant="outline" fullWidth className="gap-2 justify-start">
                <ShoppingCart size={18} />
                Go to Cart
              </Button>
            </Link>
            <Link href="/(public)/products">
              <Button variant="outline" fullWidth className="gap-2 justify-start">
                <ShoppingCart size={18} />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/buyer/wishlist">
              <Button variant="outline" fullWidth className="gap-2 justify-start">
                <Heart size={18} />
                View Wishlist
              </Button>
            </Link>
            <Link href="/buyer/profile">
              <Button variant="outline" fullWidth className="gap-2 justify-start">
                <AlertCircle size={18} />
                Update Profile
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Recommended for You</h2>
        </CardHeader>
        <CardBody>
          <p className="text-text-secondary text-center py-8">
            Browse our personalized recommendations based on your browsing history and preferences.
          </p>
          <Link href="/(public)/products">
            <Button fullWidth>Explore Products</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
