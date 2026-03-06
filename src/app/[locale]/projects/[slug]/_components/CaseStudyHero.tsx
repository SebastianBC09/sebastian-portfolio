import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/content/projects';
import { Badge } from '@/components/ui/Badge';

type BadgeVariant = 'cyan' | 'coral' | 'lime' | 'amber';

const STATUS_LABEL: Record<string, string> = {
  complete: 'Complete',
  'in-progress': 'In Progress',
};

const ACCENT_VARIANT: Record<string, BadgeVariant> = {
  agrotech: 'lime',
  'transmilenio-router': 'cyan',
  portfolio: 'amber',
};

export function CaseStudyHero({ slug }: { slug: string }) {
  const t = useTranslations('projects.projects');
  const project = PROJECTS.find((p) => p.slug === slug)!;

  const variant = ACCENT_VARIANT[slug] ?? 'cyan';
  const statusLabel = STATUS_LABEL[project.status] ?? project.status;
  const isInProgress = project.status === 'in-progress';

  return (
    <section className="relative pt-36 pb-12 overflow-hidden">
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: project.accent }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-120 h-120 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${project.accent}, transparent 70%)`,
          opacity: 0.04,
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Context + status row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant={variant}>{project.context}</Badge>

          <Badge variant={variant}>
            <span className="inline-flex items-center gap-1.5">
              {isInProgress && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-subtle-pulse"
                  style={{ background: project.accent }}
                />
              )}
              {statusLabel}
            </span>
          </Badge>
        </div>

        {/* Title */}
        <h1
          className="font-display font-extrabold leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
        >
          <span className="text-text-primary">{t(`${slug}.title`)}</span>
        </h1>

        {/* Hook */}
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t(`${slug}.hook`)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-md"
              style={{
                background: 'color-mix(in srgb, var(--color-text-muted) 5%, transparent)',
                color: 'var(--color-text-muted)',
                border: '1px solid color-mix(in srgb, var(--color-text-muted) 10%, transparent)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub CTA */}
        <a
          href={project.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.02]"
          style={{
            color: project.accent,
            borderColor: `color-mix(in srgb, ${project.accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${project.accent} 8%, transparent)`,
          }}
        >
          <ExternalLink size={15} />
          View on GitHub
        </a>
      </div>
    </section>
  );
}
