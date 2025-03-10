import React from 'react';

interface TableRowProps {
  row: any;
  columns: string[];
}

const TableRow: React.FC<TableRowProps> = ({ row, columns }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column} className="px-6 py-4 whitespace-nowrap">
          {row[column]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
