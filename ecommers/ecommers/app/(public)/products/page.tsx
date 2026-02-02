'use client';

import React, { useState } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Search, Filter } from 'lucide-react';
import { SORT_OPTIONS } from '@/constants';

// Mock products data
const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: `product-${i + 1}`,
  sellerId: 'seller-1',
  name: `Premium Product #${i + 1}`,
  description: 'High-quality product with excellent reviews',
  category: 'Electronics',
  subcategory: 'Smartphones',
  images: ['https://via.placeholder.com/300x300?text=Product'],
  price: 99 + i * 10,
  comparePrice: 149 + i * 10,
  moq: 1,
  variants: [],
  rating: 4.5,
  reviewCount: 128,
  views: 1250,
  status: 'active' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Products</h1>
        <p className="text-text-secondary">Discover products from verified suppliers worldwide</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Main Search */}
        <div className="lg:col-span-3">
          <Input
            type="search"
            placeholder="Search products, brands, suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-border-default rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {Object.entries(SORT_OPTIONS).map(([key, value]) => (
            <option key={key} value={key}>
              {SORT_OPTIONS[key as keyof typeof SORT_OPTIONS]}
            </option>
          ))}
        </select>
      </div>

      {/* Filters Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <Card className="sticky top-20">
            <h3 className="font-bold text-foreground mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Price Range
              </label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Category
              </label>
              <div className="space-y-2">
                {['Electronics', 'Fashion', 'Home & Garden'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm text-text-secondary">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Rating
              </label>
              <div className="space-y-2">
                {['4★ & up', '3★ & up', '2★ & up'].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm text-text-secondary">{rating}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline" fullWidth size="sm">
              Reset Filters
            </Button>
          </Card>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter size={18} />
            Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-96">
                  <Skeleton height={200} className="mb-4 w-full" />
                  <Skeleton height={20} className="mb-2 w-3/4" />
                  <Skeleton height={16} className="mb-4 w-1/2" />
                  <Skeleton height={40} className="w-full" />
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              columns={3}
              wishlistItems={[]}
            />
          ) : (
            <Card className="text-center py-12">
              <p className="text-text-secondary text-lg mb-4">No products found</p>
              <p className="text-text-tertiary">Try adjusting your search or filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
