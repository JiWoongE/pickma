import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style'
> {
  children: ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  color?: 'primary' | 'danger' | 'gray';
}

const baseStyles =
  'inline-flex items-center justify-center rounded-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200';

const variantStyles = {
  filled: {
    primary: 'bg-primary-500 text-white',
    danger: 'bg-error text-white',
    gray: 'bg-gray-500 text-gray-900',
  },
  outline: {
    primary: 'border border-primary-500 text-primary-500',
    danger: 'border border-error text-error',
    gray: 'border border-gray-500 text-gray-500',
  },
  ghost: {
    primary: 'text-primary-500',
    danger: 'text-error',
    gray: 'text-gray-500',
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
      className={`${baseStyles} ${style} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
