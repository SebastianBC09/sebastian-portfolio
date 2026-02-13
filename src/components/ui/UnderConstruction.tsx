'use client';

import { cn } from '@/lib/utils';

export function UnderConstruction({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-dashed px-5 py-4',
        'border-(--accent-amber) bg-(--accent-amber)/5',
        className
      )}
    >
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--accent-amber) 1px, transparent 1px), linear-gradient(90deg, var(--accent-amber) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-3">
        {/* Animated construction icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-(--accent-amber)/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="animate-pulse text-(--accent-amber)"
            aria-hidden="true"
          >
            <path
              d="M10 2L2 18h16L10 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M10 8v4M10 14v1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-(--accent-amber)">Blueprint in progress</p>
          <p className="mt-0.5 text-xs text-(--text-secondary)">
            This portfolio is actively being built. New sections and projects are on the way.
          </p>
        </div>
      </div>
    </div>
  );
}
