'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  closeButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      closeButton = true,
      size = 'md',
      className,
    },
    ref
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            ref={ref}
            className={clsx(
              'w-full bg-background border border-border-default rounded-lg shadow-lg pointer-events-auto',
              sizeStyles[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || closeButton) && (
              <div className="flex items-start justify-between p-6 border-b border-border-light">
                <div>
                  {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
                  {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
                </div>

                {closeButton && (
                  <button
                    onClick={onClose}
                    className="text-text-tertiary hover:text-foreground transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';
