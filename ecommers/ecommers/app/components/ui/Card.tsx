'use client';

import React from 'react';
import { clsx } from '@/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clickable?: boolean;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable = false, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-background border border-border-default rounded-lg p-6',
          'transition-all transition-base',
          hoverable && 'hover:shadow-md hover:border-border-dark',
          clickable && 'cursor-pointer hover:shadow-md hover:border-border-dark',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('pb-4 border-b border-border-light', className)} {...props}>
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';

export const CardBody = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('py-4', className)} {...props}>
    {children}
  </div>
);

CardBody.displayName = 'CardBody';

export const CardFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('pt-4 border-t border-border-light', className)} {...props}>
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';
