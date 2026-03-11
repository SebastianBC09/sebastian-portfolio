'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Link2, Linkedin, Twitter } from 'lucide-react';
import { CATEGORY_ACCENT } from '@/types/blog';
import type { PostMeta } from '@/sanity/queries';

interface PostFooterProps {
  post: PostMeta;
  locale: string;
}

export function PostFooter({ post, locale }: PostFooterProps) {
  const [copied, setCopied] = useState(false);
  const accent = CATEGORY_ACCENT[post.category];
  const url = `https://bccloudsolutions.dev/${locale}/blog/${post.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <footer className="mt-16 max-w-5xl mx-auto px-6 pb-24">
      <div
        className="rounded-2xl p-8 mb-10"
        style={{
          background: `color-mix(in srgb, ${accent} 4%, var(--color-bg-card))`,
          border: `1px solid color-mix(in srgb, ${accent} 15%, transparent)`,
        }}
      >
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-1"
          style={{
            color: accent,
            fontFamily: 'var(--font-jetbrains-mono)',
          }}
        >
          Found this useful?
        </p>
        <p
          className="text-lg font-display font-semibold mb-6"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Share it with someone who&apos;d appreciate it.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.02]"
            style={{
              color: 'var(--color-text-secondary)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-stroke)',
            }}
          >
            <Twitter size={14} strokeWidth={1.75} />
            Share on X
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.02]"
            style={{
              color: 'var(--color-text-secondary)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-stroke)',
            }}
          >
            <Linkedin size={14} strokeWidth={1.75} />
            Share on LinkedIn
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.02]"
            style={{
              color: copied ? accent : 'var(--color-text-secondary)',
              background: copied
                ? `color-mix(in srgb, ${accent} 8%, transparent)`
                : 'var(--color-bg-card)',
              border: `1px solid ${
                copied ? `color-mix(in srgb, ${accent} 25%, transparent)` : 'var(--color-stroke)'
              }`,
            }}
          >
            <Link2 size={14} strokeWidth={1.75} />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
      <div
        className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ borderTop: '1px solid var(--color-stroke)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs"
            style={{
              background: 'color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)',
              border: '1.5px solid color-mix(in srgb, var(--color-accent-cyan) 25%, transparent)',
              color: 'var(--color-accent-cyan)',
            }}
          >
            SB
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Sebastian Ballen
            </span>
            <span
              className="text-[11px]"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              Full-Stack Dev · GCP ACE ·{' '}
              <Link
                href={`/${locale}/about`}
                className="transition-colors duration-200"
                style={{ color: 'var(--color-accent-cyan)' }}
              >
                About me →
              </Link>
            </span>
          </div>
        </div>
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-[1.02] self-start sm:self-auto"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${accent} 7%, transparent)`,
          }}
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>
    </footer>
  );
}
