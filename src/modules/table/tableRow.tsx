import React from 'react';

interface TableRowProps {
  row: any;
  columns: string[];
}

export const TableRow: React.FC<TableRowProps> = ({ row, columns }) => {
  return (
    <tr className="border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
      {columns.map((column) => (
        <td
          key={column}
          className="px-6 py-4 whitespace-nowrap text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700"
        >
          {row[column]}
        </td>
      ))}
    </tr>
  );
};
