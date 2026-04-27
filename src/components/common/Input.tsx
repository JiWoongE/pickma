import {
  Field,
  Label,
  Input as HeadlessInput,
  Description,
} from '@headlessui/react';
import { type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

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
    <Field className="flex flex-col gap-1">
      {label && <Label className="text-sm text-gray-500">{label}</Label>}
      <div className="relative">
        {startIcon && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          >
            {startIcon}
          </div>
        )}
        <HeadlessInput
          {...props}
          invalid={Boolean(error)}
          className={cn(
            'focus:border-primary-500 w-full rounded-md border py-2 text-sm outline-none placeholder:text-gray-300',
            'data-invalid:border-error border-gray-200',
            'data-disabled:cursor-not-allowed data-disabled:bg-gray-100 data-disabled:text-gray-400',
            startIcon ? 'pl-9' : 'pl-4',
            endIcon ? 'pr-9' : 'pr-4',
            className
          )}
        />
        {endIcon && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
          >
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <Description aria-live="polite" className="text-error text-sm">
          {error}
        </Description>
      )}
    </Field>
  );
}
