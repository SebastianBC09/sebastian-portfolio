import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/queries';

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={value._key}
        className="font-display font-bold mt-14 mb-4 scroll-mt-24"
        style={{
          fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.015em',
          lineHeight: '1.25',
        }}
      >
        {children}
      </h2>
    ),

    h3: ({ children, value }) => (
      <h3
        id={value._key}
        className="font-display font-semibold mt-10 mb-3 scroll-mt-24"
        style={{
          fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
          lineHeight: '1.3',
        }}
      >
        {children}
      </h3>
    ),

    normal: ({ children }) => (
      <p
        className="mb-6"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.0625rem', // 17px — slightly larger than base for comfort
          lineHeight: '1.85',
        }}
      >
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-6 py-4 rounded-r-lg"
        style={{
          borderLeft: '3px solid var(--color-accent-cyan)',
          background: 'color-mix(in srgb, var(--color-accent-cyan) 4%, transparent)',
          color: 'var(--color-text-secondary)',
          fontSize: '1.0625rem',
          lineHeight: '1.8',
          fontStyle: 'italic',
        }}
      >
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul
        className="mb-6 ml-2 space-y-2.5"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.0625rem',
          lineHeight: '1.8',
          listStyleType: 'none',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="mb-6 ml-2 space-y-2.5 list-decimal list-inside"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.0625rem',
          lineHeight: '1.8',
        }}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        {/* Accent dot instead of bullet */}
        <span
          className="mt-[0.6em] w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: 'var(--color-accent-cyan)' }}
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  },

  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(900).auto('format').url();
      if (!imageUrl) return null;
      return (
        <figure className="my-10 -mx-4 sm:mx-0">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ border: '1px solid var(--color-stroke)' }}
          >
            <Image
              src={imageUrl}
              alt={value.alt ?? ''}
              width={900}
              height={506}
              className="w-full h-auto"
              style={{ display: 'block' }}
            />
          </div>
          {value.caption && (
            <figcaption
              className="mt-3 text-center text-sm"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }) => (
      <div
        className="my-8 rounded-xl overflow-hidden"
        style={{
          border: '1px solid color-mix(in srgb, var(--color-accent-cyan) 18%, transparent)',
          background: 'color-mix(in srgb, var(--color-accent-cyan) 4%, var(--color-bg-card))',
        }}
      >
        {/* File name bar */}
        {value.filename && (
          <div
            className="flex items-center gap-2 px-5 py-2.5"
            style={{
              borderBottom:
                '1px solid color-mix(in srgb, var(--color-accent-cyan) 18%, transparent)',
              background: 'color-mix(in srgb, var(--color-accent-cyan) 6%, transparent)',
            }}
          >
            {/* Three dots */}
            <div className="flex gap-1.5">
              {['coral', 'amber', 'lime'].map((c) => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: `var(--color-accent-${c})`, opacity: 0.5 }}
                />
              ))}
            </div>
            <span
              className="text-xs ml-2"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {value.filename}
            </span>
          </div>
        )}

        {/* Language tag when no filename */}
        {!value.filename && value.language && (
          <div
            className="flex items-center justify-end px-5 py-2"
            style={{
              borderBottom:
                '1px solid color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)',
            }}
          >
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{
                color: 'var(--color-accent-cyan)',
                fontFamily: 'var(--font-jetbrains-mono)',
                opacity: 0.7,
              }}
            >
              {value.language}
            </span>
          </div>
        )}

        <pre
          className="p-5 overflow-x-auto text-sm leading-relaxed"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },

  marks: {
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded text-[0.875em]"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-cyan) 9%, transparent)',
          color: 'var(--color-accent-cyan)',
          fontFamily: 'var(--font-jetbrains-mono)',
          border: '1px solid color-mix(in srgb, var(--color-accent-cyan) 15%, transparent)',
        }}
      >
        {children}
      </code>
    ),

    link: ({ value, children }) => (
      <a
        href={value?.href ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-3 decoration-1 transition-colors duration-200"
        style={{
          color: 'var(--color-accent-cyan)',
          textDecorationColor: 'color-mix(in srgb, var(--color-accent-cyan) 40%, transparent)',
        }}
      >
        {children}
      </a>
    ),

    strong: ({ children }) => (
      <strong
        style={{
          color: 'var(--color-text-primary)',
          fontWeight: 600,
        }}
      >
        {children}
      </strong>
    ),

    em: ({ children }) => <em style={{ color: 'var(--color-text-secondary)' }}>{children}</em>,
  },
};
