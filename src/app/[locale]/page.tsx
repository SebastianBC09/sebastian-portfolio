import { Hero } from '@/components/sections/Hero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactCta } from '@/components/sections/ContactCta';
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
