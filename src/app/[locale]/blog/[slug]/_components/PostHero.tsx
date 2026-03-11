import { Badge } from '@/components/ui/Badge';
import { CATEGORY_ACCENT, CATEGORY_VARIANT } from '@/types/blog';
import type { PostMeta } from '@/sanity/queries';

interface PostHeroProps {
  post: PostMeta;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const CATEGORY_LABEL: Record<string, string> = {
  fundamentals: 'Engineering Fundamentals',
  languages: 'Languages & Runtimes',
  craft: 'The Craft',
  books: 'Books',
};

export function PostHero({ post }: PostHeroProps) {
  const accent = CATEGORY_ACCENT[post.category];
  const variant = CATEGORY_VARIANT[post.category];
  const label = CATEGORY_LABEL[post.category] ?? post.category;

  return (
    <header className="relative pt-32 pb-0 overflow-hidden">
      {/* Thin category-colored top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75"
        style={{ background: accent }}
        aria-hidden="true"
      />

      {/* Very subtle ambient glow — much lower opacity than case study */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-24 w-150 h-75 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${accent}, transparent 70%)`,
          opacity: 0.025,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Blueprint registration mark — top-right corner */}
      <div
        className="absolute top-6 right-6 w-8 h-8 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="0.75" />
          <line x1="16" y1="0" x2="16" y2="10" stroke="currentColor" strokeWidth="0.75" />
          <line x1="16" y1="22" x2="16" y2="32" stroke="currentColor" strokeWidth="0.75" />
          <line x1="0" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="0.75" />
          <line x1="22" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Category badge row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          <Badge variant={variant}>{label}</Badge>

          {/* Metadata — mono, quiet */}
          <span
            className="text-xs"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-jetbrains-mono)',
            }}
          >
            {formatDate(post.date)}
          </span>

          <span
            className="text-xs"
            style={{ color: 'var(--color-stroke-active)' }}
            aria-hidden="true"
          >
            ·
          </span>

          <span
            className="text-xs"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-jetbrains-mono)',
            }}
          >
            {post.readingTime} min read
          </span>

          {post.updatedAt && post.updatedAt !== post.date && (
            <>
              <span
                className="text-xs"
                style={{ color: 'var(--color-stroke-active)' }}
                aria-hidden="true"
              >
                ·
              </span>
              <span
                className="text-xs"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-jetbrains-mono)',
                }}
              >
                Updated {formatDate(post.updatedAt)}
              </span>
            </>
          )}
        </div>

        {/* Title — editorial scale, not monumental */}
        <h1
          className="font-display font-extrabold leading-[1.1] tracking-tight mb-5 text-text-primary"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          {post.title}
        </h1>

        {/* Description — the lede/deck */}
        <p
          className="text-lg md:text-xl leading-[1.7] max-w-[60ch] mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: `color-mix(in srgb, ${accent} 7%, transparent)`,
                  color: 'var(--color-text-muted)',
                  border: `1px solid color-mix(in srgb, ${accent} 12%, transparent)`,
                  fontFamily: 'var(--font-jetbrains-mono)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider — blueprint style, full-bleed from this container */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${accent} 0%, color-mix(in srgb, ${accent} 20%, transparent) 40%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
