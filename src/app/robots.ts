import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bccloudsolutions.dev';

/**
 * Generates /robots.txt via Next.js Metadata API.
 *
 * Rules:
 * - All crawlers allowed on all public pages.
 * - _next/static and _next/image are internal Next.js paths — no SEO value,
 *   disallow to save crawl budget.
 * - API routes disallowed — no indexable content there.
 * - Sitemap declared so crawlers can discover all pages immediately.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/_next/image/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
