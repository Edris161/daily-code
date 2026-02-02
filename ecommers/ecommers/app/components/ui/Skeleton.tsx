'use client';

import React from 'react';
import clsx from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: string | number;
  width?: string | number;
  circle?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      count = 1,
      height = 16,
      width,
      circle = false,
      ...props
    },
    ref
  ) => {
    const skeletons = Array.from({ length: count });

    return (
      <>
        {skeletons.map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? ref : null}
            className={clsx(
              'bg-neutral-200 dark:bg-neutral-700 animate-pulse',
              circle && 'rounded-full',
              !circle && 'rounded-lg',
              className
            )}
            style={{
              height: typeof height === 'number' ? `${height}px` : height,
              width: typeof width === 'number' ? `${width}px` : width,
            }}
            {...(i === skeletons.length - 1 ? props : {})}
          />
        ))}
      </>
    );
  }
);

Skeleton.displayName = 'Skeleton';
