'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** Seconds to delay the reveal transition */
  delay?: number;
  /** Optional extra classes on the wrapper div */
  className?: string;
  /** Fraction of the element visible before triggering (0–1) */
  threshold?: number;
}

/**
 * Wraps children in a one-shot scroll-triggered reveal.
 * Uses CSS transitions (not Framer Motion) for minimal overhead.
 * Pairs with SectionHeading and section content for staggered entrances.
 */
export function Reveal({ children, delay = 0, className, threshold = 0.1 }: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={cn('will-change-[opacity,transform]', className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
