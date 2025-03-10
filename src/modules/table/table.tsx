import React, { useState, useEffect } from 'react';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import Pagination from '@/components/pagination';
import { useTableSettings } from '@/context/tableSettingsContext';
import {
  TableSettings,
  DataItem,
  data as initialData,
} from '@/constants/tableSettingsForm';

const Table: React.FC = () => {
  const { settings } = useTableSettings();
  const [displayedData, setDisplayedData] = useState<DataItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let filteredData = initialData;

    // Apply filtering logic here if needed

    setDisplayedData(filteredData);
  }, [initialData, settings.columns]);

  const handleSort = (column: string) => {
    const sorted = [...displayedData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setDisplayedData(sorted);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <div className={`overflow-x-auto ${settings.compactMode ? 'compact' : ''}`}>
      <table className="min-w-full bg-white dark:bg-neutral-800">
        <TableHeader columns={settings.columns} onSort={handleSort} />
        <tbody>
          {renderRows().map((row, index) => (
            <TableRow key={index} row={row} columns={settings.columns} />
          ))}
        </tbody>
      </table>
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

export default Table;
