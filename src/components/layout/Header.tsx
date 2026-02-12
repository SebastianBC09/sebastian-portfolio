'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-(--bg-primary)/90 backdrop-blur-xl border-b border-(--stroke)'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-280 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg border border-(--accent-cyan)/30 bg-(--bg-card) flex items-center justify-center">
            <span className="font-bold text-base text-(--text-primary)">SB</span>
          </div>
          <span className="font-semibold text-sm text-(--text-primary)">
            bccloudsolutions<span className="text-(--text-muted) font-normal">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="https://github.com/SebastianBC09"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-(--stroke) text-sm font-medium text-(--text-primary) hover:bg-(--bg-card) transition-all"
          >
            GitHub ↗
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg border border-(--stroke) text-(--text-primary) cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-3 bg-(--bg-primary)/95 backdrop-blur-xl border-b border-(--stroke)">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base text-(--text-muted) hover:text-(--text-primary) py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/SebastianBC09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-(--text-muted) py-2"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}
