import { useTranslations } from 'next-intl';

export function ContactFormPlaceholder() {
  const t = useTranslations('contact.form');

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-xl border border-dashed"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-accent-amber) 35%, transparent)',
        background: 'color-mix(in srgb, var(--color-accent-amber) 3%, transparent)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent-amber) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent-amber) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          opacity: 0.025,
        }}
        aria-hidden="true"
      />

      <div className="relative px-4 pt-4 pb-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
            style={{ background: 'color-mix(in srgb, var(--color-accent-amber) 12%, transparent)' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
              style={{ color: 'var(--color-accent-amber)' }}
              aria-hidden="true"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <div>
            <p
              className="text-[11px] font-semibold font-display"
              style={{ color: 'var(--color-accent-amber)' }}
            >
              {t('placeholder.label')}
            </p>
            <p
              className="text-[10px] font-mono tracking-wide mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {t('placeholder.description')}
            </p>
          </div>
        </div>
        <div className="space-y-2.5" aria-hidden="true">
          <div className="grid grid-cols-2 gap-2">
            <div
              className="h-8 rounded-lg"
              style={{
                background: 'color-mix(in srgb, var(--color-accent-amber) 6%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent-amber) 15%, transparent)',
              }}
            />
            <div
              className="h-8 rounded-lg"
              style={{
                background: 'color-mix(in srgb, var(--color-accent-amber) 6%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent-amber) 15%, transparent)',
              }}
            />
          </div>
          <div
            className="h-8 w-full rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--color-accent-amber) 6%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-accent-amber) 15%, transparent)',
            }}
          />
          <div
            className="h-16 w-full rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--color-accent-amber) 6%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-accent-amber) 15%, transparent)',
            }}
          />
          <div
            className="h-8 w-24 rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--color-accent-amber) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-accent-amber) 20%, transparent)',
            }}
          />
        </div>
        <span
          className="absolute bottom-2 right-3 text-[8px] font-mono tracking-[0.12em] uppercase"
          style={{ color: 'var(--color-accent-amber)', opacity: 0.4 }}
          aria-hidden="true"
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          /* v2 */
        </span>
      </div>
    </div>
  );
}
