'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

type InputProps = {
  id: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  className?: string;
};

const inputVariants = cva(
  'w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-brand-red focus:border-brand-red transition-all',
  {
    variants: {
      theme: {
        light:
          'bg-white text-gray-900 border-gray-300 focus:ring-brand-red focus:border-brand-red',
        dark: 'bg-gray-700 text-white border-gray-600 focus:ring-brand-red focus:border-brand-red',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
);

export default function Input({ id, type, required, className }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          required={required}
          className={clsx(
            inputVariants({ theme: 'light' }),
            'dark:inputVariants({ theme: "dark" })',
            className
          )}
        />
        {type === 'email' && (
          <MailIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
