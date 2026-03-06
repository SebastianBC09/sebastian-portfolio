import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/content/projects';

type CaseStudySectionKey = 'challenge' | 'approach' | 'build' | 'outcome' | 'learnings';

const SECTION_META: Record<CaseStudySectionKey, { label: string; tinted: boolean }> = {
  challenge: { label: '01', tinted: true },
  approach: { label: '02', tinted: false },
  build: { label: '03', tinted: false },
  outcome: { label: '04', tinted: true },
  learnings: { label: '05', tinted: false },
};

interface CaseStudySectionProps {
  slug: string;
  section: CaseStudySectionKey;
}

export function CaseStudySection({ slug, section }: CaseStudySectionProps) {
  const tSections = useTranslations('projects.sections');
  const tProject = useTranslations('projects.projects');
  const project = PROJECTS.find((p) => p.slug === slug)!;

  const { label, tinted } = SECTION_META[section];

  const content = (
    <>
      <SectionHeading label={label} title={tSections(section)} align="left" />
      <Reveal delay={0.1}>
        <p className="text-base md:text-lg leading-relaxed text-text-muted max-w-3xl">
          {tProject(`${slug}.${section}`)}
        </p>
      </Reveal>
    </>
  );

  return (
    <section className="py-14 md:py-18">
      <div className="max-w-5xl mx-auto px-6">
        {tinted ? (
          <div
            className="rounded-2xl border p-8 md:p-12"
            style={{
              background: project.accentBg,
              borderColor: `color-mix(in srgb, ${project.accent} 12%, transparent)`,
            }}
          >
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  );
}
