'use client';

import { useEffect, useRef, useState } from 'react';

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <nav
        className="sticky rounded-xl p-5"
        style={{
          top: '6rem',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-stroke)',
        }}
        aria-label="Table of contents"
      >
        {/* Header */}
        <p
          className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 pb-3"
          style={{
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-jetbrains-mono)',
            borderBottom: '1px solid var(--color-stroke)',
          }}
        >
          On this page
        </p>

        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? '0.75rem' : '0' }}>
                <a
                  href={`#${heading.id}`}
                  className="block text-[13px] leading-snug py-1 px-2 rounded-md transition-all duration-150"
                  style={{
                    color: isActive ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
                    background: isActive
                      ? 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)'
                      : 'transparent',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
