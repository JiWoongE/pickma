import { cn } from '@/lib/utils';
import {
  Field,
  Label,
  Input as HeadlessInput,
  Description,
} from '@headlessui/react';
import { type InputHTMLAttributes, type ReactNode } from 'react';

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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            {startIcon}
          </div>
        )}
        <HeadlessInput
          {...props}
          invalid={Boolean(error)}
          className={cn(
            'w-full border rounded-[10px] py-2 text-sm outline-none focus:border-primary-500 placeholder:text-gray-300',
            'data-[invalid]:border-error border-gray-200',
            'data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed',
            startIcon ? 'pl-9' : 'pl-4',
            endIcon ? 'pr-9' : 'pr-4',
            className
          )}
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
        <Description aria-live="polite" className="text-sm text-error">
          {error}
        </Description>
      )}
    </Field>
  );
}
