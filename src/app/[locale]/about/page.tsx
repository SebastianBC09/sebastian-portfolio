import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutBridge } from '@/components/sections/about/AboutBridge';
import { DualTimeline } from '@/components/sections/about/DualTimeline';
import { HowIWork } from '@/components/sections/about/HowIWork';
import { Recognition } from '@/components/sections/about/Recognition';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        es: '/es/about',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bccloudsolutions.dev/${locale}/about`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'profile',
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutBridge />
      <DualTimeline />
      <Recognition />
      <HowIWork />
    </>
  );
}
