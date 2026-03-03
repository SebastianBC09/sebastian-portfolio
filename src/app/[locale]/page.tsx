import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/app/[locale]/_components/Hero';
import { FeaturedProjects } from '@/app/[locale]/_components/FeaturedProjects';
import { ProcessSection } from '@/app/[locale]/_components/ProcessSection';
import { ContactCta } from '@/app/[locale]/_components/ContactCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout.metadata' });

  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}`,
      languages: {
        en: 'https://bccloudsolutions.dev/en',
        es: 'https://bccloudsolutions.dev/es',
        'x-default': 'https://bccloudsolutions.dev/en',
      },
    },
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      url: `https://bccloudsolutions.dev/${locale}`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t('home.title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: ['/opengraph-image'],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ProcessSection />
      <ContactCta />
    </>
  );
}
