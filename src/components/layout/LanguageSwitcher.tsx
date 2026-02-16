'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('layout.languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === 'en' ? 'es' : 'en';

  function handleSwitch() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-md border border-(--stroke-grid) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--stroke-grid-hover) hover:bg-(--bg-card) transition-colors uppercase tracking-wider disabled:opacity-50"
      aria-label={t('switchTo')}
      title={t('switchTo')}
    >
      {isPending ? '...' : targetLocale}
    </button>
  );
}
