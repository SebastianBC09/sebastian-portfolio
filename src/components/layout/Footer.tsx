import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

// Server Component -- no client state needed.
// Github and Linkedin icons are now actually rendered (unlike the previous version).
export async function Footer() {
  const t = await getTranslations('layout.footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10">
      {/* Blueprint gradient accent line */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-accent-cyan), transparent)',
          opacity: 0.15,
        }}
      />

      <div
        className="border-t border-stroke-grid"
        style={{
          background: 'color-mix(in srgb, var(--color-bg-primary) 97%, transparent)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* ── Main row ───────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Brand block */}
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-[9px] flex items-center justify-center font-mono font-bold text-xs shrink-0"
                  style={{
                    background: 'color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)',
                    border:
                      '1.5px solid color-mix(in srgb, var(--color-accent-cyan) 25%, transparent)',
                    color: 'var(--color-accent-cyan)',
                  }}
                >
                  SB
                </div>
                <span className="text-sm font-medium text-text-primary">Sebastian Ballen</span>
              </div>
              <p
                className="text-xs font-mono leading-relaxed"
                style={{
                  color:
                    'color-mix(in srgb, var(--color-accent-cyan) 55%, var(--color-text-muted))',
                }}
              >
                {t('tagline')}
              </p>
              <span className="text-xs text-text-muted/50">{t('builtWith')}</span>
            </div>

            {/* Nav + Social block */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Internal nav */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-text-muted mb-1">
                  {t('navigate')}
                </span>
                {(
                  [
                    { key: 'about', href: '/about' },
                    { key: 'skills', href: '/skills' },
                    { key: 'contact', href: '/contact' },
                  ] as const
                ).map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {t(`links.${key}`)}
                  </Link>
                ))}
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-text-muted mb-1">
                  {t('connect')}
                </span>
                <a
                  href="https://github.com/SebastianBC09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors group"
                >
                  <Github size={14} strokeWidth={1.5} />
                  {t('links.github')}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors group"
                >
                  <Linkedin size={14} strokeWidth={1.5} />
                  {t('links.linkedin')}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ─────────────────────────────────────────────── */}
          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            style={{ borderTop: '1px solid var(--color-stroke-grid)' }}
          >
            <span className="text-xs text-text-muted/70">
              {t('copyright', { year: String(year) })}
            </span>
            <span className="text-[10px] font-mono text-text-muted/40 tracking-wider">v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
