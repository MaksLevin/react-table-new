'use client';

import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Typography } from '@/components/typography';
import { Select } from '@/components/select';
import { Checkbox } from '@/components/checkbox';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const TableSchema = z.object({
  tableName: z.string().min(3, 'Table name must contain at least 3 characters'),
  columns: z.array(z.string()).min(1, 'Select at least one column'),
  rowSize: z.union([
    z.literal('small'),
    z.literal('medium'),
    z.literal('large'),
  ]),
  enableSorting: z.boolean(),
  enableFiltering: z.boolean(),
});

type TableSettings = z.infer<typeof TableSchema>;

const initialValues: TableSettings = {
  tableName: '',
  columns: ['ID'],
  rowSize: 'medium',
  enableSorting: false,
  enableFiltering: false,
};

const availableColumns = ['ID', 'Name', 'Age', 'Email', 'Status'];

export default function TableSettingsForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(TableSchema)}
      onSubmit={(values) => {
        console.log('Saving settings', values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md w-full">
          <Typography as="h3" size="h3" className="mb-4">
            Table Settings
          </Typography>

          <Field name="tableName">
            {({ field, meta }: any) => (
              <>
                <Input
                  {...field}
                  id="tableName"
                  type="text"
                  required
                  className="mb-2"
                />
                {meta.touched && meta.error && (
                  <Typography as="p" size="p" className="text-red-500">
                    {meta.error}
                  </Typography>
                )}
              </>
            )}
          </Field>

          <Typography as="label" size="h4" className="mb-2 block">
            Select Columns
          </Typography>

          <Field name="columns">
            {({ meta }: any) => (
              <>
                <div className="mb-4">
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
                  <Typography as="p" size="p" className="text-red-500">
                    {meta.error}
                  </Typography>
                )}
              </>
            )}
          </Field>

          <Field name="rowSize">
            {({ field, meta }: any) => (
              <>
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
                  <Typography as="p" size="p" className="text-red-500">
                    {meta.error}
                  </Typography>
                )}
              </>
            )}
          </Field>

          <div className="mb-4">
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
          </div>

          <Button type="submit" className="mt-4">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}
