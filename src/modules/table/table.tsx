import React, { useState, useEffect } from 'react';
import { TableHeader } from './tableHeader';
import { TableRow } from './tableRow';
import { Pagination } from '@/components/pagination';
import { useTableSettings } from '@/context/tableSettingsContext';
import {
  TableSettings,
  DataItem,
  data as initialData,
} from '@/constants/tableSettingsForm';
import { Typography } from '@/components/typography';
import { AddRowForm } from './addRowForm';

export const Table: React.FC = () => {
  const { settings } = useTableSettings();
  const [displayedData, setDisplayedData] = useState<DataItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    let filteredData = initialData;
    if (settings.enableFiltering) {
      filteredData = filteredData.filter((item) =>
        Object.keys(filters).every((column) =>
          item[column]
            .toString()
            .toLowerCase()
            .includes(filters[column].toLowerCase())
        )
      );
    }
    setDisplayedData(filteredData);
  }, [initialData, settings.columns, filters, settings.enableFiltering]);

  const handleSort = (column: string) => {
    if (!settings.enableSorting) return;

    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    const sorted = [...displayedData].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setDisplayedData(sorted);
    setSortConfig({ key: column, direction });
  };

  const handleFilterChange = (column: string, value: string) => {
    if (!settings.enableFiltering) return;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddRow = (newRow: { [key: string]: string }) => {
    const newData = [...displayedData, newRow as DataItem];
    setDisplayedData(newData);
  };

  const renderRows = () => {
    if (settings.paginationType === 'pagination') {
      const rowsPerPage =
        settings.rowSize === 'small'
          ? 5
          : settings.rowSize === 'medium'
            ? 10
            : 20;
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return displayedData.slice(startIndex, endIndex);
    }
    return displayedData;
  };

  const totalPages = Math.ceil(
    displayedData.length /
      (settings.rowSize === 'small'
        ? 5
        : settings.rowSize === 'medium'
          ? 10
          : 20)
  );

  return (
    <div className="flex flex-col flex-grow bg-white dark:bg-neutral-800 shadow-md">
      <Typography size={'h1'} as={'h1'} className="mb-4 text-center">
        {settings.tableName}
      </Typography>

      <AddRowForm columns={settings.columns} onAddRow={handleAddRow} />

      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-md">
          <TableHeader
            columns={settings.columns}
            onSort={handleSort}
            sortConfig={sortConfig}
            onFilterChange={handleFilterChange}
            enableSorting={settings.enableSorting}
            enableFiltering={settings.enableFiltering}
          />
          <tbody>
            {renderRows().map((row, index) => (
              <TableRow
                key={row.id || index}
                row={row}
                columns={settings.columns}
              />
            ))}
          </tbody>
        </table>
      </div>

      {settings.paginationType === 'pagination' && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
