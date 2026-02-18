import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'coral' | 'lime' | 'amber';
}

const variantStyles: Record<string, string> = {
  default: 'text-text-muted bg-bg-card border-stroke',
  cyan: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
  coral: 'text-accent-coral bg-accent-coral/10 border-accent-coral/20',
  lime: 'text-accent-lime bg-accent-lime/10 border-accent-lime/20',
  amber: 'text-accent-amber bg-accent-amber/10 border-accent-amber/20',
};

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
