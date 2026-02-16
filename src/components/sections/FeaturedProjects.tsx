'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

const PROJECT_KEYS = ['magneto', 'agriculture', 'hrPlatform'] as const;

const TAG_VARIANTS: Record<string, 'cyan' | 'coral' | 'lime' | 'amber' | 'default'> = {
  React: 'cyan',
  TypeScript: 'amber',
  'Next.js': 'coral',
  Storybook: 'lime',
  Arduino: 'coral',
  IoT: 'cyan',
  Architecture: 'lime',
  Python: 'amber',
  i18n: 'lime',
  Redux: 'cyan',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function FeaturedProjects() {
  const t = useTranslations('home.featuredProjects');

  return (
    <section id="projects" className="relative py-20 md:py-28">
      {/* Subtle left-side glow */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-100 h-100 rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: 'var(--accent-lime)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-(--text-primary)">
            {t('heading')}
          </h2>
          <p className="mt-3 text-(--text-secondary) max-w-2xl text-lg">{t('description')}</p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROJECT_KEYS.map((key) => {
            const tags = t(`cards.${key}.tags`).split(', ');
            return (
              <motion.div key={key} variants={{ cardVariants }}>
                <Card className="h-full flex flex-col">
                  {/* Project thumbnail placeholder */}
                  <div className="h-40 rounded-lg mb-4 flex items-center justify-center bg-(--bg-primary)/50 border border-(--stroke-grid)">
                    <span className="text-xs font-mono text-(--text-muted) uppercase tracking-widest">
                      {t(`cards.${key}.title`)}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-(--text-primary)">
                    {t(`cards.${key}.title`)}
                  </h3>

                  <p className="mt-2 text-sm text-(--text-secondary) leading-relaxed flex-1">
                    {t(`cards.${key}.summary`)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant={TAG_VARIANTS[tag.trim()] ?? 'default'}>
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/projects">
            <Button variant="ghost" size="md">
              {t('viewAll')} →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
