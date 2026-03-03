'use client';

import { Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  TECH_CATEGORIES,
  SKILL_TIERS,
  FOUNDATIONS,
  CONTEXT_ACCENT,
  type TechCategoryId,
  type Skill,
  type Foundation,
  type TierMeta,
  type TechCategory,
} from '@/content/skills';

// ═════════ HELPERS ═════════

function ghostFontSize(ghost: string): number {
  if (ghost.length <= 1) return 52;
  if (ghost.length === 2) return 44;
  if (ghost.length === 3) return 34;
  return 26;
}

function ghostFontFamily(ghost: string): string {
  return /\p{Emoji}/u.test(ghost) ? 'var(--font-dm-sans)' : 'var(--font-jetbrains-mono)';
}

// ═════════ TierPill (sub-component of SkillChip) ═════════

interface TierPillProps {
  tier: TierMeta;
  label: string;
}

function TierPill({ tier, label }: TierPillProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-mono
                 rounded-full px-2 py-0.5 border whitespace-nowrap shrink-0"
      style={{
        color: tier.accent,
        background: `color-mix(in srgb, ${tier.accent} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${tier.accent} 20%, transparent)`,
      }}
    >
      {/* Dot indicator */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: tier.accent }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

// ═════════ SkillChip (main grid item) ═════════
interface SkillChipProps {
  skill: Skill;
  categoryAccent: string;
  tierMeta: TierMeta;
  tierLabel: string;
}

function SkillChip({ skill, categoryAccent, tierMeta, tierLabel }: SkillChipProps) {
  return (
    <div
      className="group relative rounded-xl border overflow-hidden
                 transition-all duration-220 cursor-default"
      style={{
        minHeight: 80,
        padding: '12px 14px 12px 20px',
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-stroke)',
      }}
    >
      <div
        className="absolute left-0 top-3.5 bottom-3.5 w-0.5 rounded-full
                   opacity-[0.22] group-hover:opacity-100 transition-opacity duration-220"
        style={{
          background: `linear-gradient(180deg, ${categoryAccent}, transparent)`,
        }}
        aria-hidden="true"
      />
      <span
        className="absolute right-2 select-none pointer-events-none leading-none
                   opacity-[0.055] group-hover:opacity-[0.11]
                   transition-opacity duration-220"
        style={{
          top: '50%',
          bottom: '-4px',
          fontWeight: 700,
          fontSize: ghostFontSize(skill.ghost),
          fontFamily: ghostFontFamily(skill.ghost),
          color: categoryAccent,
          letterSpacing: skill.ghost.length <= 2 ? '-0.02em' : '0em',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
        aria-hidden="true"
      >
        {skill.ghost}
      </span>
      <div className="relative z-10 flex items-start justify-between gap-2 mb-2">
        <span
          className="font-display font-semibold text-[13px] leading-snug
                     text-text-secondary group-hover:text-text-primary
                     transition-colors duration-220"
        >
          {skill.name}
        </span>
        <TierPill tier={tierMeta} label={tierLabel} />
      </div>
      <div className="relative z-10 flex flex-wrap gap-1">
        {skill.usedAt.map((ctx) => (
          <span
            key={ctx}
            className="text-[9px] font-mono tracking-[0.08em] uppercase opacity-75"
            style={{ color: CONTEXT_ACCENT[ctx] }}
          >
            {ctx}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═════════ FoundationChip (sub-component of Foundations group) ═════════

interface FoundationChipProps {
  foundation: Foundation;
  categoryAccent: string;
}

function FoundationChip({ foundation, categoryAccent }: FoundationChipProps) {
  return (
    <div
      className="group relative rounded-xl border overflow-hidden
                 transition-all duration-220 cursor-default"
      style={{
        minHeight: 80,
        padding: '12px 14px 12px 20px',
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-stroke)',
      }}
    >
      <div
        className="absolute left-0 top-3.5 bottom-3.5 w-0.5 rounded-full
                   opacity-[0.22] group-hover:opacity-100 transition-opacity duration-220"
        style={{
          background: `linear-gradient(180deg, ${categoryAccent}, transparent)`,
        }}
        aria-hidden="true"
      />
      <span
        className="absolute right-2 select-none pointer-events-none leading-none
                   opacity-[0.055] group-hover:opacity-[0.11]
                   transition-opacity duration-220"
        style={{
          top: '50%',
          bottom: '-4px',
          fontWeight: 700,
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: ghostFontSize(foundation.ghost),
          color: categoryAccent,
          letterSpacing: foundation.ghost.length <= 2 ? '-0.02em' : '0em',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
        aria-hidden="true"
      >
        {foundation.ghost}
      </span>
      <div className="relative z-10 mb-2">
        <span
          className="font-display font-semibold text-[13px] leading-snug
                     text-text-secondary group-hover:text-text-primary
                     transition-colors duration-220"
        >
          {foundation.name}
        </span>
      </div>
      <div className="relative z-10 flex flex-wrap gap-1">
        {foundation.usedAt.map((ctx) => (
          <span
            key={ctx}
            className="text-[9px] font-mono tracking-[0.08em] uppercase opacity-75"
            style={{ color: CONTEXT_ACCENT[ctx] }}
          >
            {ctx}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═════════ TierDivider (sub-component of Chip grid, used to divide Familiar/Proficient/Production groups) ═════════

interface TierDividerProps {
  tier: TierMeta;
  label: string;
}

function TierDivider({ tier, label }: TierDividerProps) {
  return (
    <div className="col-span-full flex items-center gap-3 mt-2" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tier.accent }} />
      <span
        className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase shrink-0"
        style={{ color: tier.accent }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: `color-mix(in srgb, ${tier.accent} 12%, transparent)`,
        }}
      />
    </div>
  );
}

// ═════════ CategoryTab (sub-component of tab row) ═════════

interface CategoryTabProps {
  cat: TechCategory;
  label: string;
  isActive: boolean;
  onClick: () => void;
  tierLabels: Record<string, string>;
}

function CategoryTab({ cat, label, isActive, onClick, tierLabels }: CategoryTabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className="group relative text-left w-full rounded-[14px] border overflow-hidden
                 transition-all duration-220 cursor-pointer"
      style={{
        padding: '14px 16px',
        background: isActive
          ? `color-mix(in srgb, ${cat.accent} 7%, var(--color-bg-card))`
          : 'var(--color-bg-card)',
        borderColor: isActive
          ? `color-mix(in srgb, ${cat.accent} 35%, transparent)`
          : 'var(--color-stroke)',
        transform: isActive ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-220"
        style={{
          background: cat.accent,
          opacity: isActive ? 1 : 0.18,
        }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className="text-sm font-mono shrink-0"
          style={{ color: cat.accent }}
          aria-hidden="true"
        >
          {cat.icon}
        </span>
        <span
          className="font-display font-bold text-xs transition-colors duration-220"
          style={{
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          }}
        >
          {label}
        </span>
        <span
          className="ml-auto text-[10px] font-mono rounded-full px-1.5 py-0.5 border"
          style={{
            color: cat.accent,
            background: `color-mix(in srgb, ${cat.accent} 12%, transparent)`,
            borderColor: `color-mix(in srgb, ${cat.accent} 25%, transparent)`,
          }}
        >
          {cat.skills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILL_TIERS.toReversed().map((tier) => {
          const count = cat.skills.filter((s) => s.tier === tier.id).length;
          if (!count) return null;
          return (
            <span
              key={tier.id}
              className="text-[10px] font-mono opacity-70"
              style={{ color: tier.accent }}
            >
              {count}× {tierLabels[tier.id]}
            </span>
          );
        })}
      </div>
    </button>
  );
}

// ═════════ CategoryAnnotation  ═════════

interface CategoryAnnotationProps {
  text: string;
  accent: string;
}

function CategoryAnnotation({ text, accent }: CategoryAnnotationProps) {
  return (
    <div className="flex items-start gap-2.5 mb-7">
      <span
        className="shrink-0 mt-[0.45em] w-4 h-px"
        style={{ background: accent, opacity: 0.35 }}
        aria-hidden="true"
      />
      <p
        className="text-[13px] font-body italic leading-relaxed"
        style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
      >
        {text}
      </p>
    </div>
  );
}

// ═════════ SkillsGrid (main component) ═════════

export function SkillsGrid() {
  const t = useTranslations('skills');
  const [activeId, setActiveId] = useState<TechCategoryId>('frontend');

  const activeCat = TECH_CATEGORIES.find((c) => c.id === activeId)!;

  const tierLabels = Object.fromEntries(
    SKILL_TIERS.map((tier) => [tier.id, t(`tiers.${tier.id}.label`)])
  );

  const grouped = Object.fromEntries(
    SKILL_TIERS.map((tier) => [tier.id, activeCat.skills.filter((s) => s.tier === tier.id)])
  ) as Record<string, Skill[]>;

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section heading ── */}
        <SectionHeading
          label={t('grid.label')}
          title={t('grid.title')}
          description={t('grid.description')}
        />

        {/* ── Category tabs — tablist ── */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label={t('grid.tablistLabel')}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8"
          >
            {TECH_CATEGORIES.map((cat) => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                label={t(`categories.${cat.id}.label`)}
                isActive={activeId === cat.id}
                onClick={() => setActiveId(cat.id)}
                tierLabels={tierLabels}
              />
            ))}
          </div>
        </Reveal>

        {/* ── Active category header bar ── */}
        <Reveal>
          <div
            className="flex items-center gap-2.5 pb-3.5 mb-7 border-b"
            style={{
              borderColor: `color-mix(in srgb, ${activeCat.accent} 18%, transparent)`,
            }}
          >
            <span
              className="text-sm font-mono"
              style={{ color: activeCat.accent }}
              aria-hidden="true"
            >
              {activeCat.icon}
            </span>
            <span className="font-display font-bold text-[15px] text-text-primary">
              {t(`categories.${activeCat.id}.label`)}
            </span>
            <span className="text-[10px] font-mono text-text-muted">
              — {activeCat.skills.length} {t('grid.technologiesLabel')}
            </span>
            {/* Blueprint spec annotation */}
            <span
              className="ml-auto text-[9px] font-mono tracking-widest uppercase"
              style={{ color: activeCat.accent, opacity: 0.3 }}
              aria-hidden="true"
            >
              SPEC·{activeCat.id.toUpperCase()}
            </span>
          </div>
        </Reveal>

        {/* ── Category annotation — one honest line per category ── */}
        <Reveal delay={0.05}>
          <CategoryAnnotation
            text={t(`categories.${activeCat.id}.annotation`)}
            accent={activeCat.accent}
          />
        </Reveal>

        {/* ── Chip grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {/* Foundations group — Frontend tab only ── */}
          {activeId === 'frontend' && (
            <>
              {/* Foundations divider label */}
              <div className="col-span-full flex items-center gap-3" aria-hidden="true">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--color-text-muted)', opacity: 0.5 }}
                />
                <span
                  className="font-mono text-[10px] font-semibold tracking-[0.12em]
                             uppercase shrink-0"
                  style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
                >
                  {t('grid.foundations.label')}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span
                  className="hidden md:block text-[11px] font-body shrink-0"
                  style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
                >
                  {t('grid.foundations.description')}
                </span>
              </div>

              {/* Foundation chips */}
              {FOUNDATIONS.map((foundation, i) => (
                <Reveal key={foundation.name} delay={i * 0.04}>
                  <FoundationChip foundation={foundation} categoryAccent={activeCat.accent} />
                </Reveal>
              ))}
            </>
          )}

          {/* Tier-grouped skill chips: Familiar → Proficient → Production */}
          {SKILL_TIERS.map((tier) => {
            const skills = grouped[tier.id];
            if (!skills.length) return null;

            return (
              <Fragment key={tier.id}>
                <TierDivider tier={tier} label={tierLabels[tier.id]} />
                {skills.map((skill, i) => (
                  <Reveal key={skill.name} delay={i * 0.04}>
                    <SkillChip
                      skill={skill}
                      categoryAccent={activeCat.accent}
                      tierMeta={tier}
                      tierLabel={tierLabels[tier.id]}
                    />
                  </Reveal>
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
