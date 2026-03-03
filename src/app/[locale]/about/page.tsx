import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutBridge } from '@/app/[locale]/about/_components/AboutBridge';
import { DualTimeline } from '@/app/[locale]/about/_components/DualTimeline';
import { HowIWork } from '@/app/[locale]/about/_components/HowIWork';
import { Recognition } from '@/app/[locale]/about/_components/Recognition';

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
