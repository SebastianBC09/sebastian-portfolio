'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadingProps {
  /** Short mono label shown above the title (e.g. "My Process") */
  label: string;
  /** Main section heading */
  title: ReactNode;
  /** Optional supporting copy below the title */
  description?: string;
  /** Text alignment — defaults to 'left' */
  align?: 'left' | 'center';
  /** Extra classes on the wrapper */
  className?: string;
}

/**
 * Reusable section heading component with staggered scroll reveals.
 * Used across Home, About, Projects, Skills pages.
 *
 * Renders:
 *  1. A small monospace label badge (accent-cyan tinted)
 *  2. An h2 headline in display font
 *  3. Optional supporting paragraph
 */
export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div className={cn('mb-12', isCentered && 'text-center', className)}>
      {/* Label badge */}
      <Reveal>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border"
          style={{
            color: 'var(--color-accent-cyan)',
            background: 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
            borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
          }}
        >
          {label}
        </span>
      </Reveal>

      {/* Title */}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'font-display text-3xl md:text-4xl font-bold leading-tight text-text-primary',
            isCentered && 'mx-auto'
          )}
        >
          {title}
        </h2>
      </Reveal>

      {/* Description */}
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mt-3 text-base leading-relaxed text-text-muted max-w-2xl',
              isCentered && 'mx-auto'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
