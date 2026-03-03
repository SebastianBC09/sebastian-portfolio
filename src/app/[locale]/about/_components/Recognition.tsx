'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { RECOGNITION_ITEMS } from '@/content/about';

/* Badge variant map for recognition tags */
const TAG_VARIANTS: Record<string, 'cyan' | 'coral' | 'lime' | 'amber' | 'default'> = {
  Arduino: 'lime',
  Java: 'amber',
  IoT: 'cyan',
  Sensors: 'default',
  GCP: 'amber',
  'Compute Engine': 'cyan',
  'Cloud Storage': 'cyan',
  IAM: 'default',
};

export function Recognition() {
  const t = useTranslations('about.recognition');

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('heading')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RECOGNITION_ITEMS.map((item, i) => {
            const itemT = t.raw(`items.${item.key}`) as {
              title: string;
              org: string;
              description: string;
            };

            return (
              <Reveal key={item.key} delay={i * 0.12}>
                <Card hover padding="none" className="relative pl-6 pr-5 py-5 h-full flex flex-col">
                  {/* Accent bar */}
                  <Card.AccentBar color={item.accent} inset="14px" />

                  {/* Header */}
                  <Card.Header
                    title={itemT.title}
                    subtitle={itemT.org}
                    subtitleColor={item.accent}
                    trailing={
                      item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${itemT.title}`}
                          className="transition-opacity opacity-30 hover:opacity-100"
                          style={{ color: item.accent }}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )
                    }
                  />

                  {/* Description */}
                  <Card.Body className="mb-4">{itemT.description}</Card.Body>

                  {/* Tags */}
                  <Card.Footer className="mt-auto">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant={TAG_VARIANTS[tag] ?? 'default'}>
                        {tag}
                      </Badge>
                    ))}
                  </Card.Footer>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
