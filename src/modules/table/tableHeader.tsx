import React from 'react';

interface TableHeaderProps {
  columns: string[];
  onSort: (column: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  onSort,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort(column)}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
