'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

export function SkillsBridge() {
  const t = useTranslations('skills.bridge');

  return (
    <section className="relative pt-36 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Headline ── */}
        <Reveal delay={0.1}>
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-text-primary">{t('headline.line1')}</span>
            <br />
            <span className="gradient-text">{t('headline.line2')}</span>
          </h1>
        </Reveal>
        {/* ── Description ── */}
        <Reveal delay={0.18}>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('description')}
          </p>
        </Reveal>
        {/* ── Gradient divider — cyan → coral → transparent ── */}
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
