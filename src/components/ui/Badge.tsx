import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'coral' | 'lime' | 'amber';
}

const variantStyles: Record<string, string> = {
  default: 'text-[var(--text-muted)] bg-[var(--bg-card)] border-[var(--stroke)]',
  cyan: 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 border-[var(--accent-cyan)]/20',
  coral: 'text-[var(--accent-coral)] bg-[var(--accent-coral)]/10 border-[var(--accent-coral)]/20',
  lime: 'text-[var(--accent-lime)] bg-[var(--accent-lime)]/10 border-[var(--accent-lime)]/20',
  amber: 'text-[var(--accent-amber)] bg-[var(--accent-amber)]/10 border-[var(--accent-amber)]/20',
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
