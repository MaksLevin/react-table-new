import { z } from 'zod';

export const TableSchema = z.object({
  tableName: z
    .string()
    .min(3, 'Table name must contain at least 3 characters')
    .nonempty('Table name cannot be empty'),
  columns: z.array(z.string()).min(1, 'Select at least one column'),
  rowSize: z.union([
    z.literal('small'),
    z.literal('medium'),
    z.literal('large'),
  ]),
  enableSorting: z.boolean(),
  enableFiltering: z.boolean(),
  compactMode: z.boolean(),
  paginationType: z.union([
    z.literal('pagination'),
    z.literal('infiniteScroll'),
  ]),
});

export type TableSettings = z.infer<typeof TableSchema>;

export const initialValues: TableSettings = {
  tableName: '',
  columns: [],
  rowSize: 'medium',
  paginationType: 'pagination',
  enableSorting: false,
  enableFiltering: false,
  compactMode: false,
};

export const availableColumns = ['id', 'name', 'age', 'email'];

export interface DataItem {
  [key: string]: number | string;
  id: number;
  name: string;
  age: number;
  email: string;
}

export const data: DataItem[] = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
  // Добавьте больше данных по необходимости
];
