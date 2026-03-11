'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PostCard } from '@/components/ui/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TagFilter } from './TagFilter';
import type { PostMeta } from '@/sanity/queries';

interface BlogGridProps {
  posts: PostMeta[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const t = useTranslations('blog');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort();

  const filtered = activeTag ? posts.filter((p) => p.tags?.includes(activeTag)) : posts;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <SectionHeading label={t('grid.label')} title={t('grid.heading')} />

      {/* ── Tag filter ── */}
      {allTags.length > 0 && (
        <Reveal delay={0.06}>
          <TagFilter tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
        </Reveal>
      )}

      {/* ── Post list ── */}
      {filtered.length > 0 ? (
        <div className="mt-6 flex flex-col gap-2">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={0.04 * i}>
              <PostCard post={post} index={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.1}>
          <p
            className="mt-12 text-center text-sm font-mono"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('grid.empty')}
          </p>
        </Reveal>
      )}
    </section>
  );
}
