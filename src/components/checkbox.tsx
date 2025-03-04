'use client';

import { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@/components/typography';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={clsx(
          'form-checkbox h-5 w-5 text-brand-red border-gray-300 dark:border-gray-600',
          'focus:ring-brand-red focus:ring-opacity-50',
          'dark:focus:ring-brand-white dark:focus:ring-opacity-50'
        )}
      />
      <Typography
        as="label"
        htmlFor={id}
        className="cursor-pointer text-gray-700 dark:text-gray-300"
      >
        {label}
      </Typography>
    </div>
  );
};
