'use client';

import { motion } from 'framer-motion';

interface HeroVisualProps {
  label: string;
}

export function HeroVisual({ label }: HeroVisualProps) {
  return (
    <div
      className="relative w-full aspect-4/3 rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-card)' }}
      aria-hidden="true"
    >
      {/* Inner blueprint grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="var(--stroke-grid)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Wireframe layer — fades out */}
      <motion.div
        className="absolute inset-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
      >
        {/* Header wireframe */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded border border-(--text-muted)/20" />
          <div className="h-2.5 w-20 rounded-full bg-(--text-muted)/15" />
          <div className="ml-auto flex gap-2">
            <div className="h-2 w-10 rounded-full bg-(--text-muted)/10" />
            <div className="h-2 w-10 rounded-full bg-(--text-muted)/10" />
            <div className="h-2 w-10 rounded-full bg-(--text-muted)/10" />
          </div>
        </div>

        {/* Content wireframe */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-3/4 rounded-full bg-(--text-muted)/12" />
          <div className="h-3 w-1/2 rounded-full bg-(--text-muted)/12" />
          <div className="h-2 w-5/6 rounded-full bg-(--text-muted)/8 mt-3" />
          <div className="h-2 w-2/3 rounded-full bg-(--text-muted)/8" />
        </div>

        {/* Card wireframes */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-16 rounded-md border border-(--text-muted)/15" />
          <div className="h-16 rounded-md border border-(--text-muted)/15" />
        </div>

        {/* Button wireframe */}
        <div className="mt-3 flex gap-2">
          <div className="h-7 w-20 rounded-md border border-(--text-muted)/15" />
          <div className="h-7 w-16 rounded-md border border-(--text-muted)/10" />
        </div>
      </motion.div>

      {/* Colorful "life" layer — fades in */}
      <motion.div
        className="absolute inset-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: 'easeInOut' }}
      >
        {/* Colored card elements */}
        <motion.div
          className="absolute right-0 bottom-12 w-28 h-14 rounded-lg shadow-lg"
          style={{ background: 'var(--accent-coral)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
        <motion.div
          className="absolute right-6 bottom-4 w-16 h-10 rounded-md shadow-md"
          style={{ background: 'var(--accent-amber)' }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        />
        <motion.div
          className="absolute right-24 bottom-0 w-10 h-10 rounded-full shadow-md"
          style={{ background: 'var(--accent-cyan)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, duration: 0.4, ease: 'backOut' }}
        />

        {/* Accent lines suggesting "life" */}
        <motion.div
          className="absolute right-2 bottom-28 flex flex-col gap-1.5"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--text-muted)' }} />
          <div className="h-1 w-8 rounded-full" style={{ background: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>

      {/* Label badge */}
      <motion.div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider uppercase"
        style={{
          background: 'var(--bg-card)',
          color: 'var(--accent-cyan)',
          border: '1px solid var(--stroke-grid)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
