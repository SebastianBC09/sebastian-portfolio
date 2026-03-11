import { useTranslations } from 'next-intl';
import { PostCard } from '@/components/ui/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { PostMeta } from '@/sanity/queries';

interface BlogFeaturedProps {
  posts: PostMeta[];
}

export function BlogFeatured({ posts }: BlogFeaturedProps) {
  const t = useTranslations('blog');
  const featured = posts.find((p) => p.featured) ?? null;

  if (!featured) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-12">
      <SectionHeading label={t('featured.label')} title={t('featured.heading')} />

      <Reveal delay={0.1}>
        <PostCard post={featured} featured />
      </Reveal>
    </section>
  );
}
