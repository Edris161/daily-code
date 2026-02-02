'use client';

import React from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
}

const typeStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: 'bg-success bg-opacity-10',
    border: 'border-success border-opacity-30',
    text: 'text-success',
    icon: '✓',
  },
  error: {
    bg: 'bg-error bg-opacity-10',
    border: 'border-error border-opacity-30',
    text: 'text-error',
    icon: '✕',
  },
  warning: {
    bg: 'bg-warning bg-opacity-10',
    border: 'border-warning border-opacity-30',
    text: 'text-warning',
    icon: '⚠',
  },
  info: {
    bg: 'bg-info bg-opacity-10',
    border: 'border-info border-opacity-30',
    text: 'text-info',
    icon: 'ℹ',
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      type = 'info',
      title,
      message,
      onClose,
      dismissible = true,
      ...props
    },
    ref
  ) => {
    const styles = typeStyles[type];

    return (
      <div
        ref={ref}
        className={clsx(
          'border rounded-lg p-4 flex gap-3 items-start',
          styles.bg,
          styles.border,
          'border',
          className
        )}
        {...props}
      >
        <div className={clsx('flex-shrink-0 font-bold text-lg', styles.text)}>
          {styles.icon}
        </div>

        <div className="flex-1">
          {title && <h4 className={clsx('font-semibold mb-1', styles.text)}>{title}</h4>}
          <p className="text-sm text-foreground">{message}</p>
        </div>

        {dismissible && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-text-tertiary hover:text-foreground transition-colors"
            aria-label="Close alert"
          >
            <X size={18} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
