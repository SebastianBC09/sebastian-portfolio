export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper',
  github: 'https://github.com/SebastianBC09',
} as const;

export const AVAILABILITY = {
  open: true,
} as const;

export interface SocialCardConfig {
  id: string;
  i18nKey: string;
  accent: string;
  monogram: string;
  annotation: string;
  href: string;
}

export const SOCIAL_CARDS: Omit<SocialCardConfig, 'href'>[] = [
  {
    id: 'linkedin',
    i18nKey: 'linkedin',
    accent: 'var(--color-accent-amber)',
    monogram: 'in',
    annotation: '/* professional */',
  },
  {
    id: 'github',
    i18nKey: 'github',
    accent: 'var(--color-accent-lime)',
    monogram: 'gh',
    annotation: '/* open source */',
  },
  {
    id: 'whatsapp',
    i18nKey: 'whatsapp',
    accent: 'var(--color-accent-whatsapp)',
    monogram: 'wa',
    annotation: '/* direct line */',
  },
] as const;
