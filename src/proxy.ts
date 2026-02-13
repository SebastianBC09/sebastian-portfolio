import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  /*
   * Match all pathnames except:
   * - /api, /trpc (API routes)
   * - /_next, /_vercel (framework internals)
   * - /images, /fonts, /files (public static assets)
   * - Files with extensions (e.g. favicon.ico, robots.txt)
   */
  matcher: '/((?!api|trpc|_next|_vercel|images|fonts|files|.*\\..*).*)',
};
