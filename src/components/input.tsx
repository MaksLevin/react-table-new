'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

type InputProps = {
  id: string;
  type: 'text' | 'email' | 'password';
  name: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const inputVariants = cva(
  'w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-brand-red focus:border-brand-red transition-all',
  {
    variants: {
      theme: {
        light:
          'bg-brand-white text-neutral-900 border-neutral-300 focus:ring-brand-red focus:border-brand-red',
        dark: 'bg-neutral-700 text-brand-white border-neutral-600 focus:ring-brand-red focus:border-brand-red',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
);

export function Input({
  id,
  type,
  name,
  required,
  className,
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isValid) {
        setError('Invalid email address');
        return;
      }
      setError(null);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          required={required}
          value={value}
          className={clsx(
            inputVariants({ theme: 'light' }),
            'dark:inputVariants({ theme: "dark" })',
            className,
            error &&
              'border-error-normal focus:border-error-normal focus:ring-error-normal'
          )}
          onChange={handleChange}
        />
        {type === 'email' && (
          <MailIcon className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-error-normal text-sm mt-1">{error}</p>}
    </div>
  );
}
