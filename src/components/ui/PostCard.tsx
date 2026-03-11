'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_ACCENT, CATEGORY_VARIANT } from '@/types/blog';
import type { PostMeta } from '@/sanity/queries';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
  /** 0-based index used to render the post number on list rows */
  index?: number;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function categoryLabel(category: PostMeta['category']): string {
  switch (category) {
    case 'fundamentals':
      return 'Engineering Fundamentals';
    case 'languages':
      return 'Languages & Runtimes';
    case 'craft':
      return 'The Craft';
    case 'books':
      return 'Books';
  }
}

function FeaturedCard({ post }: { post: PostMeta }) {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_ACCENT[post.category];
  const variant = CATEGORY_VARIANT[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          background: 'var(--color-bg-card)',
          border: `1px solid ${
            hovered ? `color-mix(in srgb, ${accent} 28%, transparent)` : 'var(--color-stroke)'
          }`,
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 28px 60px color-mix(in srgb, ${accent} 10%, transparent)`
            : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: accent }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="absolute -right-24 top-0 bottom-0 w-96 pointer-events-none"
          style={{
            background: hovered
              ? `radial-gradient(ellipse at right center, color-mix(in srgb, ${accent} 8%, transparent), transparent 65%)`
              : 'none',
            transition: 'background 0.4s ease',
          }}
          aria-hidden="true"
        />

        <div className="relative p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant={variant}>{categoryLabel(post.category)}</Badge>
              <span
                className="text-xs"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-code)',
                }}
              >
                {post.readingTime} min read
              </span>
              <span
                className="text-xs"
                aria-hidden="true"
                style={{ color: 'var(--color-stroke-active)' }}
              >
                ·
              </span>
              <span
                className="text-xs"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-code)',
                }}
              >
                {formatDate(post.date)}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display font-bold leading-snug mb-4 transition-colors duration-200"
              style={{
                fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)',
                color: hovered ? accent : 'var(--color-text-primary)',
              }}
            >
              {post.title}
            </h2>

            {/* Description */}
            <p
              className="text-sm md:text-base leading-relaxed mb-6 max-w-xl"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {post.description}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: `color-mix(in srgb, ${accent} 7%, transparent)`,
                      color: 'var(--color-text-muted)',
                      border: `1px solid color-mix(in srgb, ${accent} 14%, transparent)`,
                      fontFamily: 'var(--font-code)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Arrow CTA — hidden on mobile */}
          <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: `color-mix(in srgb, ${accent} ${hovered ? 18 : 8}%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accent} ${hovered ? 35 : 18}%, transparent)`,
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                color: accent,
              }}
            >
              <ArrowRight size={16} strokeWidth={2} />
            </div>
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-code)',
              }}
            >
              Read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ListRowCard({ post, index = 0 }: { post: PostMeta; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_ACCENT[post.category];
  const variant = CATEGORY_VARIANT[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative grid transition-all duration-250"
        style={{
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '1.2rem 1.4rem',
          borderRadius: 10,
          background: hovered
            ? `color-mix(in srgb, ${accent} 4%, var(--color-bg-card))`
            : 'var(--color-bg-card)',
          border: `1px solid ${
            hovered ? `color-mix(in srgb, ${accent} 20%, transparent)` : 'var(--color-stroke)'
          }`,
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          boxShadow: hovered ? `0 8px 28px color-mix(in srgb, ${accent} 7%, transparent)` : 'none',
        }}
      >
        {/* ── Left: index + accent thread + dot ── */}
        <div className="flex flex-col items-center shrink-0" style={{ gap: 5, width: 28 }}>
          <span
            style={{
              fontSize: '0.6rem',
              fontFamily: 'var(--font-code)',
              fontWeight: 700,
              color: `color-mix(in srgb, ${accent} 55%, transparent)`,
              letterSpacing: '0.04em',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            style={{
              width: 1,
              flexGrow: 1,
              minHeight: 16,
              background: `color-mix(in srgb, ${accent} 18%, transparent)`,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: accent,
              flexShrink: 0,
            }}
          />
        </div>

        {/* ── Center: content ── */}
        <div style={{ minWidth: 0 }}>
          {/* Meta: category badge + date + reading time */}
          <div className="flex flex-wrap items-center gap-2 mb-2" style={{ rowGap: 4 }}>
            <Badge variant={variant}>{categoryLabel(post.category)}</Badge>
            <span
              className="text-[11px]"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-code)',
              }}
            >
              {formatDate(post.date)}
            </span>
            <span
              className="text-[11px]"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-code)',
              }}
            >
              · {post.readingTime} min
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold leading-snug mb-1.5 transition-colors duration-200"
            style={{
              fontSize: '1.05rem',
              color: hovered ? accent : 'var(--color-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-2.5"
            style={
              {
                color: 'var(--color-text-muted)',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              } as React.CSSProperties
            }
          >
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{
                    background: 'color-mix(in srgb, var(--color-text-muted) 6%, transparent)',
                    color: 'var(--color-text-muted)',
                    border:
                      '1px solid color-mix(in srgb, var(--color-text-muted) 10%, transparent)',
                    fontFamily: 'var(--font-code)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: arrow ── */}
        <div
          className="shrink-0 transition-all duration-200"
          style={{
            opacity: hovered ? 1 : 0.25,
            transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            color: accent,
          }}
        >
          <ArrowRight size={14} strokeWidth={2.2} />
        </div>
      </article>
    </Link>
  );
}

export function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  if (featured) return <FeaturedCard post={post} />;
  return <ListRowCard post={post} index={index} />;
}
