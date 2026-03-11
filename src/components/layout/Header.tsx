'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_KEYS = ['about', 'projects', 'skills', 'blog'] as const;

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  about: '/about',
  projects: '/projects',
  skills: '/skills',
  blog: '/blog',
};

function LogoMark() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0 group/mark">
      <svg
        className="absolute inset-0 w-full h-full opacity-0 group-hover/mark:opacity-100 transition-opacity duration-300"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 11 L4 4 L11 4"
          stroke="var(--color-accent-cyan)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M29 4 L36 4 L36 11"
          stroke="var(--color-accent-cyan)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M4 29 L4 36 L11 36"
          stroke="var(--color-accent-cyan)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M29 36 L36 36 L36 29"
          stroke="var(--color-accent-cyan)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 group-hover/mark:scale-105"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)',
          border: '1.5px solid color-mix(in srgb, var(--color-accent-cyan) 25%, transparent)',
          color: 'var(--color-accent-cyan)',
        }}
      >
        SB
      </div>
    </div>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative px-4 py-2 text-sm rounded-lg transition-all duration-200 group/nav',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40',
        isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
      )}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'color-mix(in srgb, var(--color-accent-cyan) 7%, var(--color-bg-card))',
            border: '1px solid color-mix(in srgb, var(--color-accent-cyan) 14%, transparent)',
          }}
        />
      )}
      {!isActive && (
        <span className="absolute inset-0 rounded-lg bg-text-primary/0 group-hover/nav:bg-text-primary/5 transition-colors duration-200 pointer-events-none" />
      )}
      {isActive && (
        <span
          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1 h-1 rounded-full pointer-events-none"
          style={{ background: 'var(--color-accent-cyan)' }}
        />
      )}
      <span
        className="absolute left-1.5 top-1/2 -translate-y-1/2 font-mono text-[10px] opacity-0 group-hover/nav:opacity-40 transition-opacity duration-200 select-none pointer-events-none"
        style={{ color: 'var(--color-accent-cyan)' }}
        aria-hidden="true"
      >
        [
      </span>
      <span
        className="absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[10px] opacity-0 group-hover/nav:opacity-40 transition-opacity duration-200 select-none pointer-events-none"
        style={{ color: 'var(--color-accent-cyan)' }}
        aria-hidden="true"
      >
        ]
      </span>
      <span className="relative">{children}</span>
    </Link>
  );
}

function ContactButton({
  href,
  isActive,
  label,
}: {
  href: string;
  isActive: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group/contact relative ml-2 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent-coral/40"
      style={{
        color: 'var(--color-accent-coral)',
        background: isActive
          ? 'color-mix(in srgb, var(--color-accent-coral) 18%, transparent)'
          : 'color-mix(in srgb, var(--color-accent-coral) 10%, transparent)',
        border: isActive
          ? '1px solid color-mix(in srgb, var(--color-accent-coral) 45%, transparent)'
          : '1px solid color-mix(in srgb, var(--color-accent-coral) 22%, transparent)',
      }}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover/contact:translate-x-full transition-transform duration-500 ease-in-out pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-coral) 18%, transparent), transparent)',
        }}
        aria-hidden="true"
      />
      <span className="relative">{label}</span>
      <ArrowUpRight
        size={13}
        strokeWidth={2.2}
        className="relative transition-transform duration-200 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  t,
  checkIsActive,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
  checkIsActive: (href: string) => boolean;
}) {
  const isContactActive = checkIsActive('/contact');

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      )}
      aria-hidden={!isOpen}
      style={{
        background: 'color-mix(in srgb, var(--color-bg-primary) 95%, transparent)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="px-6 py-4 space-y-2 border-b border-stroke-grid">
        {NAV_KEYS.map((key) => {
          const href = NAV_HREFS[key];
          const isActive = checkIsActive(href);

          return (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors',
                isActive
                  ? 'text-text-primary bg-bg-card'
                  : 'text-text-muted hover:text-text-primary hover:bg-text-primary/5'
              )}
            >
              {isActive && (
                <span
                  className="w-0.5 h-4 rounded-full shrink-0"
                  style={{ background: 'var(--color-accent-cyan)' }}
                />
              )}
              {t(`nav.${key}`)}
            </Link>
          );
        })}

        <Link
          href="/contact"
          onClick={onClose}
          className={cn(
            'block px-4 py-3 rounded-lg text-sm font-semibold transition-all border',
            isContactActive
              ? 'bg-accent-coral/20 text-accent-coral border-accent-coral/50'
              : 'bg-accent-coral/12 text-accent-coral border-accent-coral/25'
          )}
        >
          {t('nav.contact')}
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const t = useTranslations('layout.header');
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpenForPath, setMenuOpenForPath] = useState<string | null>(null);
  const isMobileOpen = menuOpenForPath === pathname;

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const checkIsActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'border-b border-accent-cyan/10' : 'border-b border-transparent'
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
          onClick={() => setMenuOpenForPath(null)}
          className="flex items-center gap-3 group/logolink outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40 rounded-lg"
          aria-label={t('logoAlt')}
        >
          <LogoMark />
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className="text-sm font-semibold text-text-primary group-hover/logolink:text-accent-cyan transition-colors duration-200">
              Sebastian Ballen
            </span>
            <span
              className="text-[10px] font-mono"
              style={{
                color: 'color-mix(in srgb, var(--color-accent-cyan) 55%, var(--color-text-muted))',
              }}
            >
              bccloudsolutions.dev
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_KEYS.map((key) => (
            <NavLink key={key} href={NAV_HREFS[key]} isActive={checkIsActive(NAV_HREFS[key])}>
              {t(`nav.${key}`)}
            </NavLink>
          ))}

          <ContactButton
            href="/contact"
            isActive={checkIsActive('/contact')}
            label={t('nav.contact')}
          />

          <div className="w-px h-5 bg-stroke mx-2" />

          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* ── Mobile toggle ── */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpenForPath((p) => (p === null ? pathname : null))}
            className="p-2 rounded-lg text-text-primary hover:bg-bg-card transition-colors"
            aria-label={isMobileOpen ? t('actions.closeMenu') : t('actions.openMenu')}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu — only mounted on mobile ── */}
      {isMobile && (
        <MobileMenu
          isOpen={isMobileOpen}
          onClose={() => setMenuOpenForPath(null)}
          t={t}
          checkIsActive={checkIsActive}
        />
      )}
    </header>
  );
}
