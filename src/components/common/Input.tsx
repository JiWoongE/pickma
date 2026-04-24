import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

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
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const mergedAriaDescribedBy =
    [props['aria-describedby'], errorId].filter(Boolean).join(' ') || undefined;
  const mergedAriaInvalid = props['aria-invalid'] ?? Boolean(error);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm text-gray-500">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            {startIcon}
          </div>
        )}
        <input
          {...props}
          id={inputId}
          aria-invalid={mergedAriaInvalid}
          aria-describedby={mergedAriaDescribedBy}
          className={`w-full border border-gray-200 rounded-[var(--radius-md)] py-2 text-sm outline-none focus:border-primary-500 placeholder:text-gray-300
            ${startIcon ? 'pl-9' : 'pl-4'}
            ${endIcon ? 'pr-9' : 'pr-4'}
            ${className ?? ''}`}
        />
        {endIcon && (
          <div
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-sm text-[--color-error]"
        >
          {error}
        </span>
      )}
    </div>
  );
}
