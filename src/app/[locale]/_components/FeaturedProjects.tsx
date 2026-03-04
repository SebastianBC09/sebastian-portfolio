'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard, type ProjectCardData } from '@/components/ui/ProjectCard';

const PROJECT_META: Record<string, Omit<ProjectCardData, 'title' | 'description'>> = {
  agriculture: {
    id: 'agriculture',
    context: 'UNINPAHU University',
    accent: 'var(--color-accent-lime)',
    accentBg: 'color-mix(in srgb, var(--color-accent-lime) 7%, var(--color-bg-card))',
    tags: ['Arduino', 'Arduino IDE', 'Java', 'Sensors'],
    highlights: ['University Recognition', 'Scalable Design', 'Data-Driven'],
    href: 'https://github.com/SebastianBC09/AgroTech2.0-App',
    status: 'live',
  },
  swiftChallenge: {
    id: 'swiftChallenge',
    context: 'Apple Challenge',
    accent: 'var(--color-accent-coral)',
    accentBg: 'color-mix(in srgb, var(--color-accent-coral) 7%, var(--color-bg-card))',
    tags: ['Swift', 'SwiftUI', 'iOS'],
    highlights: [],
    href: '/projects/swift-challenge',
    status: 'locked',
  },
  transmilenio: {
    id: 'transmilenio',
    context: 'Personal Project',
    accent: 'var(--color-accent-amber)',
    accentBg: 'color-mix(in srgb, var(--color-accent-amber) 7%, var(--color-bg-card))',
    tags: ['Python', 'NetworkX', 'NLP / LLM', 'Graph Theory', 'CLI', 'Groq'],
    highlights: ['Graph-based routing', 'Natural language queries', 'Bilingual'],
    href: 'https://github.com/SebastianBC09/transmilenio-router',
    status: 'live',
  },
};

const PROJECT_KEYS = ['agriculture', 'swiftChallenge', 'transmilenio'] as const;

export function FeaturedProjects() {
  const t = useTranslations('home.featuredProjects');

  const projects: ProjectCardData[] = PROJECT_KEYS.map((key) => ({
    ...PROJECT_META[key],
    title: t(`cards.${key}.title`),
    description: t(`cards.${key}.hook`),
  }));

  return (
    <section id="projects" className="relative py-20 md:py-28">
      {/* Ambient glow */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-lime), transparent 70%)',
          opacity: 0.04,
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('heading')} description={t('description')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'var(--color-stroke-grid)' }} />
          <Link
            href="https://github.com/SebastianBC09?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="md">
              {t('viewAll')} →
            </Button>
          </Link>
          <div className="flex-1 h-px" style={{ background: 'var(--color-stroke-grid)' }} />
        </div>
      </div>
    </section>
  );
}
