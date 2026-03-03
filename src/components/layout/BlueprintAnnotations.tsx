'use client';

import { useState, useEffect } from 'react';

interface AnnotationData {
  text: string;
  x: string;
  y: string;
  delay: number;
}

const ANNOTATIONS: AnnotationData[] = [
  { text: 'Layout.tsx', x: '8%', y: '22%', delay: 1.2 },
  { text: 'Responsive', x: '78%', y: '15%', delay: 1.6 },
  { text: 'API Routes', x: '85%', y: '58%', delay: 2.0 },
  { text: 'SSR', x: '5%', y: '68%', delay: 2.4 },
  { text: 'TypeScript', x: '72%', y: '80%', delay: 1.8 },
];

function Annotation({ text, x, y, delay }: AnnotationData) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute hidden lg:flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        color: 'var(--color-accent-cyan)',
        opacity: visible ? 0.2 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{
          border: '1px solid currentColor',
          opacity: 0.6,
        }}
      />
      {text}
    </div>
  );
}

export function BlueprintAnnotations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-1" aria-hidden="true">
      {ANNOTATIONS.map((annotation) => (
        <Annotation key={annotation.text} {...annotation} />
      ))}
    </div>
  );
}
