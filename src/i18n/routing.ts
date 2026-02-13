import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, usePathname, useRouter, getPathName } = createNavigation(routing);
