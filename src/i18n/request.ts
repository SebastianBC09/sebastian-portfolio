import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: {
      layout: (await import(`../../messages/${locale}/layout.json`)).default,
      home: (await import(`../../messages/${locale}/home.json`)).default,
      about: (await import(`../../messages/${locale}/about.json`)).default,
      skills: (await import(`../../messages/${locale}/skills.json`)).default,
      contact: (await import(`../../messages/${locale}/contact.json`)).default,
    },
  };
});
