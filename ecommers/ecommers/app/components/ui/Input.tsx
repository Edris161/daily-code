'use client';

import React from 'react';
import { clsx } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, icon, isLoading, success, id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full px-4 py-2 bg-background border rounded-lg transition-colors transition-base text-foreground placeholder-text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              icon && 'pl-10',
              error
                ? 'border-error bg-red-50 dark:bg-red-900/10'
                : success
                  ? 'border-success bg-green-50 dark:bg-green-900/10'
                  : 'border-border-default hover:border-border-dark',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          />

          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 animate-spin text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          )}

          {success && !isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
              ✓
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-error font-medium">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
