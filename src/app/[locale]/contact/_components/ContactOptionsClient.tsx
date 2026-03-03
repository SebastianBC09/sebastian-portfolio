'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SOCIAL_LINKS, SOCIAL_CARDS, AVAILABILITY } from '@/content/contact';
import { ContactFormPlaceholder } from './ContactFormPlaceholder';

// ═════════ EmailCard ═════════

interface EmailCardProps {
  emailHref: string;
}

function EmailCard({ emailHref }: EmailCardProps) {
  const t = useTranslations('contact.options');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const address = emailHref.replace('mailto:', '');
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  }, [emailHref]);

  const displayAddress = emailHref.replace('mailto:', '');

  const ACCENT = 'var(--color-accent-cyan)';
  const availabilityVariant = AVAILABILITY.open ? 'lime' : 'coral';
  const availabilityLabel = AVAILABILITY.open ? t('availability.open') : t('availability.closed');

  return (
    <Card
      hover={false}
      padding="none"
      className="relative h-full pl-7 pr-6 py-6 overflow-hidden"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-accent-cyan) 20%, transparent)',
        background: 'color-mix(in srgb, var(--color-accent-cyan) 3%, var(--color-bg-card))',
      }}
    >
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            color-mix(in srgb, var(--color-accent-cyan) 55%, transparent),
            transparent
          )`,
          animation: 'scanLine 4s cubic-bezier(0.4,0,0.6,1) infinite',
        }}
        aria-hidden="true"
      />
      <Card.AccentBar color={ACCENT} inset="18px" />
      <span
        className="absolute top-3 right-4 text-[9px] font-mono tracking-[0.12em] uppercase"
        style={{ color: ACCENT, opacity: 0.32 }}
        aria-hidden="true"
      >
        {'/* primary contact */'}
      </span>
      <span
        className="absolute right-4 font-mono font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 96,
          color: ACCENT,
          opacity: 0.04,
          letterSpacing: '-0.02em',
          bottom: '-8px',
        }}
        aria-hidden="true"
      >
        @
      </span>
      <svg
        className="absolute bottom-4 right-5"
        width="32"
        height="32"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      >
        <line x1="16" y1="0" x2="16" y2="32" stroke={ACCENT} strokeWidth="1" />
        <line x1="0" y1="16" x2="32" y2="16" stroke={ACCENT} strokeWidth="1" />
        <circle cx="16" cy="16" r="5" fill="none" stroke={ACCENT} strokeWidth="1" />
      </svg>
      <div
        className="absolute left-9 right-6 pointer-events-none"
        style={{ bottom: '14px' }}
        aria-hidden="true"
      >
        <span
          className="absolute right-0 -top-3.5 text-[8px] font-mono tracking-widest uppercase"
          style={{ color: ACCENT, opacity: 0.22 }}
        >
          width · 100%
        </span>
      </div>
      <div className="flex items-center gap-1 mb-5" aria-hidden="true">
        {([0.7, 0.45, 0.25] as const).map((opacity, i) => (
          <div
            key={i}
            className="w-1.25 h-1.25 rounded-full"
            style={{
              background: ACCENT,
              opacity,
              animation: `sigPulse 2.4s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
      <Card.Header
        title={t('email.label')}
        subtitleColor={ACCENT}
        trailing={
          <Badge variant={availabilityVariant}>
            <span
              className="w-1.25 h-1.25 rounded-full inline-block mr-1"
              style={{ background: 'currentColor', animation: 'pulseDot 2s ease-in-out infinite' }}
              aria-hidden="true"
            />
            {availabilityLabel}
          </Badge>
        }
      />
      <p
        className="mt-3 mb-3 font-display font-bold leading-tight break-all"
        style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', color: 'var(--color-text-primary)' }}
        suppressHydrationWarning
      >
        {displayAddress}
      </p>
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: 'var(--color-accent-lime)',
            boxShadow: '0 0 6px color-mix(in srgb, var(--color-accent-lime) 60%, transparent)',
            animation: 'glowPulse 2.5s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
        <span
          className="text-[11px] font-mono tracking-[0.06em]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('email.responseHint')}
        </span>
      </div>
      <button
        onClick={handleCopy}
        aria-label={copied ? t('email.copied') : t('email.hint')}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                   font-semibold text-sm transition-all duration-200 cursor-pointer border"
        style={{
          color: copied ? 'var(--color-accent-lime)' : ACCENT,
          borderColor: copied
            ? 'color-mix(in srgb, var(--color-accent-lime) 30%, transparent)'
            : 'color-mix(in srgb, var(--color-accent-cyan) 30%, transparent)',
          background: copied
            ? 'color-mix(in srgb, var(--color-accent-lime) 8%, transparent)'
            : 'color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)',
        }}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? t('email.copied') : t('email.hint')}
      </button>
      <ContactFormPlaceholder />
    </Card>
  );
}

// ═════════ SocialCard ═════════

interface SocialCardProps {
  label: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  monogram: string;
  annotation: string;
}

function SocialCard({
  label,
  description,
  cta,
  href,
  accent,
  monogram,
  annotation,
}: SocialCardProps) {
  return (
    <Card
      hover
      padding="none"
      className="relative group pl-7 pr-10 py-5 flex flex-col justify-between"
      style={{ borderColor: `color-mix(in srgb, ${accent} 15%, transparent)` }}
    >
      <Card.AccentBar color={accent} inset="14px" />
      <span
        className="absolute top-2.5 right-3.5 text-[8px] font-mono tracking-[0.12em] uppercase"
        style={{ color: accent, opacity: 0.28 }}
        aria-hidden="true"
      >
        {annotation}
      </span>
      <span
        className="absolute right-5 font-mono font-bold select-none pointer-events-none leading-none"
        style={{ fontSize: 52, color: accent, opacity: 0.055, bottom: '-4px' }}
        aria-hidden="true"
      >
        {monogram}
      </span>
      <div>
        <Card.Header title={label} subtitleColor={accent} />
        <Card.Body>{description}</Card.Body>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cta} — ${label}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: accent }}
      >
        {cta}
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </Card>
  );
}

// ═════════ ContactOptionsClient ═════════

export interface ContactOptionsClientProps {
  emailHref: string;
  waHref: string;
}

export function ContactOptionsClient({ emailHref, waHref }: ContactOptionsClientProps) {
  const t = useTranslations('contact.options');

  const hrefs: Record<string, string> = {
    linkedin: SOCIAL_LINKS.linkedin,
    github: SOCIAL_LINKS.github,
    whatsapp: waHref,
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('title')} description={t('description')} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
          <Reveal delay={0.1} className="lg:col-span-3 h-full">
            <div className="h-full">
              <EmailCard emailHref={emailHref} />
            </div>
          </Reveal>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {SOCIAL_CARDS.map((card, i) => (
              <Reveal key={card.id} delay={0.18 + i * 0.08}>
                <SocialCard
                  label={t(`${card.i18nKey}.label`)}
                  description={t(`${card.i18nKey}.description`)}
                  cta={t(`${card.i18nKey}.cta`)}
                  href={hrefs[card.id]}
                  accent={card.accent}
                  monogram={card.monogram}
                  annotation={card.annotation}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
