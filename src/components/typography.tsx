import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      standard: 'text-textColor-100 dark:text-textColor-50',
      secondary: 'text-textColor-200 dark:text-textColor-100',
      muted: 'text-neutral-500 dark:text-neutral-300',
    },
    size: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      p: 'text-base',
      span: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'p',
  },
});

type TypographyProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
  };

export const Typography = ({
  className,
  variant,
  size,
  as: Tag = 'p',
  htmlFor,
  ...props
}: TypographyProps) => {
  return (
    <Tag
      className={cn(typographyVariants({ variant, size }), className)}
      {...(Tag === 'label' ? { htmlFor } : {})}
      {...props}
    />
  );
};
