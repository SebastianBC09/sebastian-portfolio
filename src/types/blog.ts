import type { PostCategory } from '@/sanity/queries';

export type { PostCategory };

export const CATEGORY_ACCENT: Record<PostCategory, string> = {
  fundamentals: 'var(--color-accent-coral)',
  languages: 'var(--color-accent-cyan)',
  craft: 'var(--color-accent-lime)',
  books: 'var(--color-accent-amber)',
};

export const CATEGORY_VARIANT: Record<PostCategory, 'coral' | 'cyan' | 'lime' | 'amber'> = {
  fundamentals: 'coral',
  languages: 'cyan',
  craft: 'lime',
  books: 'amber',
};
