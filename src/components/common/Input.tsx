'use client';

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
  description?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onEndIconClick?: () => void;
}

export function Input({
  label,
  description,
  error,
  className,
  startIcon,
  endIcon,
  onEndIconClick,
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
            'focus:border-primary-500 focus:ring-primary-300 w-full rounded-md border py-2 text-sm outline-none placeholder:text-gray-300 focus:ring-2',
            'border-gray-200 data-invalid:border-red-500 data-invalid:focus:ring-red-300',
            'data-disabled:cursor-not-allowed data-disabled:bg-gray-100 data-disabled:text-gray-400',
            startIcon ? 'pl-9' : 'pl-4',
            endIcon ? 'pr-9' : 'pr-4',
            className
          )}
        />
        {endIcon && (
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              'absolute top-1/2 right-3 -translate-y-1/2 text-gray-400',
              onEndIconClick ? 'cursor-pointer' : 'pointer-events-none'
            )}
            onClick={(e) => {
              e.preventDefault();
              onEndIconClick?.();
            }}
          >
            {endIcon}
          </button>
        )}
      </div>
      {description && !error && (
        <Description className="text-sm text-gray-500">
          {description}
        </Description>
      )}
      {error && (
        <Description className="text-sm text-red-500">{error}</Description>
      )}
    </Field>
  );
}
