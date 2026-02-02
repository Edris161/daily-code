'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Heart, Share2, ShoppingCart, MessageCircle, Star, Truck, Shield } from 'lucide-react';
import { formatCurrency, formatRating } from '@/utils/format';

// Mock product data
const MOCK_PRODUCT = {
  id: 'product-1',
  sellerId: 'seller-1',
  name: 'Premium Wireless Headphones Pro',
  description:
    'High-quality wireless headphones with advanced noise cancellation, 30-hour battery life, and premium sound quality.',
  category: 'Electronics',
  subcategory: 'Audio',
  images: [
    'https://via.placeholder.com/600x600?text=Product+Image+1',
    'https://via.placeholder.com/600x600?text=Product+Image+2',
    'https://via.placeholder.com/600x600?text=Product+Image+3',
  ],
  price: 199.99,
  comparePrice: 299.99,
  moq: 1,
  bulkPricing: [
    { minQuantity: 10, maxQuantity: 49, price: 189.99 },
    { minQuantity: 50, maxQuantity: 99, price: 179.99 },
    { minQuantity: 100, price: 169.99 },
  ],
  variants: [
    { id: 'v1', sku: 'SKU-001', name: 'Black', price: 199.99, quantity: 50, attributes: { color: 'Black' } },
    { id: 'v2', sku: 'SKU-002', name: 'Silver', price: 199.99, quantity: 30, attributes: { color: 'Silver' } },
    { id: 'v3', sku: 'SKU-003', name: 'Gold', price: 219.99, quantity: 20, attributes: { color: 'Gold' } },
  ],
  rating: 4.7,
  reviewCount: 342,
  views: 5234,
  status: 'active' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(MOCK_PRODUCT.variants[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const discountPercent = MOCK_PRODUCT.comparePrice
    ? Math.round(
        ((MOCK_PRODUCT.comparePrice - MOCK_PRODUCT.price) / MOCK_PRODUCT.comparePrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Add to cart
    }, 500);
  };

  return (
    <div className="container-responsive py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-2">
          <Card className="mb-4 overflow-hidden">
            <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              {isLoading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={MOCK_PRODUCT.images[selectedImage]}
                  alt={MOCK_PRODUCT.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </Card>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {MOCK_PRODUCT.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-colors ${
                  selectedImage === idx ? 'border-primary' : 'border-border-default'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Title & Rating */}
          <h1 className="text-2xl font-bold text-foreground mb-4">{MOCK_PRODUCT.name}</h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-light">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-warning">{formatRating(MOCK_PRODUCT.rating)}</span>
              <span className="text-sm text-text-tertiary">({MOCK_PRODUCT.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(MOCK_PRODUCT.price)}
              </span>
              {MOCK_PRODUCT.comparePrice && (
                <>
                  <span className="text-lg text-text-tertiary line-through">
                    {formatCurrency(MOCK_PRODUCT.comparePrice)}
                  </span>
                  <Badge variant="error">Save {discountPercent}%</Badge>
                </>
              )}
            </div>
          </div>

          {/* Bulk Pricing */}
          {MOCK_PRODUCT.bulkPricing && MOCK_PRODUCT.bulkPricing.length > 0 && (
            <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 mb-6 p-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Bulk Pricing Available
              </p>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                {MOCK_PRODUCT.bulkPricing.map((pricing, idx) => (
                  <p key={idx}>
                    {pricing.minQuantity}-{pricing.maxQuantity || '+'} units:{' '}
                    <span className="font-bold">{formatCurrency(pricing.price)}</span> each
                  </p>
                ))}
              </div>
            </Card>
          )}

          {/* Variants */}
          <div className="mb-6 pb-6 border-b border-border-light">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Select Variant
            </label>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_PRODUCT.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedVariant === variant.id
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-border-default hover:border-border-dark'
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Quantity (MOQ: {MOCK_PRODUCT.moq})
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(MOCK_PRODUCT.moq, quantity - 1))}
                className="w-10 h-10 border border-border-default rounded-lg hover:border-border-dark flex items-center justify-center"
              >
                −
              </button>
              <Input
                type="number"
                min={MOCK_PRODUCT.moq}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(MOCK_PRODUCT.moq, parseInt(e.target.value) || MOCK_PRODUCT.moq))}
                className="w-20 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-border-default rounded-lg hover:border-border-dark flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-6">
            <Button
              variant="primary"
              fullWidth
              isLoading={isLoading}
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsInWishlist(!isInWishlist)}
            >
              <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
              {isInWishlist ? 'Saved' : 'Save for Later'}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="space-y-3 pt-6 border-t border-border-light">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Truck size={18} />
              <span>Reliable Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Shield size={18} />
              <span>Buyer Protection Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MessageCircle size={18} />
              <span>Get in touch with seller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Description</h2>
            </CardHeader>
            <CardBody>
              <p className="text-text-secondary leading-relaxed">{MOCK_PRODUCT.description}</p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h3 className="font-bold">Seller Information</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <p className="text-sm text-text-tertiary">Seller Rating</p>
              <p className="text-lg font-bold text-primary flex items-center gap-2">
                <Star size={18} className="fill-primary" /> 4.8/5.0
              </p>
            </div>
            <Button variant="outline" fullWidth className="gap-2">
              <MessageCircle size={18} />
              Contact Seller
            </Button>
            <Button variant="outline" fullWidth className="gap-2">
              <Share2 size={18} />
              Share
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
