'use client';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Package, ShoppingCart, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Seller Dashboard</h1>
        <p className="text-text-secondary">Manage your store and grow your business</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$12,450</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ShoppingCart className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Package className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Products</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Store Rating</p>
              <p className="text-2xl font-bold text-foreground">4.8 ★</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Recent Orders</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-4 border-b border-border-light last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-foreground">Order #ORD-001{i}</p>
                        <p className="text-sm text-text-secondary">John Doe</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-foreground">$199.99</p>
                      <a href="#" className="text-xs text-primary hover:text-primary-dark">
                        View Details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/seller/orders">
                <Button variant="outline" fullWidth className="mt-4">
                  View All Orders
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Actions</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            <Link href="/seller/products/new">
              <Button fullWidth className="gap-2 justify-center">
                <Package size={18} />
                Add Product
              </Button>
            </Link>
            <Link href="/seller/analytics">
              <Button variant="outline" fullWidth className="gap-2 justify-center">
                <BarChart3 size={18} />
                Analytics
              </Button>
            </Link>
            <Link href="/seller/profile">
              <Button variant="outline" fullWidth className="gap-2 justify-center">
                <AlertCircle size={18} />
                Store Settings
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
