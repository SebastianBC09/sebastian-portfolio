import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { UnderConstruction } from '@/components/ui/UnderConstruction';

export default function Home() {
  return (
    <section className="relative z-10 pt-28">
      <UnderConstruction className="mx-auto mt-6 max-w-2xl" />
      <div className="mx-auto max-w-280 px-6 py-20">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-(--bg-card) border border-(--stroke) mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent-lime) animate-pulse" />
          <span className="font-mono text-[11px] text-(--text-muted)">
            Available for new opportunities
          </span>
        </div>

        {/* Hero heading */}
        <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-5">
          Software Engineer <span className="text-(--accent-coral)">&</span>
          <br />
          Experience{' '}
          <span className="bg-linear-to-r from-(--accent-cyan) to-(--accent-lime) bg-clip-text text-transparent">
            Architect
          </span>
        </h1>

        <p className="text-base md:text-lg text-(--text-muted) max-w-125 leading-relaxed mb-8">
          I design with an architect&apos;s precision and bring ideas to life with polished
          interfaces. Specializing in scalable systems, design engineering, and cloud architecture.
        </p>

        {/* CTAs using ui/ components */}
        <div className="flex gap-3.5 flex-wrap mb-12">
          <Button variant="primary" size="lg">
            View projects →
          </Button>
          <Button variant="secondary" size="lg">
            Let&apos;s talk
          </Button>
        </div>

        {/* Badge demo — shows component library works */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="cyan">React</Badge>
          <Badge variant="coral">TypeScript</Badge>
          <Badge variant="lime">Next.js</Badge>
          <Badge variant="amber">GCP</Badge>
        </div>
      </div>
    </section>
  );
}
