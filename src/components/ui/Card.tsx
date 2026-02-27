import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const paddingStyles: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/* ═════════ Root Card ═════════ */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable lift + border highlight on hover. Default: true */
  hover?: boolean;
  /** Internal padding scale. Use 'none' when sub-components control their own spacing. Default: 'md' */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = true, padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-bg-card border border-stroke rounded-2xl transition-all duration-300 overflow-hidden',
          hover && 'hover:bg-bg-card-hover hover:border-stroke-active hover:-translate-y-1',
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardRoot.displayName = 'Card';

/* ═════════ Card.AccentBar ═════════ */
interface CardAccentBarProps {
  /** CSS color value or token e.g. 'var(--accent-cyan)' */
  color: string;
  /** Inset from top and bottom edges. Default: '16px' */
  inset?: string;
}

function CardAccentBar({ color, inset = '16px' }: CardAccentBarProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 w-0.5 rounded-full"
      style={{
        top: inset,
        bottom: inset,
        background: `linear-gradient(180deg, ${color}, transparent)`,
      }}
    />
  );
}

CardAccentBar.displayName = 'Card.AccentBar';

/* ═════════ Card.Thumbnail ═════════ */
interface CardThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function CardThumbnail({ children, className, ...props }: CardThumbnailProps) {
  return (
    <div
      className={cn(
        'h-40 rounded-lg mb-4 flex items-center justify-center',
        'bg-bg-primary/50 border border-stroke',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

CardThumbnail.displayName = 'Card.Thumbnail';

/* ═════════ Card.Header ═════════ */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  /** Accent color for subtitle text. Falls back to --accent-cyan */
  subtitleColor?: string;
  /** Trailing slot — period badge, status pill, etc. */
  trailing?: ReactNode;
}

function CardHeader({
  title,
  subtitle,
  subtitleColor,
  trailing,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-4', className)} {...props}>
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="font-display font-bold text-base text-text-primary leading-snug">{title}</h3>
        {subtitle && (
          <span
            className="text-sm font-medium"
            style={{ color: subtitleColor ?? 'var(--color-accent-cyan)' }}
          >
            {subtitle}
          </span>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

CardHeader.displayName = 'Card.Header';

/* ═════════ Card.Body ═════════ */
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div className={cn('flex-1 text-sm text-text-secondary leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

CardBody.displayName = 'Card.Body';

/* ═════════ Card.BulletList ═════════ */
interface CardBulletListProps {
  items: string[];
  /** Bullet dot color. Default: 'var(--accent-cyan)' */
  accentColor?: string;
  className?: string;
}

function CardBulletList({
  items,
  accentColor = 'var(--color-accent-cyan)',
  className,
}: CardBulletListProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div
            className="w-1 h-1 rounded-full mt-2 shrink-0"
            style={{ background: `color-mix(in srgb, ${accentColor} 60%, transparent)` }}
            aria-hidden="true"
          />
          <span className="text-sm text-text-muted leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

CardBulletList.displayName = 'Card.BulletList';

/* ═════════ Card.Footer ═════════ */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Show a subtle top border separator. Default: false */
  divided?: boolean;
}

function CardFooter({ children, divided = false, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 mt-4',
        divided && 'pt-4 border-t border-stroke',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

CardFooter.displayName = 'Card.Footer';

/* ═════════ Compose & export ═════════*/
export const Card = Object.assign(CardRoot, {
  AccentBar: CardAccentBar,
  Thumbnail: CardThumbnail,
  Header: CardHeader,
  Body: CardBody,
  BulletList: CardBulletList,
  Footer: CardFooter,
});
