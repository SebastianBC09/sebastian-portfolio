/**
 * SVG Blueprint Grid Background
 *
 * Replaces the CSS linear-gradient `.blueprint-grid` class with an SVG pattern
 * that renders a cleaner, more authentic technical-drawing grid.
 *
 * Usage: rendered once in the root layout as a fixed full-screen background.
 */
export function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Light mode grid */}
      <svg className="absolute inset-0 w-full h-full dark:hidden" aria-hidden="true">
        <defs>
          <pattern id="bp-grid-light" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(15, 23, 41, 0.07)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-light)" />
      </svg>

      {/* Dark mode grid */}
      <svg className="absolute inset-0 w-full h-full hidden dark:block" aria-hidden="true">
        <defs>
          <pattern id="bp-grid-dark" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-dark)" />
      </svg>

      {/* Ambient glow — top right (cyan) */}
      <div
        className="absolute -top-30 -right-30 w-125 h-125 rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: 'var(--color-accent-cyan)' }}
      />

      {/* Ambient glow — bottom left (coral) */}
      <div
        className="absolute -bottom-20 -left-25 w-100 h-100 rounded-full opacity-[0.03] blur-[100px]"
        style={{ background: 'var(--color-accent-coral)' }}
      />
    </div>
  );
}
