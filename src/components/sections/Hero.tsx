'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { HeroVisual } from './HeroVisual';

/* ── Animation variants (hoisted, static) ── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Quick stats keys ── */
const STAT_KEYS = ['experience', 'certification', 'language'] as const;

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-35 pb-20 md:pb-28 lg:pb-32 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* ── Left column — copy ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* GCP Badge */}
            <motion.div variants={fadeUp} className="mb-7">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.25 rounded-md text-xs font-mono font-semibold border"
                style={{
                  background: 'color-mix(in srgb, var(--color-accent-lime) 10%, transparent)',
                  color: 'var(--color-accent-lime)',
                  borderColor: 'color-mix(in srgb, var(--color-accent-lime) 20%, transparent)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-subtle-pulse"
                  style={{ background: 'var(--color-accent-lime)' }}
                />
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeLeft}
              className="font-display font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
            >
              <span className="text-text-primary">{t('headline.line1')}</span>
              <br />
              <span className="text-text-primary/40">{t('headline.line2')}</span>
              <br />
              <span className="gradient-text">{t('headline.line3')}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] leading-relaxed text-text-muted max-w-120"
            >
              {t('subheadline')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Link href="#projects">
                <Button variant="primary" size="lg">
                  {t('cta.viewProjects')}
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  {t('cta.getInTouch')}
                </Button>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeUp} className="mt-12 flex gap-9">
              {STAT_KEYS.map((key) => (
                <div key={key}>
                  <div
                    className="text-2xl font-display font-bold"
                    style={{ color: 'var(--color-accent-cyan)' }}
                  >
                    {t(`stats.${key}.value`)}
                  </div>
                  <div className="text-[11px] mt-1 text-text-primary/35 tracking-wide">
                    {t(`stats.${key}.label`)}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column — HeroVisual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <HeroVisual label={t('visual.label')} />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[10px] font-mono text-text-muted tracking-[0.15em] uppercase">
          {t('scrollHint')}
        </span>
        <div
          className="w-px h-7"
          style={{
            background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
