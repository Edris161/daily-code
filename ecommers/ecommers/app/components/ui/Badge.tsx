'use client';

import React from 'react';
import { clsx } from '@/utils/helpers';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100',
  primary: 'bg-primary bg-opacity-20 text-primary',
  success: 'bg-success bg-opacity-20 text-success',
  warning: 'bg-warning bg-opacity-20 text-warning',
  error: 'bg-error bg-opacity-20 text-error',
  info: 'bg-info bg-opacity-20 text-info',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs font-semibold rounded-md',
  md: 'px-3 py-1.5 text-sm font-semibold rounded-md',
  lg: 'px-4 py-2 text-base font-semibold rounded-lg',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center whitespace-nowrap',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
