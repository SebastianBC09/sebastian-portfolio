import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-accent-coral text-white hover:opacity-90 shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent-coral)_25%,transparent)]',
  secondary:
    'border border-stroke text-text-primary hover:bg-bg-card-hover hover:border-stroke-active',
  ghost: 'text-text-muted hover:text-text-primary hover:bg-bg-card',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-sm rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
