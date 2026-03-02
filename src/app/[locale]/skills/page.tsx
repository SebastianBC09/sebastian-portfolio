import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SkillsBridge } from '@/components/sections/skills/SkillsBridge';
import { CertificationHighlight } from '@/components/sections/skills/CertificationHighlight';
import { SkillsGrid } from '@/components/sections/skills/SkillsGrid';
import { CharacterSection } from '@/components/sections/skills/CharacterSection';

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
