import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllSlugs, getPostBySlug } from '@/sanity/queries';
import { PostBody } from './_components/PostBody';
import { PostHero } from './_components/PostHero';
import { PostFooter } from './_components/PostFooter';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://bccloudsolutions.dev/${locale}/blog/${slug}`,
      languages: {
        en: `https://bccloudsolutions.dev/en/blog/${slug}`,
        es: `https://bccloudsolutions.dev/es/blog/${slug}`,
        'x-default': `https://bccloudsolutions.dev/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://bccloudsolutions.dev/${locale}/blog/${slug}`,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PostHero post={post} />
      <div className="max-w-5xl mx-auto px-6 pt-14">
        <PostBody body={post.body} />
      </div>
      <PostFooter post={post} locale={locale} />
    </>
  );
}
