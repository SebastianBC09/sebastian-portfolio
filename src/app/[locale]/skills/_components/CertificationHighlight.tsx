'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CERT_TAGS } from '@/content/skills';

/**
 * CertificationHighlight — GCP Associate Cloud Engineer cert block.
 *
 * Structural pattern mirrors Recognition.tsx:
 *   Card (padding="none") → AccentBar → Header → Body → Footer
 *
 * Visual additions specific to this block:
 *   - Ghost "GCP" monogram — large, low-opacity, bottom-right (same
 *     principle as the ProcessSection ghost step numbers)
 *   - Blueprint crosshair SVG — decorative, bottom-right corner
 *   - Blueprint annotation — "CERT · ISSUED 2024", top-right, mono
 *
 * Accent: lime — matches the GCP skill chip in SkillsGrid and the
 * Certified context tag color in CONTEXT_ACCENT.
 *
 * i18n namespace: skills.certification
 *   keys: eyebrow · title · description
 *
 * CERT_TAGS (tech coverage labels) are NOT translated — proper technical
 * terms that don't change across locales.
 */
export function CertificationHighlight() {
  const t = useTranslations('skills.certification');

  const ACCENT = 'var(--color-accent-lime)';

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section heading ── */}
        <SectionHeading label={t('label')} title={t('sectionTitle')} />

        {/* ── Cert card ── */}
        <Reveal delay={0.1}>
          <Card
            hover={false}
            padding="none"
            className="relative pl-7 pr-6 py-6"
            style={{
              borderColor: 'color-mix(in srgb, var(--color-accent-lime) 25%, transparent)',
              background: 'color-mix(in srgb, var(--color-accent-lime) 4%, var(--color-bg-card))',
            }}
          >
            {/* ── Card.AccentBar — lime gradient ── */}
            <Card.AccentBar color={ACCENT} inset="18px" />

            {/* ── Blueprint annotation — top right ── */}
            <span
              className="absolute top-3 right-4 text-[9px] font-mono tracking-[0.12em] uppercase"
              style={{ color: ACCENT, opacity: 0.3 }}
              aria-hidden="true"
            >
              CERT · ISSUED 2024
            </span>

            {/* ── Ghost GCP monogram — bottom right ──
                Same principle as ProcessSection ghost step numbers:
                large typographic texture behind real content, aria-hidden. ── */}
            <span
              className="absolute right-5 -bottom-1.5 font-mono font-bold
                         select-none pointer-events-none leading-none"
              style={{
                fontSize: 72,
                color: ACCENT,
                opacity: 0.05,
                letterSpacing: '-0.02em',
              }}
              aria-hidden="true"
            >
              GCP
            </span>

            {/* ── Blueprint crosshair SVG — bottom right ── */}
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

            {/* ── Content row: icon block + text ── */}
            <div className="flex items-start gap-5 flex-wrap">
              {/* Cloud icon block */}
              <div
                className="shrink-0 w-13 h-13 rounded-xl flex items-center justify-center
                           text-2xl border"
                style={{
                  background: 'color-mix(in srgb, var(--color-accent-lime) 8%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--color-accent-lime) 30%, transparent)',
                }}
                aria-hidden="true"
              >
                ☁
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-50">
                {/* Card.Header — eyebrow as subtitle, title as h3 */}
                <Card.Header title={t('title')} subtitle={t('eyebrow')} subtitleColor={ACCENT} />

                {/* Card.Body — description */}
                <Card.Body className="mb-5">{t('description')}</Card.Body>

                {/* Card.Footer — coverage tags ──
                    CERT_TAGS are hardcoded proper nouns, not translated.
                    Styled to match the lime accent of the block. ── */}
                <Card.Footer className="mt-0">
                  {CERT_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono rounded-full px-2.5 py-1 border"
                      style={{
                        color: ACCENT,
                        background: 'color-mix(in srgb, var(--color-accent-lime) 10%, transparent)',
                        borderColor:
                          'color-mix(in srgb, var(--color-accent-lime) 20%, transparent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </Card.Footer>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
