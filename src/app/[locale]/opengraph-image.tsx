import { ImageResponse } from 'next/og';

/**
 * Dynamic OG image — served at /[locale]/opengraph-image
 * Auto-picked up by Next.js and referenced in the generated <meta og:image> tag.
 *
 * Rendered via Next.js Edge runtime (no Node.js APIs, no file system access).
 * Size: 1200×630 — standard OG image dimensions for Twitter, LinkedIn, Slack, etc.
 *
 * Design: matches the portfolio's dark blueprint aesthetic —
 *   - Deep navy background (#071430)
 *   - Blueprint grid lines at low opacity
 *   - Cyan accent (#00d4ff) for the name and domain
 *   - Muted secondary text for the title/role
 *
 * To add a profile photo: fetch it as ArrayBuffer and pass as <img src={...} />
 * using the base64 data URI pattern. Keep it under 500KB for edge runtime limits.
 */

export const runtime = 'edge';
export const alt = 'Sebastian Ballen — Full-Stack Developer & Cloud Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '80px 96px',
        backgroundColor: '#071430',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blueprint grid — horizontal lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={`h-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${(i + 1) * 35}px`,
            height: '1px',
            backgroundColor: 'rgba(130, 170, 255, 0.04)',
          }}
        />
      ))}
      {/* Blueprint grid — vertical lines */}
      {Array.from({ length: 34 }).map((_, i) => (
        <div
          key={`v-${i}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${(i + 1) * 35}px`,
            width: '1px',
            backgroundColor: 'rgba(130, 170, 255, 0.04)',
          }}
        />
      ))}

      {/* Accent glow — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-80px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* SB monogram */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          border: '1.5px solid rgba(0,212,255,0.3)',
          backgroundColor: 'rgba(0,212,255,0.08)',
          marginBottom: '40px',
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: '700',
          color: '#00d4ff',
          letterSpacing: '0.05em',
        }}
      >
        SB
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: '64px',
          fontWeight: '700',
          color: '#e6eef3',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}
      >
        Sebastian Ballen
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: '28px',
          fontWeight: '400',
          color: '#8b9db6',
          marginBottom: '48px',
          letterSpacing: '0.01em',
        }}
      >
        Full-Stack Developer · Google Cloud Engineer
      </div>

      {/* Divider */}
      <div
        style={{
          width: '64px',
          height: '2px',
          backgroundColor: '#00d4ff',
          opacity: 0.6,
          marginBottom: '32px',
        }}
      />

      {/* Domain */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: '500',
          color: '#00d4ff',
          opacity: 0.7,
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
        }}
      >
        bccloudsolutions.dev
      </div>

      {/* Blueprint annotation — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '64px',
          fontSize: '13px',
          fontFamily: 'monospace',
          color: '#00d4ff',
          opacity: 0.2,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {'/* blueprints coming to life */'}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
