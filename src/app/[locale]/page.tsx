import { Hero } from '@/app/[locale]/_components/Hero';
import { FeaturedProjects } from '@/app/[locale]/_components/FeaturedProjects';
import { ProcessSection } from '@/app/[locale]/_components/ProcessSection';
import { ContactCta } from '@/app/[locale]/_components/ContactCta';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ProcessSection />
      <ContactCta />
    </>
  );
}
