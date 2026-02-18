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
  projects: '/projects',
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
      setIsScrolled(window.scrollY > 40);
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'border-b border-accent-cyan/8' : 'border-b border-transparent'
      )}
      style={{
        background: isScrolled
          ? 'color-mix(in srgb, var(--color-bg-primary) 88%, transparent)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 group"
          aria-label={t('logoAlt')}
        >
          <div
            className={cn(
              'w-10 h-10 rounded-[10px] flex items-center justify-center',
              'font-mono font-bold text-sm',
              'bg-accent-cyan/10 border-[1.5px] border-accent-cyan/25',
              'text-accent-cyan',
              'group-hover:scale-105 transition-transform duration-300'
            )}
          >
            SB
          </div>
          <span className="hidden sm:inline text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">
            bccloudsolutions.dev
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_KEYS.map((key) => {
            const href = NAV_HREFS[key];
            const isActive = checkIsActive(href);

            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg transition-colors',
                  isActive
                    ? 'text-text-primary bg-bg-card'
                    : 'text-text-muted hover:text-text-primary hover:bg-text-primary/5'
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}

          {/* Contact CTA */}
          <Link
            href="/contact"
            className={cn(
              'px-4 py-2 text-sm font-semibold rounded-lg transition-all',
              'bg-accent-coral/12 text-accent-coral',
              'border border-accent-coral/25',
              'hover:bg-accent-coral/20 hover:border-accent-coral/40'
            )}
          >
            {t('nav.contact')}
          </Link>

          {/* Separator */}
          <div className="w-px h-6 bg-stroke ml-2 mr-2" />

          {/* Language + Theme */}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* ── Mobile toggle ── */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2 rounded-lg text-text-primary hover:bg-bg-card transition-colors"
            aria-label={isMobileOpen ? t('actions.closeMenu') : t('actions.openMenu')}
          >
            {isMobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {isMobileOpen && (
        <div
          className="md:hidden px-6 pb-6 space-y-1 border-b border-stroke-grid"
          style={{
            background: 'color-mix(in srgb, var(--color-bg-primary) 95%, transparent)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {NAV_KEYS.map((key) => {
            const href = NAV_HREFS[key];
            const isActive = checkIsActive(href);

            return (
              <Link
                key={key}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'text-text-primary bg-bg-card'
                    : 'text-text-muted hover:text-text-primary hover:bg-text-primary/5'
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'block px-4 py-3 rounded-lg text-sm font-semibold transition-all',
              'bg-accent-coral/12 text-accent-coral',
              'border border-accent-coral/25'
            )}
          >
            {t('nav.contact')}
          </Link>
        </div>
      )}
    </header>
  );
}
