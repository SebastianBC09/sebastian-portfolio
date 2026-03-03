import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SkillsBridge } from '@/app/[locale]/skills/_components/SkillsBridge';
import { CertificationHighlight } from '@/app/[locale]/skills/_components/CertificationHighlight';
import { SkillsGrid } from '@/app/[locale]/skills/_components/SkillsGrid';
import { CharacterSection } from '@/app/[locale]/skills/_components/CharacterSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Uses layout.metadata namespace for consistency — skills has no separate
  // metadata namespace. If skills.metadata keys are added later, switch to that.
  const t = await getTranslations({ locale, namespace: 'layout.metadata' });

  return {
    title: t('skills.title'),
    description: t('skills.description'),
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}/skills`,
      languages: {
        en: 'https://bccloudsolutions.dev/en/skills',
        es: 'https://bccloudsolutions.dev/es/skills',
        'x-default': 'https://bccloudsolutions.dev/en/skills',
      },
    },
    openGraph: {
      title: t('skills.title'),
      description: t('skills.description'),
      url: `https://bccloudsolutions.dev/${locale}/skills`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t('skills.title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('skills.title'),
      description: t('skills.description'),
      images: ['/opengraph-image'],
    },
  };
}

export default function SkillsPage() {
  return (
    <>
      <SkillsBridge />
      <CertificationHighlight />
      <SkillsGrid />
      <CharacterSection />
    </>
  );
}
