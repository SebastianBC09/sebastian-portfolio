'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FileDown, Mail } from 'lucide-react';

export function ContactCta() {
  const t = useTranslations('home.contactCta');

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-border/30 bg-card/30 p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Subtle gradient accent */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, var(--color-accent-cyan), transparent 70%)',
            }}
            aria-hidden="true"
          />

          <h2 className="relative text-xl sm:text-2xl font-display font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="relative mt-3 text-muted max-w-lg mx-auto">{t('subtitle')}</p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                <Mail size={16} className="mr-2" />
                {t('cta.email')}
              </Button>
            </Link>
            <a href="/files/CV_Sebastian_Ballen.pdf" download>
              <Button variant="secondary" size="lg">
                <FileDown size={16} className="mr-2" />
                {t('cta.cv')}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
