import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

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
