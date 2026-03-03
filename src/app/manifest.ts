import type { MetadataRoute } from 'next';

/**
 * Generates /manifest.webmanifest via Next.js Metadata API.
 *
 * Enables:
 * - "Add to Home Screen" on mobile browsers
 * - Branded browser chrome (theme color, background color)
 * - Standalone display mode when installed
 *
 * Icons: add actual icon files to /public/icons/ and uncomment the
 * icons array below. Minimum recommended set:
 *   192×192 PNG — Android home screen
 *   512×512 PNG — Android splash screen
 *   180×180 PNG — Apple touch icon (referenced in layout <head> separately)
 *
 * Generate icons from a single SVG source using:
 *   https://realfavicongenerator.net
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sebastian Ballen — Full-Stack Developer & Cloud Engineer',
    short_name: 'Sebastian Ballen',
    description:
      'Full-Stack Software Developer and Google Cloud Associate Cloud Engineer based in Bogotá, Colombia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071430',
    theme_color: '#0091b2',
    orientation: 'portrait',
    // icons: [
    //   {
    //     src: '/icons/icon-192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //     purpose: 'maskable',
    //   },
    //   {
    //     src: '/icons/icon-512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //     purpose: 'any',
    //   },
    // ],
  };
}
