'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatCurrency, formatRating } from '@/utils/format';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { product, onAddToCart, onAddToWishlist, isInWishlist = false },
    ref
  ) => {
    const discountPercent = product.comparePrice
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : 0;

    return (
      <Card
        ref={ref}
        hoverable
        className="overflow-hidden flex flex-col h-full transition-transform hover:scale-105"
      >
        {/* Image Container */}
        <Link href={`/product/${product.id}`} className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <div className="aspect-square">
            {product.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                No image
              </div>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <Badge variant="error" size="sm" className="absolute top-2 right-2">
              -{discountPercent}%
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute top-2 left-2 space-y-2">
            <button
              onClick={() => onAddToWishlist?.(product.id)}
              className={`p-2 rounded-full transition-colors ${
                isInWishlist
                  ? 'bg-error text-white'
                  : 'bg-white/80 text-foreground hover:bg-white hover:text-error'
              }`}
              title="Add to wishlist"
            >
              <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4">
          {/* Category */}
          <Badge variant="default" size="sm" className="w-fit mb-2 text-xs">
            {product.category}
          </Badge>

          {/* Name */}
          <Link
            href={`/product/${product.id}`}
            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-2"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="text-warning">{formatRating(product.rating)}</span>
            <span className="text-text-tertiary">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-text-tertiary line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>

          {/* MOQ Info */}
          {product.moq > 1 && (
            <p className="text-xs text-text-tertiary mb-3">MOQ: {product.moq} units</p>
          )}

          {/* Add to Cart Button */}
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => onAddToCart(product.id)}
              className="gap-2 mt-auto"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          )}
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';
