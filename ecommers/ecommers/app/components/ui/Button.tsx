'use client';

import React from 'react';
import { clsx } from '@/utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-primary hover:bg-primary hover:bg-opacity-10 active:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed',
  danger:
    'bg-error text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed',
  success:
    'bg-success text-white hover:bg-green-600 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-medium rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-medium transition-colors transition-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
