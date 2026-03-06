import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineCard } from './TimelineCard';
import { TIMELINE_ENTRIES } from '@/content/about';

const ORIGIN_YEAR = 2017;
const ORIGIN_MONTH = 0;
const TOTAL_MONTHS = 110;
const PX_PER_MONTH = 1200 / TOTAL_MONTHS;
const MIN_GAP = 16;
const MIN_MONTHS = 18;
const MIN_PROP_H = Math.round(MIN_MONTHS * PX_PER_MONTH);

const H_PADDING = 40;
const H_HEADER = 72;
const H_DESCRIPTION = 80;
const H_ACTIVE = 28;

const DESCRIPTION_HEIGHTS: Record<string, number> = {
  fasterSolutions: 72,
  arroyo: 80,
  magneto: 96,
  cafeto: 80,
  lakeSuperior: 80,
  platzi: 80,
  teinco: 80,
  uninpahu: 96,
};

function monthsFromOrigin(iso: string): number {
  const d = new Date(iso);
  return (d.getFullYear() - ORIGIN_YEAR) * 12 + (d.getMonth() - ORIGIN_MONTH);
}

function estimateNatH(key: string, isActive: boolean): number {
  const descH = DESCRIPTION_HEIGHTS[key] ?? H_DESCRIPTION;
  return H_PADDING + H_HEADER + descH + (isActive ? H_ACTIVE : 0);
}

interface PositionedEntry {
  key: string;
  accent: string;
  status: 'completed' | 'active';
  top: number;
  minHeight: number;
  effectiveH: number;
}

function layoutColumn(track: 'professional' | 'academic'): PositionedEntry[] {
  const col = TIMELINE_ENTRIES.filter((e) => e.track === track).sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  const positioned: PositionedEntry[] = col.map((e) => {
    const startM = monthsFromOrigin(e.startDate);
    const endM = e.endDate ? monthsFromOrigin(e.endDate) : TOTAL_MONTHS;
    const rawPropH = Math.round((endM - startM) * PX_PER_MONTH);
    const propH = Math.max(rawPropH, MIN_PROP_H);
    const natH = estimateNatH(e.key, e.status === 'active');
    const effectiveH = Math.max(propH, natH);

    return {
      key: e.key,
      accent: e.accent,
      status: e.status,
      top: Math.round(startM * PX_PER_MONTH),
      minHeight: natH,
      effectiveH,
    };
  });

  for (let i = 1; i < positioned.length; i++) {
    const prev = positioned[i - 1];
    const curr = positioned[i];
    const minTop = prev.top + prev.effectiveH + MIN_GAP;
    if (curr.top < minTop) curr.top = minTop;
  }

  return positioned;
}

const YEAR_MARKERS: { year: number; top: number }[] = [
  2017, 2019, 2021, 2022, 2023, 2024, 2025,
].map((year) => ({
  year,
  top: Math.round((year - ORIGIN_YEAR) * 12 * PX_PER_MONTH),
}));

export function DualTimeline() {
  const t = useTranslations('about.timeline');

  const professional = layoutColumn('professional');
  const academic = layoutColumn('academic');

  const tallest =
    Math.max(
      ...professional.map((e) => e.top + e.effectiveH),
      ...academic.map((e) => e.top + e.effectiveH)
    ) + MIN_GAP;

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('heading')} />

        {/* ── Track labels — desktop only ── */}
        <Reveal>
          <div className="hidden md:grid grid-cols-[1fr_64px_1fr] mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-text-muted text-right pr-8">
              {t('tracks.professional')}
            </p>
            <div />
            <p className="text-xs font-mono uppercase tracking-widest text-text-muted pl-8">
              {t('tracks.academic')}
            </p>
          </div>
        </Reveal>

        {/* DESKTOP */}
        <div
          className="relative hidden md:grid grid-cols-[1fr_64px_1fr]"
          style={{ height: tallest }}
        >
          {/* Center spine */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent,
                var(--color-stroke-active) 2%,
                var(--color-stroke-active) 98%,
                transparent
              )`,
            }}
            aria-hidden="true"
          />

          {/* Year markers — true proportional positions */}
          {YEAR_MARKERS.map(({ year, top }) => (
            <div
              key={year}
              className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
              style={{ top }}
              aria-hidden="true"
            >
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-stroke)',
                }}
              >
                {year}
              </span>
            </div>
          ))}

          {/* Professional column (left) */}
          <div className="relative">
            {professional.map((entry) => {
              const entryT = t.raw(`entries.${entry.key}`) as {
                role: string;
                org: string;
                period: string;
                description: string;
              };
              return (
                <Reveal key={entry.key}>
                  <div className="absolute right-0 pr-8" style={{ top: entry.top, width: '100%' }}>
                    <TimelineCard
                      role={entryT.role}
                      org={entryT.org}
                      period={entryT.period}
                      description={entryT.description}
                      accent={entry.accent}
                      minHeight={entry.minHeight}
                      status={entry.status}
                      side="left"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Spine spacer */}
          <div />

          {/* Academic column (right) */}
          <div className="relative">
            {academic.map((entry) => {
              const entryT = t.raw(`entries.${entry.key}`) as {
                role: string;
                org: string;
                period: string;
                description: string;
              };
              return (
                <Reveal key={entry.key}>
                  <div className="absolute left-0 pl-8" style={{ top: entry.top, width: '100%' }}>
                    <TimelineCard
                      role={entryT.role}
                      org={entryT.org}
                      period={entryT.period}
                      description={entryT.description}
                      accent={entry.accent}
                      minHeight={entry.minHeight}
                      status={entry.status}
                      side="right"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* MOBILE — stacked, oldest first */}
        <div className="flex flex-col gap-5 md:hidden">
          <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">
            {t('tracks.professional')}
          </p>
          {professional.map((entry, i) => {
            const entryT = t.raw(`entries.${entry.key}`) as {
              role: string;
              org: string;
              period: string;
              description: string;
            };
            return (
              <Reveal key={entry.key} delay={i * 0.08}>
                <TimelineCard
                  role={entryT.role}
                  org={entryT.org}
                  period={entryT.period}
                  description={entryT.description}
                  accent={entry.accent}
                  minHeight={entry.minHeight}
                  status={entry.status}
                  side="left"
                />
              </Reveal>
            );
          })}

          <p className="text-xs font-mono uppercase tracking-widest text-text-muted mt-4 mb-1">
            {t('tracks.academic')}
          </p>
          {academic.map((entry, i) => {
            const entryT = t.raw(`entries.${entry.key}`) as {
              role: string;
              org: string;
              period: string;
              description: string;
            };
            return (
              <Reveal key={entry.key} delay={i * 0.08}>
                <TimelineCard
                  role={entryT.role}
                  org={entryT.org}
                  period={entryT.period}
                  description={entryT.description}
                  accent={entry.accent}
                  minHeight={entry.minHeight}
                  status={entry.status}
                  side="right"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
