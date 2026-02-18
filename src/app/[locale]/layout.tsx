import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google';

import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { BlueprintAnnotations } from '@/components/sections/BlueprintAnnotations';
import { BlueprintGrid } from '@/components/layout/BlueprintGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout.metadata' });

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | Sebastian Ballen`,
    },
    description: t('siteDescription'),
    metadataBase: new URL('https://bccloudsolutions.dev'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: `https://bccloudsolutions.dev/${locale}`,
      siteName: 'Sebastian Ballen',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// export const metadata: Metadata = {
//   title: {
//     default: 'Sebastian Ballen — Software Engineer & Experience Architect',
//     template: '%s | Sebastian Ballen',
//   },
//   description:
//     'Full-Stack Software Developer and Google Cloud Associate Cloud Engineer. I design with precision and bring ideas to life with polished interfaces.',
//   metadataBase: new URL('https://bccloudsolutions.dev'),
// };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-bg-primary text-text-primary font-body antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <BlueprintGrid />
            <BlueprintAnnotations />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
