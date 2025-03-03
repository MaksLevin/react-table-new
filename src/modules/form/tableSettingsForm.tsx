import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Typography } from '@/components/typography';
import { Select } from '@/components/select';
import { Checkbox } from '@/components/checkbox';

const TableSchema = z.object({
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

type TableSettings = z.infer<typeof TableSchema>;

const initialValues: TableSettings = {
  tableName: '',
  columns: ['ID'],
  rowSize: 'medium',
  enableSorting: false,
  enableFiltering: false,
  compactMode: false,
  paginationType: 'pagination',
};

const availableColumns = ['ID', 'Name', 'Age', 'Email', 'Status'];

const validate = (values: TableSettings) => {
  const result = TableSchema.safeParse(values);
  if (!result.success) {
    const errors: { [key: string]: string } = {};
    result.error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  }
  return {};
};

export default function TableSettingsForm() {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values) => {
        console.log('Saving settings', values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="flex flex-col min-h-screen p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md h-full">
          <Typography as="h3" size="h3" className="mb-4">
            Table Settings
          </Typography>

          <Field name="tableName">
            {({ field, meta }: any) => (
              <div className="mb-4">
                <Input {...field} id="tableName" type="text" className="mb-2" />
                {meta.touched && meta.error && (
                  <Typography as="p" size="p" variant={'error'}>
                    {meta.error}
                  </Typography>
                )}
              </div>
            )}
          </Field>

          <div className="mb-4">
            <Typography as="label" size="h4" className="mb-2 block">
              Select Columns
            </Typography>
            <Field name="columns">
              {({ meta }: any) => (
                <>
                  <div className="space-y-2">
                    {availableColumns.map((col) => (
                      <Checkbox
                        id={`columns-${col}`}
                        key={col}
                        name="columns"
                        checked={values.columns.includes(col)}
                        label={col}
                        onChange={() => {
                          const newColumns = values.columns.includes(col)
                            ? values.columns.filter((c) => c !== col)
                            : [...values.columns, col];
                          setFieldValue('columns', newColumns);
                        }}
                      />
                    ))}
                  </div>
                  {meta.touched && meta.error && (
                    <Typography as="p" size="p" variant={'error'}>
                      {meta.error}
                    </Typography>
                  )}
                </>
              )}
            </Field>
          </div>

          <Field name="rowSize">
            {({ field, meta }: any) => (
              <div className="mb-4">
                <Select
                  {...field}
                  id="rowSize"
                  name="rowSize"
                  label="Row Size"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                  onChange={handleChange}
                />
                {meta.touched && meta.error && (
                  <Typography as="p" size="p" variant={'error'}>
                    {meta.error}
                  </Typography>
                )}
              </div>
            )}
          </Field>

          <Field name="paginationType">
            {({ field, meta }: any) => (
              <div className="mb-4">
                <Select
                  {...field}
                  id="paginationType"
                  name="paginationType"
                  label="Pagination Type"
                  options={[
                    { value: 'pagination', label: 'Pagination' },
                    { value: 'infiniteScroll', label: 'Infinite Scroll' },
                  ]}
                  onChange={handleChange}
                />
                {meta.touched && meta.error && (
                  <Typography as="p" size="p" variant={'error'}>
                    {meta.error}
                  </Typography>
                )}
              </div>
            )}
          </Field>

          <div className="mb-4 space-y-2">
            <Checkbox
              id="enableSorting"
              name="enableSorting"
              onChange={() =>
                setFieldValue('enableSorting', !values.enableSorting)
              }
              checked={values.enableSorting}
              label="Enable Sorting"
            />
            <Checkbox
              id="enableFiltering"
              name="enableFiltering"
              onChange={() =>
                setFieldValue('enableFiltering', !values.enableFiltering)
              }
              checked={values.enableFiltering}
              label="Enable Filtering"
            />
            <Checkbox
              id="compactMode"
              name="compactMode"
              onChange={() => setFieldValue('compactMode', !values.compactMode)}
              checked={values.compactMode}
              label="Compact Mode"
            />
          </div>

          <Button variant={'primary'} type="submit" className="mt-auto">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}
