'use client';

import { useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

type AccentVariant = 'cyan' | 'coral' | 'lime' | 'amber';

export interface ProjectCardData {
  id: string;
  /** Origin/domain label — e.g. "UNINPAHU University", "Magneto Global" */
  context: string;
  title: string;
  /** 1–2 punchy sentences — intriguing, not exhaustive */
  description: string;
  tags: string[];
  /** Short outcome labels — metrics shape, 3 max */
  highlights: string[];
  accent: string;
  accentBg: string;
  /** Badge variant derived from accent color */
  accentVariant: AccentVariant;
  href: string;
  status?: 'live' | 'in-progress' | 'locked';
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const isLocked = project.status === 'locked';
  const isInProgress = project.status === 'in-progress';

  const card = (
    <article
      onMouseEnter={() => !isLocked && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-500 group h-full',
        'border',
        isLocked ? 'cursor-default' : 'cursor-pointer'
      )}
      style={{
        background: hovered ? project.accentBg : 'var(--color-bg-card)',
        borderColor: hovered ? project.accent + '30' : 'var(--color-stroke-grid)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px ${project.accent}15` : 'none',
      }}
    >
      {/* ── Locked overlay ── */}
      {isLocked && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl"
          style={{
            background: 'color-mix(in srgb, var(--color-bg-primary) 55%, transparent)',
            backdropFilter: 'blur(2px)',
          }}
          aria-hidden="true"
        >
          <Lock size={20} style={{ color: 'var(--color-text-muted)' }} strokeWidth={1.5} />
          <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
            Coming soon
          </span>
        </div>
      )}

      <div className={cn('p-6 sm:p-8 flex flex-col h-full', isLocked && 'select-none blur-[2px]')}>
        {/* ── Header — stacked to prevent collision in narrow columns ── */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-display font-bold text-base leading-snug min-w-0"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {project.title}
            </h3>
            {!isLocked && (
              <div
                className="shrink-0 transition-all duration-300"
                style={{
                  opacity: hovered ? 1 : 0.2,
                  transform: hovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
                  color: project.accent,
                }}
              >
                <ArrowUpRight size={18} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium" style={{ color: project.accent }}>
              {project.context}
            </span>
            {isInProgress && (
              <Badge variant={project.accentVariant}>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-subtle-pulse"
                    style={{ background: project.accent }}
                  />
                  In progress
                </span>
              </Badge>
            )}
          </div>
        </div>

        {/* ── Card.Body — hook description ── */}
        <Card.Body className="mb-6">{project.description}</Card.Body>

        {/* ── Tags ── */}
        {project.tags.length > 0 && (
          <Card.Footer className="mb-6 mt-0">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: 'color-mix(in srgb, var(--color-text-muted) 5%, transparent)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid color-mix(in srgb, var(--color-text-muted) 8%, transparent)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </Card.Footer>
        )}

        {/* ── Highlights — metric outcomes ── */}
        {project.highlights.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.highlights.map((highlight, i) => (
              <span
                key={i}
                className="text-xs font-medium"
                style={{
                  color: `color-mix(in srgb, ${project.accent} 67%, transparent)`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {i > 0 && (
                  <span className="mr-3" style={{ color: 'rgba(230,238,243,0.1)' }}>
                    ·
                  </span>
                )}
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  if (isLocked) return <Reveal delay={index * 0.12}>{card}</Reveal>;

  return (
    <Reveal delay={index * 0.12}>
      <Link href={project.href} className="block h-full">
        {card}
      </Link>
    </Reveal>
  );
}
