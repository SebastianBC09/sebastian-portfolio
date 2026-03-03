import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
      canonical: `https://bccloudsolutions.dev/${locale}/about`,
      languages: {
        en: 'https://bccloudsolutions.dev/en/about',
        es: 'https://bccloudsolutions.dev/es/about',
        'x-default': 'https://bccloudsolutions.dev/en/about',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bccloudsolutions.dev/${locale}/about`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'profile',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/opengraph-image'],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutBridge />
      <DualTimeline />
      <Recognition />
      <HowIWork />
    </>
  );
}
