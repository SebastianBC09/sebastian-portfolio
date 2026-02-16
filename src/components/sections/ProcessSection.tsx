'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Compass, Layers, Rocket } from 'lucide-react';

const STEPS = [
  { key: 'blueprint', icon: Compass, accent: 'var(--accent-cyan)' },
  { key: 'prototype', icon: Layers, accent: 'var(--accent-amber)' },
  { key: 'ship', icon: Rocket, accent: 'var(--accent-coral)' },
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
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-(--text-primary)"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t('heading')}
        </motion.h2>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STEPS.map(({ key, icon: Icon, accent }) => (
            <motion.div
              key={key}
              variants={{ stepVariants }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative p-6 rounded-xl border border-(--stroke-grid) bg-(--bg-card) hover:border-(--stroke-grid-hover) transition-colors"
            >
              {/* Step number accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: accent }}
              />

              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
              >
                <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
              </div>

              <span className="text-xs font-mono font-medium uppercase tracking-widest text-(--text-muted)">
                {t(`steps.${key}.label`)}
              </span>

              <h3 className="mt-2 font-display text-xl font-bold text-(--text-primary)">
                {t(`steps.${key}.title`)}
              </h3>

              <p className="mt-2 text-sm text-(--text-secondary) leading-relaxed">
                {t(`steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting line between steps (desktop) */}
        <div className="hidden md:flex items-center justify-center mt-6 px-12">
          <div className="flex-1 h-px bg-(--stroke-grid)" />
          <div className="w-2 h-2 rounded-full mx-3" style={{ background: 'var(--accent-cyan)' }} />
          <div className="flex-1 h-px bg-(--stroke-grid)" />
          <div
            className="w-2 h-2 rounded-full mx-3"
            style={{ background: 'var(--accent-amber)' }}
          />
          <div className="flex-1 h-px bg-(--stroke-grid)" />
          <div
            className="w-2 h-2 rounded-full mx-3"
            style={{ background: 'var(--accent-coral)' }}
          />
          <div className="flex-1 h-px bg-(--stroke-grid)" />
        </div>
      </div>
    </section>
  );
}
