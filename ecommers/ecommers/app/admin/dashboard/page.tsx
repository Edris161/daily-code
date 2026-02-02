'use client';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Package, ShoppingCart, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-text-secondary">Platform overview and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Users</p>
              <p className="text-2xl font-bold text-foreground">12,450</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ShoppingCart className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">45,230</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Package className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Products</p>
              <p className="text-2xl font-bold text-foreground">156,890</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Platform GMV</p>
              <p className="text-2xl font-bold text-foreground">$2.4M</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Pending Reviews</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="pb-4 border-b border-border-light">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Seller Verification</p>
                    <p className="text-sm text-text-secondary">23 pending approvals</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-warning bg-opacity-20 text-warning rounded">
                    High
                  </span>
                </div>
              </div>

              <div className="pb-4 border-b border-border-light last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Product Moderation</p>
                    <p className="text-sm text-text-secondary">8 flagged products</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-error bg-opacity-20 text-error rounded">
                    Urgent
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Dispute Resolution</p>
                    <p className="text-sm text-text-secondary">12 open disputes</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-info bg-opacity-20 text-info rounded">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">System Status</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="pb-4 border-b border-border-light">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">API Health</span>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                  Healthy
                </span>
              </div>
            </div>

            <div className="pb-4 border-b border-border-light">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Database</span>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                  Healthy
                </span>
              </div>
            </div>

            <div className="pb-4 border-b border-border-light">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Payment Gateway</span>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                  Healthy
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Email Service</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                  Degraded
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" fullWidth className="gap-2 justify-center">
              <Users size={18} />
              Manage Users
            </Button>
            <Button variant="outline" fullWidth className="gap-2 justify-center">
              <Package size={18} />
              Moderate Products
            </Button>
            <Button variant="outline" fullWidth className="gap-2 justify-center">
              <ShoppingCart size={18} />
              View Orders
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
