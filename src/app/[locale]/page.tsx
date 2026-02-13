import { Hero } from '@/components/sections/Hero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactCta } from '@/components/sections/ContactCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ProcessSection />
      <ContactCta />
    </>
  );
}
