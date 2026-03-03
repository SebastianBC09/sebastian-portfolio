import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bccloudsolutions.dev';
const LOCALES = ['en', 'es'] as const;

/**
 * Static page definitions.
 *
 * priority    — relative importance to search engines (0.0–1.0)
 * changeFreq  — how often content is likely to change
 *
 * Blog and Projects are not listed yet — they will be added dynamically
 * once those pages ship (Sprint 3 and 4). At that point, fetch slugs from
 * the content layer and map them here.
 */
const STATIC_PAGES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/skills', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  // { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },  ← uncomment in Sprint 4
  // { path: '/blog',     priority: 0.9, changeFrequency: 'weekly' },  ← uncomment in Sprint 3
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])),
        },
      });
    }
  }

  return entries;
}
