import { Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('layout.footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-(--stroke-grid)">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-(--text-secondary)">
              {t('copyright', { year: String(year) })}
            </span>
            <span className="text-xs text-(--text-muted) font-mono">{t('tagline')}</span>
            <span className="text-xs text-(--text-muted)/60">{t('builtWith')}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SebastianBC09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            >
              {t('links.github')}
            </a>
            <a
              href="https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            >
              {t('links.linkedin')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
