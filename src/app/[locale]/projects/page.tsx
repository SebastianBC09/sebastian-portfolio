import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProjectsBridge } from './_components/ProjectsBridge';
import { ProjectsFolders } from './_components/ProjectsFolders';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}/projects`,
      languages: {
        en: 'https://bccloudsolutions.dev/en/projects',
        es: 'https://bccloudsolutions.dev/es/projects',
        'x-default': 'https://bccloudsolutions.dev/en/projects',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bccloudsolutions.dev/${locale}/projects`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
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

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBridge />
      <ProjectsFolders />
    </>
  );
}
