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
      {/* ── Section header ── */}
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span
            className="inline-flex items-center text-xs font-mono font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border shrink-0"
            style={{
              color: 'var(--color-accent-cyan)',
              background: 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
            }}
          >
            {t('featured.label')}
          </span>

          {/* Gradient rule */}
          <div
            className="flex-1 h-px"
            style={{
              background: 'linear-gradient(to right, var(--color-stroke), transparent)',
            }}
            aria-hidden="true"
          />
        </div>
      </Reveal>

      {/* ── Featured post card ── */}
      <Reveal delay={0.1}>
        <PostCard post={featured} featured />
      </Reveal>
    </section>
  );
}
