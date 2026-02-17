'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LOCALES = ['en', 'es'] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSwitch(target: string) {
    if (target === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: target });
    });
  }

  return (
    <div
      className={cn(
        'flex gap-0.5 p-0.5 rounded-md border border-(--stroke)',
        isPending && 'opacity-50 pointer-events-none'
      )}
      role="radiogroup"
      aria-label="Language"
    >
      {LOCALES.map((l) => {
        const isActive = locale === l;

        return (
          <button
            key={l}
            onClick={() => handleSwitch(l)}
            role="radio"
            aria-checked={isActive}
            className={cn(
              'px-2 py-1 rounded-sm text-[11px] font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer',
              isActive
                ? 'bg-(--accent-cyan)/15 text-(--accent-cyan)'
                : 'text-(--text-muted) hover:text-(--text-primary)'
            )}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
