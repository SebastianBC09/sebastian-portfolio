'use client';

import { useState } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

export interface ProjectCardData {
  id: string;
  /** Origin/domain label — replaces OG "company" (e.g. "UNINPAHU University", "Apple Challenge") */
  context: string;
  title: string;
  /** 1–2 punchy sentences — intriguing, not exhaustive */
  description: string;
  tags: string[];
  /** Short outcome labels — OG metrics shape, 3 max */
  highlights: string[];
  accent: string;
  accentBg: string;
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

  return (
    <Reveal delay={index * 0.12}>
      <article
        onMouseEnter={() => !isLocked && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => !isLocked && project.href && (window.location.href = project.href)}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-500 group h-full',
          isLocked ? 'cursor-default' : 'cursor-pointer'
        )}
        style={{
          background: hovered ? project.accentBg : 'var(--color-bg-card)',
          border: `1px solid ${hovered ? project.accent + '30' : 'var(--color-stroke-grid)'}`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 60px ${project.accent}15` : 'none',
        }}
      >
        {/* Locked overlay */}
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

        <div className={cn('p-6 sm:p-8', isLocked && 'select-none blur-[2px]')}>
          {/* Top row — context label + ExternalLink */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col gap-2">
              {/* Context — same role as OG "company" */}
              <span
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: project.accent, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.context}
              </span>

              {/* In-progress badge — matches SectionHeading label style */}
              {isInProgress && (
                <span
                  className="inline-flex items-center gap-1.5 self-start text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: project.accent,
                    background: `color-mix(in srgb, ${project.accent} 8%, transparent)`,
                    borderColor: `color-mix(in srgb, ${project.accent} 15%, transparent)`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-subtle-pulse"
                    style={{ background: project.accent }}
                  />
                  In progress
                </span>
              )}
            </div>

            {/* ExternalLink — fades in from bottom-left on hover, exact OG behavior */}
            {!isLocked && (
              <div
                className="transition-all duration-300 shrink-0"
                style={{
                  opacity: hovered ? 1 : 0.2,
                  transform: hovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
                  color: project.accent,
                }}
              >
                <ExternalLink size={18} />
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-3 leading-snug"
            style={{ color: 'var(--color-text-primary)', fontFamily: "'Outfit', sans-serif" }}
          >
            {project.title}
          </h3>

          {/* Hook */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'var(--color-text-muted)', fontFamily: "'DM Sans', sans-serif" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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
            </div>
          )}

          {/* Highlights — exact OG metrics style */}
          {project.highlights.length > 0 && (
            <div className="flex flex-wrap gap-3">
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
    </Reveal>
  );
}
