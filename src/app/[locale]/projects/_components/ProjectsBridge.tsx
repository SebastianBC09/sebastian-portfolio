import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

export function ProjectsBridge() {
  const t = useTranslations('projects.bridge');

  return (
    <section className="relative pt-36 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Headline ── */}
        <Reveal delay={0.1}>
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-text-primary">{t('heading')}</span>
            <br />
            <span className="gradient-text">{t('headingAccent')}</span>
          </h1>
        </Reveal>

        {/* ── Label badge ── */}
        <Reveal delay={0.14}>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase mt-5 mb-2 px-3 py-1 rounded-full border"
            style={{
              color: 'var(--color-accent-cyan)',
              background: 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
            }}
          >
            {t('label')}
          </span>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.18}>
          <p
            className="mt-3 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('description')}
          </p>
        </Reveal>

        {/* ── Gradient divider ── */}
        <Reveal delay={0.24}>
          <div
            className="mt-10 h-px max-w-xs"
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
