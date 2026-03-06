export type ProjectStatus = 'complete' | 'in-progress' | 'locked';
export type ProjectContext = 'academic' | 'personal' | 'professional';

export interface Project {
  slug: string;
  featured: boolean;
  status: ProjectStatus;
  projectContext: ProjectContext;
  /** i18n label shown on card — e.g. "UNINPAHU University" */
  context: string;
  accent: string;
  accentBg: string;
  tags: string[];
  /** Short outcome labels shown on card — 3 max */
  highlights: string[];
  githubHref: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'agrotech',
    featured: true,
    status: 'complete',
    projectContext: 'academic',
    context: 'UNINPAHU University',
    accent: 'var(--color-accent-lime)',
    accentBg: 'color-mix(in srgb, var(--color-accent-lime) 7%, var(--color-bg-card))',
    tags: ['Java 21', 'JavaFX', 'Arduino', 'Maven'],
    highlights: ['University Recognition', 'Team Lead', 'IoT Integration'],
    githubHref: 'https://github.com/SebastianBC09/AgroTech2.0-App',
  },
  {
    slug: 'transmilenio-router',
    featured: true,
    status: 'in-progress',
    projectContext: 'personal',
    context: 'Personal Project',
    accent: 'var(--color-accent-cyan)',
    accentBg: 'color-mix(in srgb, var(--color-accent-cyan) 7%, var(--color-bg-card))',
    tags: ['Python', 'NetworkX', 'Dijkstra', 'NLP'],
    highlights: ['141 Stations', '6 vs 14 stops', 'v2 Live'],
    githubHref: 'https://github.com/SebastianBC09/transmilenio-router',
  },
  {
    slug: 'portfolio',
    featured: true,
    status: 'in-progress',
    projectContext: 'personal',
    context: 'Personal Project',
    accent: 'var(--color-accent-amber)',
    accentBg: 'color-mix(in srgb, var(--color-accent-amber) 7%, var(--color-bg-card))',
    tags: ['Next.js 15', 'TypeScript', 'Docker', 'DigitalOcean'],
    highlights: ['SSG + i18n', 'Blueprint Design', 'CI/CD'],
    githubHref: 'https://github.com/SebastianBC09/sebastian-portfolio',
  },
];
