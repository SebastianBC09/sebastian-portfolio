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
  const t = await getTranslations({ locale, namespace: 'skills.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/skills`,
      languages: {
        en: '/en/skills',
        es: '/es/skills',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bccloudsolutions.dev/${locale}/skills`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
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
