'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  wishlistItems?: string[];
}

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
};

export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      products,
      columns = 4,
      onAddToCart,
      onAddToWishlist,
      wishlistItems = [],
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`grid ${columnClasses[columns]} gap-4`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            isInWishlist={wishlistItems.includes(product.id)}
          />
        ))}
      </div>
    );
  }
);

ProductGrid.displayName = 'ProductGrid';
