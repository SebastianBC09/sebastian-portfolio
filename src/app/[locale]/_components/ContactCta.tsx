'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const SOCIAL_LINKS = [
  {
    id: 'github',
    icon: Github,
    href: 'https://github.com/SebastianBC09',
    label: 'GitHub',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper',
    label: 'LinkedIn',
  },
] as const;

export function ContactCta() {
  const t = useTranslations('home.contactCta');

  return (
    <section className="relative py-24 md:py-32">
      {/* Ambient glow behind the card */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-150 h-75 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, var(--color-accent-cyan), transparent 70%)',
            opacity: 0.045,
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Location badge */}
        <Reveal>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border mb-6"
            style={{
              background: 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
              color: 'var(--color-accent-cyan)',
            }}
          >
            <MapPin size={11} />
            {t('location')}
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-text-primary">
            {t('title')}
            <br />
            <span
              className="gradient-text"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-lime))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('titleAccent')}
            </span>
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.15}>
          <p className="mt-4 text-base leading-relaxed text-text-muted max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                <Mail size={16} />
                {t('cta.email')}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </Link>
            <a href="/files/CV_Sebastian_Ballen.pdf" download>
              <Button variant="secondary" size="lg">
                <FileDown size={16} />
                {t('cta.cv')}
              </Button>
            </a>
          </div>
        </Reveal>

        {/* Social links */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ id, icon: Icon, href, label }) => (
              <motion.a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-stroke-grid)',
                  color: 'var(--color-text-muted)',
                }}
                whileHover={{
                  y: -3,
                  color: 'var(--color-accent-cyan)',
                  borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 25%, transparent)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
