import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  color?: 'primary' | 'danger' | 'gray';
}

const variantStyles = {
  filled: {
    primary: 'bg-[var(--color-primary-500)] text-white',
    danger: 'bg-[var(--color-red-500)] text-white',
    gray: 'bg-[var(--color-gray-200)] text-[var(--color-gray-900)]',
  },
  outline: {
    primary:
      'border border-[var(--color-primary-500)] text-[var(--color-primary-500)]',
    danger: 'border border-[var(--color-red-500)] text-[var(--color-red-500)]',
    gray: 'border border-[var(--color-gray-200)] text-[var(--color-gray-200)]',
  },
  ghost: {
    primary: 'text-[var(--color-primary-500)]',
    danger: 'text-[var(--color-red-500)]',
    gray: 'text-[var(--color-gray-200)]',
  },
};

export function Button({
  children,
  className,
  type = 'button',
  variant = 'filled',
  color = 'primary',
  ...props
}: ButtonProps) {
  const style = variantStyles[variant][color];

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${style} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
