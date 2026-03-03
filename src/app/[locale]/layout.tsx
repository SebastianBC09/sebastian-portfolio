import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google';

import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { BlueprintAnnotations } from '@/components/layout/BlueprintAnnotations';
import { BlueprintGrid } from '@/components/layout/BlueprintGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'optional',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'optional',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'optional',
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
      canonical: `https://bccloudsolutions.dev/${locale}`,
      languages: {
        en: 'https://bccloudsolutions.dev/en',
        es: 'https://bccloudsolutions.dev/es',
        'x-default': 'https://bccloudsolutions.dev/en',
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: `https://bccloudsolutions.dev/${locale}`,
      siteName: 'Sebastian Ballen',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: t('siteTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: ['/opengraph-image'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Juan Sebastian Ballen Castañeda',
  alternateName: 'Sebastian Ballen',
  jobTitle: 'Full-Stack Software Developer',
  description:
    'Full-Stack Software Developer and Google Cloud Associate Cloud Engineer based in Bogotá, Colombia.',
  url: 'https://bccloudsolutions.dev',
  image: 'https://bccloudsolutions.dev/opengraph-image',
  sameAs: [
    'https://github.com/SebastianBC09',
    'https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Google Cloud Platform',
    'Docker',
    'Full-Stack Development',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressCountry: 'CO',
  },
};

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
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
