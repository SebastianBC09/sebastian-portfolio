'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Compass, Layers, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    key: 'blueprint',
    icon: Compass,
    accent: 'var(--color-accent-cyan)',
    stepNum: '01',
  },
  {
    key: 'prototype',
    icon: Layers,
    accent: 'var(--color-accent-amber)',
    stepNum: '02',
  },
  {
    key: 'ship',
    icon: Rocket,
    accent: 'var(--color-accent-coral)',
    stepNum: '03',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function ProcessSection() {
  const t = useTranslations('home.process');

  return (
    <section id="process" className="relative py-20 md:py-28">
      {/* Ambient glow */}
      <div
        className="absolute right-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-amber), transparent 70%)',
          opacity: 0.035,
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('heading')} description={t('description')} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STEPS.map(({ key, icon: Icon, accent, stepNum }) => (
            <motion.div
              key={key}
              variants={stepVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative p-8 rounded-2xl transition-colors duration-300 h-full"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-stroke-grid)',
              }}
            >
              {/* Hover top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
                aria-hidden="true"
              />

              {/* Ghost step number — visual depth */}
              <div
                className="text-7xl font-black absolute top-4 right-5 select-none font-display leading-none"
                style={{ color: accent, opacity: 0.055 }}
                aria-hidden="true"
              >
                {stepNum}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
              >
                <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
              </div>

              {/* Step label */}
              <span className="text-xs font-mono font-medium uppercase tracking-widest text-text-muted">
                {t(`steps.${key}.label`)}
              </span>

              <h3 className="mt-2 font-display text-xl font-bold text-text-primary">
                {t(`steps.${key}.title`)}
              </h3>

              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {t(`steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting timeline — desktop only */}
        <div className="hidden md:flex items-center justify-center mt-6 px-16 gap-0">
          {STEPS.map(({ key, accent }, i) => (
            <div key={key} className="flex items-center flex-1">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: accent }} />
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${accent}40, var(--color-stroke-grid))`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
