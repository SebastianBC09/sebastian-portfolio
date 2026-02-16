'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const NAV_KEYS = ['projects', 'about', 'skills', 'blog', 'contact'] as const;

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  projects: '/#projects',
  about: '/about',
  skills: '/skills',
  blog: '/blog',
  contact: '/contact',
};

export function Header() {
  const t = useTranslations('layout.header');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to keep active state logic consistent across desktop/mobile
  const checkIsActive = (href: string) => {
    return pathname === href || pathname.startsWith(href.replace('/#', '/'));
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-(--bg-primary)/80 backdrop-blur-xl border-b border-(--stroke-grid)'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 group"
          aria-label={t('logoAlt')}
        >
          <div className="w-9 h-9 rounded-md flex items-center justify-center border border-(--stroke-grid) bg-(--bg-card) group-hover:border-(--accent-cyan)/40 transition-colors">
            <span className="font-display font-bold text-sm text-(--text-primary)">SB</span>
          </div>
          <span className="hidden sm:inline text-sm font-medium text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
            bccloudsolutions.dev
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_KEYS.map((key) => {
            const href = NAV_HREFS[key];
            const isActive = checkIsActive(href);

            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-colors',
                  isActive
                    ? 'text-(--text-primary) bg-(--bg-card)'
                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-card)/50'
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}

          <div className="ml-3 flex items-center gap-2 pl-3 border-l border-(--stroke-grid)">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-md text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-card) transition-colors"
            aria-label={isMobileOpen ? t('actions.closeMenu') : t('actions.openMenu')}
          >
            {isMobileOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-(--bg-primary)/95 backdrop-blur-xl border-b border-(--stroke-grid)">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_KEYS.map((key) => {
              const href = NAV_HREFS[key];
              const isActive = checkIsActive(href);

              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm rounded-md transition-colors',
                    isActive
                      ? 'text-(--text-primary) bg-(--bg-card)'
                      : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-card)/50'
                  )}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
