'use client';

import { FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@/components/typography';

interface SelectProps {
  id?: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  className,
}) => {
  const selectId = id || name;

  return (
    <div className={clsx('mb-4', className)}>
      <Typography
        as="label"
        htmlFor={selectId}
        size="h4"
        className="block mb-2"
      >
        {label}
      </Typography>
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg dark:bg-neutral-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
