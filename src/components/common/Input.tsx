import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Input({
  label,
  error,
  className,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-500">{label}</label>}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}
        <input
          className={`w-full border border-gray-200 rounded-[var(--radius-md)] py-2 text-sm outline-none focus:border-primary-500 placeholder:text-gray-300
                        ${startIcon ? 'pl-9' : 'pl-4'}
                        ${endIcon ? 'pr-9' : 'pr-4'}
                        ${className ?? ''}`}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-sm text-[var(--color-error)]">{error}</span>
      )}
    </div>
  );
}
