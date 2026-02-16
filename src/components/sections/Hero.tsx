'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { HeroVisual } from './HeroVisual';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden">
      {/* Gradient accent — subtle top-right glow */}
      <div
        className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: 'var(--accent-cyan)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column — copy */}
          <motion.div
            className="md:col-span-7"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={{ fadeUp }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-(--text-primary) whitespace-pre-line"
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              variants={{ fadeUp }}
              className="mt-6 text-lg md:text-xl text-(--text-secondary) max-w-xl leading-relaxed"
            >
              {t('subheadline')}
            </motion.p>

            <motion.div variants={{ fadeUp }} className="mt-8 flex flex-wrap gap-4">
              <Link href="#projects">
                <Button variant="primary" size="lg">
                  {t('cta.viewProjects')}
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  {t('cta.getInTouch')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — wireframe-to-life visual */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <HeroVisual label={t('visual.label')} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
