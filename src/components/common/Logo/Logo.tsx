import LogoIcon from '@/assets/logo.svg?react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'lg' }: LogoProps) {
  return (
    <div className="flex flex-row items-end gap-2">
      <LogoIcon
        className={
          size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-10 h-10' : 'w-8 h-8'
        }
      />
      <h1
        className={
          size === 'lg'
            ? 'text-primary-600 font-bold text-3xl'
            : size === 'md'
              ? 'text-primary-600 font-bold text-2xl'
              : 'text-primary-600 font-bold text-xl'
        }
      >
        픽마
      </h1>
    </div>
  );
}
