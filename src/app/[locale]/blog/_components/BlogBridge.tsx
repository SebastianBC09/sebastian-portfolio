import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { CATEGORY_ACCENT } from '@/types/blog';
import type { PostMeta } from '@/sanity/queries';

interface BlogBridgeProps {
  /** Passed from page.tsx so the bridge can render live stats */
  posts: PostMeta[];
}

const CATEGORY_DISPLAY: Record<string, string> = {
  fundamentals: 'Engineering Fundamentals',
  languages: 'Languages & Runtimes',
  craft: 'The Craft',
  books: 'Books',
};

export function BlogBridge({ posts }: BlogBridgeProps) {
  const t = useTranslations('blog.bridge');

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).length;
  const categories = Object.keys(CATEGORY_DISPLAY) as Array<keyof typeof CATEGORY_DISPLAY>;

  return (
    <section className="relative pt-36 pb-16 md:pb-20 overflow-hidden">
      {/* Ghost monogram */}
      <div
        className="absolute top-16 -left-4 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(7rem, 18vw, 13rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px color-mix(in srgb, var(--color-accent-cyan) 5%, transparent)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          zIndex: 0,
        }}
      >
        Blog
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Label badge */}
        <Reveal delay={0.08}>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-5 px-3 py-1 rounded-full border"
            style={{
              color: 'var(--color-accent-cyan)',
              background: 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
            }}
          >
            {t('label')}
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.12}>
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-text-primary">{t('headline.line1')}</span>
            <br />
            <span className="gradient-text">{t('headline.line2')}</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.16}>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('description')}
          </p>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-6 mt-7 items-baseline">
            {[
              { value: posts.length, label: 'articles' },
              { value: categories.length, label: 'categories' },
              { value: allTags, label: 'topics' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span
                  className="font-mono font-bold text-xl"
                  style={{ color: 'var(--color-accent-cyan)' }}
                >
                  {value}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Category pills */}
        <Reveal delay={0.24}>
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((key) => {
              const accent = CATEGORY_ACCENT[key as keyof typeof CATEGORY_ACCENT];
              const count = posts.filter((p) => p.category === key).length;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                  style={{
                    fontFamily: 'var(--font-code)',
                    background: `color-mix(in srgb, ${accent} 7%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${accent} 14%, transparent)`,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: accent,
                      flexShrink: 0,
                    }}
                  />
                  {CATEGORY_DISPLAY[key]}
                  <span style={{ color: accent, fontWeight: 700 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Gradient divider */}
        <Reveal delay={0.28}>
          <div
            className="mt-8 h-px max-w-xs"
            style={{
              background: `linear-gradient(
                to right,
                var(--color-accent-cyan),
                var(--color-accent-coral),
                transparent
              )`,
            }}
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
