import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBridge } from './_components/ContactBridge';
import { ContactOptions } from './_components/ContactOptions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout.metadata' });

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}/contact`,
      languages: {
        en: 'https://bccloudsolutions.dev/en/contact',
        es: 'https://bccloudsolutions.dev/es/contact',
        'x-default': 'https://bccloudsolutions.dev/en/contact',
      },
    },
    openGraph: {
      title: t('contact.title'),
      description: t('contact.description'),
      url: `https://bccloudsolutions.dev/${locale}/contact`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t('contact.title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contact.title'),
      description: t('contact.description'),
      images: ['/opengraph-image'],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactBridge />
      <ContactOptions />
    </>
  );
}
