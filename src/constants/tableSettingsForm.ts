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
  columns: ['ID'],
  rowSize: 'medium',
  enableSorting: false,
  enableFiltering: false,
  compactMode: false,
  paginationType: 'pagination',
};

export const availableColumns = ['ID', 'Name', 'Age', 'Email', 'Status'];
