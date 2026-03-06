import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS } from '@/content/projects';

export function FeaturedProjects() {
  const t = useTranslations('home.featuredProjects');
  const featured = PROJECTS.filter((p) => p.featured);

  const projects = featured.map((p) => ({
    id: p.slug,
    context: p.context,
    title: t(`cards.${p.slug}.title`),
    description: t(`cards.${p.slug}.hook`),
    tags: p.tags,
    highlights: p.highlights,
    accent: p.accent,
    accentBg: p.accentBg,
    href: `/projects/${p.slug}`,
    status: p.status === 'complete' ? ('live' as const) : p.status,
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
          <Link href="/projects">
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
