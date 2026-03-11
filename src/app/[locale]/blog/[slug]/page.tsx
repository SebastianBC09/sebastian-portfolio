import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllSlugs, getPostBySlug } from '@/sanity/queries';
import { PostHero } from './_components/PostHero';
import { PostBody } from './_components/PostBody';
import { TableOfContents, type TocHeading } from './_components/TableOfContents';
import { PostFooter } from './_components/PostFooter';

// ── Static params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────

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

// ── Heading extraction ─────────────────────────────────────────────────────

function extractHeadings(body: unknown[]): TocHeading[] {
  return body
    .filter(
      (block): block is { style: string; _key: string; children: { text: string }[] } =>
        typeof block === 'object' &&
        block !== null &&
        'style' in block &&
        (block.style === 'h2' || block.style === 'h3')
    )
    .map((block) => ({
      id: block._key,
      text: block.children.map((c) => c.text).join(''),
      level: (block.style === 'h2' ? 2 : 3) as 2 | 3,
    }));
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);

  return (
    <>
      {/* Hero — editorial masthead */}
      <PostHero post={post} />

      {/* Body + ToC — two-column on desktop */}
      <div className="max-w-5xl mx-auto px-6 pt-14">
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12 xl:gap-16">
          {/* Reading lane */}
          <PostBody body={post.body} />

          {/* Sticky ToC sidebar */}
          <TableOfContents headings={headings} />
        </div>
      </div>

      {/* Post footer — back nav + closing note */}
      <PostFooter post={post} locale={locale} />
    </>
  );
}
