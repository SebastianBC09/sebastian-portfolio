import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/sanity/queries';
import { BlogBridge } from './_components/BlogBridge';
import { BlogFeatured } from './_components/BlogFeatured';
import { BlogGrid } from './_components/BlogGrid';

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}/blog`,
      languages: {
        en: 'https://bccloudsolutions.dev/en/blog',
        es: 'https://bccloudsolutions.dev/es/blog',
        'x-default': 'https://bccloudsolutions.dev/en/blog',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bccloudsolutions.dev/${locale}/blog`,
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

// ── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getAllPosts();

  return (
    <>
      <BlogBridge posts={posts} />
      <BlogFeatured posts={posts} />
      <BlogGrid posts={posts} />
    </>
  );
}
