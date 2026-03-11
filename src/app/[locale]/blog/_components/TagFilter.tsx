import { useTranslations } from 'next-intl';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  const t = useTranslations('blog.grid');

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {/* All pill */}
      <button
        onClick={() => onTagChange(null)}
        className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
        style={{
          fontFamily: 'var(--font-code)',
          fontWeight: 600,
          background:
            activeTag === null
              ? 'color-mix(in srgb, var(--color-accent-cyan) 18%, transparent)'
              : 'color-mix(in srgb, var(--color-accent-cyan) 5%, transparent)',
          color: activeTag === null ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
          borderColor:
            activeTag === null
              ? 'color-mix(in srgb, var(--color-accent-cyan) 35%, transparent)'
              : 'color-mix(in srgb, var(--color-text-muted) 12%, transparent)',
        }}
      >
        {t('filterAll')}
      </button>

      {/* Tag pills */}
      {tags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onTagChange(isActive ? null : tag)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
            style={{
              fontFamily: 'var(--font-code)',
              fontWeight: 600,
              background: isActive
                ? 'color-mix(in srgb, var(--color-accent-cyan) 18%, transparent)'
                : 'color-mix(in srgb, var(--color-accent-cyan) 5%, transparent)',
              color: isActive ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
              borderColor: isActive
                ? 'color-mix(in srgb, var(--color-accent-cyan) 35%, transparent)'
                : 'color-mix(in srgb, var(--color-text-muted) 12%, transparent)',
            }}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
