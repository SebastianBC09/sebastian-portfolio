'use client';

import { motion } from 'framer-motion';

interface HeroVisualProps {
  label: string;
}

export function HeroVisual({ label }: HeroVisualProps) {
  return (
    <div
      className="relative w-full max-w-105 mx-auto"
      style={{ aspectRatio: '4 / 3' }}
      aria-hidden="true"
    >
      {/* ── Wireframe card ── */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--stroke-grid)',
          background: 'var(--bg-card)',
        }}
      >
        {/* Inner blueprint grid */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="hero-visual-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="var(--stroke-grid)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-visual-grid)" />
        </svg>

        {/* Wireframe content — fades out */}
        <motion.div
          className="relative p-5 h-full flex flex-col gap-2.5"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Wireframe header */}
          <div className="flex justify-between items-center">
            <div
              className="w-7 h-7 rounded"
              style={{
                border: '1px solid var(--stroke-grid)',
                background: 'var(--bg-card)',
              }}
            />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-9 h-1.5 rounded-full"
                  style={{ background: 'var(--stroke-grid)' }}
                />
              ))}
            </div>
          </div>

          {/* Wireframe text lines */}
          <div className="flex-1 flex flex-col gap-2 mt-3">
            <div
              className="h-2 w-3/4 rounded-full"
              style={{ background: 'color-mix(in srgb, var(--text-muted) 20%, transparent)' }}
            />
            <div
              className="h-2 w-1/2 rounded-full"
              style={{ background: 'color-mix(in srgb, var(--text-muted) 16%, transparent)' }}
            />
            <div
              className="h-1.5 w-3/5 rounded-full mt-1"
              style={{ background: 'color-mix(in srgb, var(--text-muted) 12%, transparent)' }}
            />
          </div>

          {/* Wireframe cards */}
          <div className="flex gap-2.5 mt-auto">
            <div
              className="flex-1 h-14 rounded-lg"
              style={{
                border: '1px solid var(--stroke-grid)',
                background: 'var(--bg-card)',
              }}
            />
            <div
              className="flex-1 h-14 rounded-lg"
              style={{
                border: '1px solid var(--stroke-grid)',
                background: 'var(--bg-card)',
              }}
            />
          </div>
        </motion.div>

        {/* Blueprint label */}
        <motion.div
          className="absolute top-2 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--bg-card)',
            border: '1px solid var(--stroke-grid)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Blueprint
        </motion.div>
      </div>

      {/* ── Finished product overlay ── */}
      <motion.div
        className="absolute -bottom-3 -right-3 rounded-xl overflow-hidden"
        style={{
          width: '68%',
          height: '52%',
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-coral))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--stroke-grid)',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="p-3.5 h-full flex flex-col justify-between">
          {/* Window dots */}
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
            ))}
          </div>

          {/* Content lines */}
          <div className="flex flex-col gap-1.5">
            <div
              className="h-1.75 w-3/4 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.4)' }}
            />
            <div
              className="h-1.25 w-1/2 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.25)' }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <div
              className="w-13 h-5 rounded-[5px]"
              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
            />
            <div
              className="w-13 h-5 rounded-[5px]"
              style={{ background: 'rgba(255, 255, 255, 0.15)' }}
            />
          </div>
        </div>

        {/* Live product label */}
        <motion.div
          className="absolute top-1.5 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-medium"
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          Live Product
        </motion.div>
      </motion.div>

      {/* ── Accent dot ── */}
      <motion.div
        className="absolute -top-2 -right-2 w-4.5 h-4.5 rounded-full blur-[1px]"
        style={{ background: 'var(--accent-lime)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
      />
    </div>
  );
}
