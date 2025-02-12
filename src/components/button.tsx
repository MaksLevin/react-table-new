'use client';

import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out flex items-center justify-center',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-red text-brand-white hover:bg-error-normalActive dark:bg-error-dark dark:text-brand-white dark:hover:bg-error-darker',
        secondary:
          'bg-neutral-200 text-textColor-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-textColor-50 dark:hover:bg-neutral-600',
        text: 'bg-transparent text-brand-red hover:underline dark:text-error-normal dark:hover:text-error-lightActive',
        icon: 'p-2 rounded-full bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
