import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-300 dark:border-neutral-700">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 disabled:text-neutral-300 dark:disabled:text-neutral-500"
      >
        <span className="mr-2">&larr;</span> Previous
      </button>
      <span className="text-neutral-700 dark:text-neutral-200">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 disabled:text-neutral-300 dark:disabled:text-neutral-500"
      >
        Next <span className="ml-2">&rarr;</span>
      </button>
    </div>
  );
};
