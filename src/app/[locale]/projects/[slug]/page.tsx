import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PROJECTS } from '@/content/projects';
import { CaseStudyHero } from './_components/CaseStudyHero';
import { CaseStudySection } from './_components/CaseStudySection';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: 'projects' });
  const title = t(`projects.${slug}.title`);
  const description = t(`projects.${slug}.hook`);

  return {
    title: `${title} — Sebastian Ballen`,
    description,
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <CaseStudyHero slug={slug} />
      <CaseStudySection slug={slug} section="challenge" />
      <CaseStudySection slug={slug} section="approach" />
      <CaseStudySection slug={slug} section="build" />
      <CaseStudySection slug={slug} section="outcome" />
      <CaseStudySection slug={slug} section="learnings" />
    </>
  );
}
