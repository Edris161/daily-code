'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblingCount = 1 }, ref) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const totalNumbers = siblingCount + 5;

      if (totalPages <= totalNumbers) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        let startPage = Math.max(1, currentPage - siblingCount);
        let endPage = Math.min(totalPages, currentPage + siblingCount);

        if (currentPage <= siblingCount + 2) {
          endPage = totalNumbers - 1;
        } else if (currentPage >= totalPages - siblingCount - 1) {
          startPage = totalPages - totalNumbers + 2;
        }

        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) pages.push('...');
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div
        ref={ref}
        className="flex items-center justify-center gap-2 py-4"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2"
        >
          <ChevronLeft size={18} />
        </Button>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 py-1 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={clsx(
                    'w-10 h-10 p-0',
                    page === currentPage && 'pointer-events-none'
                  )}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
