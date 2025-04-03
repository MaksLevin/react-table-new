import React, { useState } from 'react';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

interface AddRowFormProps {
  columns: string[];
  onAddRow: (newRow: { [key: string]: string }) => void;
}

export const AddRowForm: React.FC<AddRowFormProps> = ({
  columns,
  onAddRow,
}) => {
  const [newRow, setNewRow] = useState<{ [key: string]: string }>({});

  const handleInputChange = (column: string, value: string) => {
    setNewRow((prevRow) => ({
      ...prevRow,
      [column]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = `row-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    onAddRow({ ...newRow, id: uniqueId });
    setNewRow({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 mb-4 mx-[1rem]">
      {columns
        .filter((column) => column !== 'id')
        .map((column) => (
          <div key={column} className="flex items-center space-x-2">
            <Input
              id={`add-${column}`}
              type="text"
              label={column}
              name={`add-${column}`}
              value={newRow[column] || ''}
              onChange={(e) => handleInputChange(column, e.target.value)}
              className="mt-1 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded"
            />
          </div>
        ))}
      <Button type="submit" variant="primary" className="self-end">
        Add Row
      </Button>
    </form>
  );
};
