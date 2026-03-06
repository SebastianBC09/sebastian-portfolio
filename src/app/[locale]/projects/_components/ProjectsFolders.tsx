'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Reveal } from '@/components/ui/Reveal';
import { PROJECTS, type Project } from '@/content/projects';

/* ── Accent variant key ── */
type AccentKey = 'lime' | 'cyan' | 'amber';

const ACCENT_MAP: Record<string, AccentKey> = {
  agrotech: 'lime',
  'transmilenio-router': 'cyan',
  portfolio: 'amber',
};

const STATUS_LABEL: Record<string, string> = {
  complete: 'Complete',
  'in-progress': 'In Progress',
};

// ═════════ FolderMobile

interface FolderMobileProps {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: (i: number) => void;
  tTitle: string;
  tHook: string;
}

function FolderMobile({ project, index, isSelected, onSelect, tTitle, tHook }: FolderMobileProps) {
  const isInProgress = project.status === 'in-progress';
  const accentVar = `var(--color-accent-${ACCENT_MAP[project.slug] ?? 'cyan'})`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(index)}
      aria-expanded={isSelected}
      aria-label={`${tTitle} — ${isSelected ? 'collapse' : 'expand'}`}
      style={{
        borderRadius: '12px',
        border: '1px solid',
        borderColor: isSelected
          ? `color-mix(in srgb, ${accentVar} 25%, transparent)`
          : 'var(--color-stroke-grid)',
        background: 'var(--color-bg-secondary)',
        boxShadow: isSelected ? `0 20px 60px rgba(0,0,0,0.4)` : 'none',
        transition: 'all .4s cubic-bezier(.16,1,.3,1)',
        cursor: 'pointer',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Header row — always visible */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 20px',
          height: '64px',
          flexShrink: 0,
          borderLeft: `3px solid ${accentVar}`,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '11px',
            fontWeight: 600,
            color: accentVar,
            opacity: 0.6,
            letterSpacing: '.1em',
          }}
        >
          0{index + 1}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            flex: 1,
          }}
        >
          {tTitle}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isInProgress && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: accentVar,
                animation: 'subtlePulse 3s ease infinite',
                flexShrink: 0,
              }}
            />
          )}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentVar}
            strokeWidth="2"
            style={{
              transition: 'transform .3s ease',
              transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {isSelected && (
        <div
          style={{
            padding: '0 20px 24px 20px',
            borderTop: `1px solid color-mix(in srgb, ${accentVar} 10%, transparent)`,
          }}
        >
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              margin: '16px 0',
            }}
          >
            {tHook}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'color-mix(in srgb, var(--color-text-muted) 5%, transparent)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid color-mix(in srgb, var(--color-text-muted) 8%, transparent)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '20px' }}>
            {project.highlights.map((h, i) => (
              <span key={h} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `color-mix(in srgb, ${accentVar} 70%, transparent)`,
                  }}
                >
                  {h}
                </span>
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: '6px',
              border: `1px solid color-mix(in srgb, ${accentVar} 25%, transparent)`,
              color: accentVar,
              background: `color-mix(in srgb, ${accentVar} 8%, transparent)`,
              textDecoration: 'none',
              transition: 'opacity .2s ease',
            }}
          >
            Open File
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

// ═════════ FolderDesktop

interface FolderDesktopProps {
  project: Project;
  index: number;
  isSelected: boolean;
  isBehindLeft: boolean;
  isBehindRight: boolean;
  onSelect: (i: number) => void;
  tTitle: string;
  tHook: string;
}

function FolderDesktop({
  project,
  index,
  isSelected,
  isBehindLeft,
  isBehindRight,
  onSelect,
  tTitle,
  tHook,
}: FolderDesktopProps) {
  const isInProgress = project.status === 'in-progress';
  const accentVar = `var(--color-accent-${ACCENT_MAP[project.slug] ?? 'cyan'})`;
  const statusLabel = STATUS_LABEL[project.status] ?? project.status;

  const OFFSETS = [-300, -60, 180];
  const ROTATIONS = [-6, -2, 3];

  const transform = (() => {
    if (isSelected) return 'translateX(-50%) translateX(0px) rotate(0deg)';
    if (isBehindLeft) return 'translateX(-50%) translateX(-420px) rotate(-8deg)';
    if (isBehindRight) return 'translateX(-50%) translateX(420px) rotate(8deg)';
    return `translateX(-50%) translateX(${OFFSETS[index] ?? 0}px) rotate(${ROTATIONS[index] ?? 0}deg)`;
  })();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(index)}
      aria-expanded={isSelected}
      aria-label={`${tTitle} — ${isSelected ? 'collapse' : 'expand'}`}
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        width: isSelected ? 'min(680px, calc(100vw - 80px))' : '340px',
        height: '480px',
        zIndex: isSelected
          ? 10
          : isBehindLeft
            ? index + 1
            : isBehindRight
              ? PROJECTS.length - index
              : index + 1,
        transform,
        opacity: isBehindLeft || isBehindRight ? 0.4 : 1,
        borderRadius: '2px 16px 16px 16px',
        border: '1px solid',
        borderColor: isSelected
          ? `color-mix(in srgb, ${accentVar} 20%, transparent)`
          : 'var(--color-stroke-grid)',
        background: 'var(--color-bg-secondary)',
        boxShadow: isSelected ? `0 40px 120px rgba(0,0,0,0.5)` : 'none',
        transition:
          'transform .6s cubic-bezier(.16,1,.3,1), width .6s cubic-bezier(.16,1,.3,1), opacity .4s ease, box-shadow .4s ease, border-color .4s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Tab */}
      <div
        style={{
          position: 'absolute',
          top: '-32px',
          left: 0,
          height: '32px',
          width: isSelected ? '160px' : '120px',
          borderRadius: '8px 8px 0 0',
          background: `color-mix(in srgb, ${accentVar} 12%, var(--color-bg-secondary))`,
          border: `1px solid color-mix(in srgb, ${accentVar} 20%, transparent)`,
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          color: accentVar,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          transition: 'width .4s ease',
        }}
      >
        {tTitle}
      </div>

      {/* Inner content */}
      <div style={{ position: 'relative', height: '100%', overflow: 'visible' }}>
        {/* Blueprint sheet lines */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.4,
            backgroundImage: 'linear-gradient(rgba(130,170,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
          }}
        />

        {/* Accent binding */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: isSelected ? '4px' : '3px',
            background: `linear-gradient(180deg, ${accentVar}, color-mix(in srgb, ${accentVar} 30%, transparent))`,
            transition: 'width .3s ease',
          }}
        />

        {/* Ghost monogram */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-10px',
            fontFamily: 'var(--font-outfit)',
            fontWeight: 900,
            fontSize: '200px',
            lineHeight: 1,
            color: accentVar,
            opacity: isSelected ? 0.05 : 0.03,
            userSelect: 'none',
            pointerEvents: 'none',
            transition: 'opacity .4s ease',
            letterSpacing: '-0.05em',
          }}
        >
          {tTitle.charAt(0)}
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '28px 28px 24px 36px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Title block */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: accentVar,
                  marginBottom: '6px',
                }}
              >
                {project.context}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 800,
                  fontSize: isSelected ? '26px' : '20px',
                  lineHeight: 1.15,
                  color: 'var(--color-text-primary)',
                  transition: 'font-size .4s ease',
                }}
              >
                {tTitle}
              </h3>
            </div>

            {/* Status pill */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '999px',
                color: accentVar,
                background: `color-mix(in srgb, ${accentVar} 8%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentVar} 20%, transparent)`,
                flexShrink: 0,
                marginLeft: '12px',
              }}
            >
              {isInProgress && (
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: accentVar,
                    animation: 'subtlePulse 3s ease infinite',
                  }}
                />
              )}
              {statusLabel}
            </span>
          </div>

          {/* Rule */}
          <div
            style={{
              height: '1px',
              marginBottom: '18px',
              background:
                'linear-gradient(to right, transparent, var(--color-stroke), transparent)',
            }}
          />

          {/* Notes field */}
          <div
            style={{
              flex: 1,
              border: `1px dashed color-mix(in srgb, ${accentVar} 15%, transparent)`,
              borderRadius: '4px',
              padding: '14px 16px',
              marginBottom: '18px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-9px',
                left: '12px',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: accentVar,
                padding: '0 6px',
                background: 'var(--color-bg-secondary)',
              }}
            >
              NOTES
            </span>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                display: '-webkit-box',
                WebkitLineClamp: isSelected ? 6 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {tHook}
            </p>
          </div>

          {/* Stack — tags as spec annotations */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              alignItems: 'center',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginRight: '4px',
              }}
            >
              STACK —
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'color-mix(in srgb, var(--color-text-muted) 5%, transparent)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid color-mix(in srgb, var(--color-text-muted) 8%, transparent)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
            {project.highlights.map((h, i) => (
              <span key={h} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span style={{ margin: '0 8px', color: 'rgba(230,238,243,0.1)' }}>·</span>
                )}
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: `color-mix(in srgb, ${accentVar} 70%, transparent)`,
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {h}
                </span>
              </span>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              marginTop: 'auto',
              borderTop: '1px solid var(--color-stroke-grid)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '32px',
                fontWeight: 600,
                opacity: 0.06,
                lineHeight: 1,
                userSelect: 'none',
                color: 'var(--color-text-primary)',
              }}
            >
              0{index + 1}
            </span>

            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderRadius: '6px',
                border: `1px solid color-mix(in srgb, ${accentVar} 25%, transparent)`,
                color: accentVar,
                background: `color-mix(in srgb, ${accentVar} 8%, transparent)`,
                textDecoration: 'none',
                opacity: isSelected ? 1 : 0,
                pointerEvents: isSelected ? 'auto' : 'none',
                transform: isSelected ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity .3s ease, transform .3s ease',
              }}
            >
              Open File
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Collapsed hint */}
          {!isSelected && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              Click to open
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════ ProjectsFolders — main export

export function ProjectsFolders() {
  const tProjects = useTranslations('projects.projects');
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSelected(0), 400);
    return () => clearTimeout(timer);
  }, []);

  function handleSelect(index: number) {
    setSelected((prev) => (prev === index ? null : index));
  }

  return (
    <Reveal>
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Case Studies — Select a folder to open
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-stroke-grid)' }} />
          </div>

          {/* ── Conditional layout — one set of DOM nodes at a time ── */}
          {isMobile ? (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              aria-label="Project case studies"
            >
              {PROJECTS.map((project, i) => (
                <FolderMobile
                  key={project.slug}
                  project={project}
                  index={i}
                  isSelected={selected === i}
                  onSelect={handleSelect}
                  tTitle={tProjects(`${project.slug}.title`)}
                  tHook={tProjects(`${project.slug}.hook`)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{ position: 'relative', height: '560px' }}
              aria-label="Project case studies"
            >
              {PROJECTS.map((project, i) => (
                <FolderDesktop
                  key={project.slug}
                  project={project}
                  index={i}
                  isSelected={selected === i}
                  isBehindLeft={selected !== null && i < selected}
                  isBehindRight={selected !== null && i > selected}
                  onSelect={handleSelect}
                  tTitle={tProjects(`${project.slug}.title`)}
                  tHook={tProjects(`${project.slug}.hook`)}
                />
              ))}
            </div>
          )}

          {/* ── Bottom nav ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '48px',
            }}
          >
            {PROJECTS.map((project, i) => {
              const accentVar = `var(--color-accent-${ACCENT_MAP[project.slug] ?? 'cyan'})`;
              const isActive = selected === i;
              return (
                <button
                  key={project.slug}
                  onClick={() => handleSelect(i)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '.15em',
                    textTransform: 'uppercase',
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: `1px solid ${isActive ? `color-mix(in srgb, ${accentVar} 30%, transparent)` : 'var(--color-stroke)'}`,
                    color: isActive ? accentVar : 'var(--color-text-muted)',
                    background: isActive
                      ? `color-mix(in srgb, ${accentVar} 8%, transparent)`
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all .2s ease',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: accentVar,
                      flexShrink: 0,
                    }}
                  />
                  {tProjects(`${project.slug}.title`)}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
