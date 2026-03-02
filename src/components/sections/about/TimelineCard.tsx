'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

interface TimelineCardProps {
  role: string;
  org: string;
  period: string;
  description: string;
  accent: string;
  minHeight: number;
  status: 'completed' | 'active';
  side: 'left' | 'right';
  className?: string;
}

export function TimelineCard({
  role,
  org,
  period,
  description,
  accent,
  minHeight,
  status,
  side,
  className,
}: TimelineCardProps) {
  return (
    <Card
      hover
      padding="none"
      className={cn('relative pl-6 pr-5 py-5', className)}
      style={{ minHeight }}
    >
      <Card.AccentBar color={accent} inset="14px" />

      {/* Node dot — faces the spine */}
      <div
        className={cn(
          'absolute top-6 w-2 h-2 rounded-full z-10',
          side === 'left' ? '-right-1' : '-left-1'
        )}
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
        aria-hidden="true"
      />

      <Card.Header
        title={role}
        subtitle={org}
        subtitleColor={accent}
        trailing={
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0"
            style={{
              color: accent,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${accent} 20%, transparent)`,
            }}
          >
            {period}
          </span>
        }
      />

      <Card.Body>{description}</Card.Body>

      {status === 'active' && (
        <div className="flex items-center gap-2 mt-3">
          <span
            className="w-1.5 h-1.5 rounded-full animate-subtle-pulse"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: accent }}
          >
            Active
          </span>
        </div>
      )}
    </Card>
  );
}
