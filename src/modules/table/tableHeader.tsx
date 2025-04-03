import React, { useState } from 'react';
import { Input } from '@/components/input';

interface TableHeaderProps {
  columns: string[];
  onSort: (column: string) => void;
  sortConfig: { key: string; direction: 'ascending' | 'descending' } | null;
  onFilterChange: (column: string, value: string) => void;
  enableSorting: boolean;
  enableFiltering: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  onSort,
  sortConfig,
  onFilterChange,
  enableSorting,
  enableFiltering,
}) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
    onFilterChange(column, value);
  };

  return (
    <thead className="bg-neutral-50 dark:bg-neutral-800">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-600 ${
              enableSorting
                ? 'cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-400'
                : ''
            }`}
            onClick={() => enableSorting && onSort(column)}
          >
            {column}
            {sortConfig &&
              sortConfig.key === column &&
              (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
        ))}
      </tr>
      {enableFiltering && (
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="px-6 py-3 border-b border-neutral-300 dark:border-neutral-600"
            >
              <Input
                id={`filter-${column}`}
                type="text"
                name={`filter-${column}`}
                value={filters[column] || ''}
                onChange={(e) => handleFilterChange(column, e.target.value)}
                className="mt-1 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded"
              />
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
};
