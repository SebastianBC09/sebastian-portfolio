export type SkillTier = 'familiar' | 'proficient' | 'production';

export interface TierMeta {
  id: SkillTier;
  /**
   * Maps to i18n keys:
   *   skills.tiers.{id}.label
   *   skills.tiers.{id}.desc
   */
  accent: string;
}

export const SKILL_TIERS: TierMeta[] = [
  { id: 'familiar', accent: 'var(--color-text-muted)' },
  { id: 'proficient', accent: 'var(--color-accent-amber)' },
  { id: 'production', accent: 'var(--color-accent-cyan)' },
];

export type SkillContext = 'Arroyo' | 'Magneto' | 'Cafeto' | 'Personal' | 'Academic' | 'Certified';

export const CONTEXT_ACCENT: Record<SkillContext, string> = {
  Magneto: 'var(--color-accent-coral)',
  Arroyo: 'var(--color-accent-cyan)',
  Cafeto: 'var(--color-accent-coral)',
  Personal: 'var(--color-accent-lime)',
  Academic: 'var(--color-accent-amber)',
  Certified: 'var(--color-accent-lime)',
};

export interface Skill {
  name: string;
  tier: SkillTier;
  usedAt: SkillContext[];
  ghost: string;
}

export interface Foundation {
  name: string;
  usedAt: SkillContext[];
  ghost: string;
}

export const FOUNDATIONS: Foundation[] = [
  { name: 'HTML', ghost: '< >', usedAt: ['Arroyo', 'Magneto', 'Cafeto'] },
  { name: 'CSS', ghost: '{ }', usedAt: ['Arroyo', 'Magneto', 'Cafeto'] },
  { name: 'JavaScript', ghost: 'JS', usedAt: ['Arroyo', 'Magneto', 'Cafeto'] },
];

export type TechCategoryId = 'frontend' | 'backend' | 'cloud' | 'tools';

export interface TechCategory {
  id: TechCategoryId;
  icon: string;
  accent: string;
  skills: Skill[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    icon: '◈',
    accent: 'var(--color-accent-cyan)',
    skills: [
      // Familiar
      {
        name: 'GraphQL (client)',
        tier: 'familiar',
        usedAt: ['Personal'],
        ghost: '{ }',
        // { } = GraphQL's iconic query syntax — in their logo
      },
      // Proficient
      {
        name: 'Framer Motion',
        tier: 'proficient',
        usedAt: ['Personal'],
        ghost: '~',
        // ~ = easing curve — the visual soul of Framer Motion
      },
      {
        name: 'Styled Components',
        tier: 'proficient',
        usedAt: ['Arroyo'],
        ghost: '💅',
        // 💅 = literally in Styled Components' own README
      },
      // Production
      {
        name: 'SASS',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: 'SASS',
      },
      {
        name: 'Ant Design',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto'],
        ghost: 'ANT',
      },
      {
        name: 'Storybook',
        tier: 'production',
        usedAt: ['Magneto', 'Cafeto'],
        ghost: '◧',
        // ◧ = half-filled square: the component isolation panel
      },
      {
        name: 'React.js',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: '⚛',
        // ⚛ = React's official atom symbol
      },
      {
        name: 'Next.js',
        tier: 'production',
        usedAt: ['Magneto'],
        ghost: '▲',
        // ▲ = Vercel/Next.js's actual logomark
      },
      {
        name: 'TypeScript',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: 'TS',
      },
      {
        name: 'Redux / RTK Query',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto'],
        ghost: 'Rx',
        // Rx = reactive programming symbol Redux draws from
      },
      {
        name: 'Tailwind CSS',
        tier: 'production',
        usedAt: ['Personal'],
        ghost: 'TW',
      },
    ],
  },

  // ── Backend ────────────────────────────────────────────────────────────────
  {
    id: 'backend',
    icon: '◉',
    accent: 'var(--color-accent-coral)',
    skills: [
      // Familiar
      {
        name: 'DynamoDB',
        tier: 'familiar',
        usedAt: ['Personal', 'Academic'],
        ghost: '{DB}',
        // {DB} = document/JSON store — curly brace is its identity
      },
      {
        name: 'Java',
        tier: 'familiar',
        usedAt: ['Personal', 'Academic'],
        ghost: '☕',
      },
      {
        name: 'Spring Boot',
        tier: 'familiar',
        usedAt: ['Personal', 'Academic'],
        ghost: 'Spr',
      },
      {
        name: 'Django',
        tier: 'familiar',
        usedAt: ['Personal'],
        ghost: 'Dj',
        // Dj = Django's own shorthand in their changelogs
      },
      {
        name: 'MongoDB',
        tier: 'familiar',
        usedAt: ['Academic'],
        ghost: '[]',
        // [] = Mongo returns arrays of documents
      },
      // Proficient
      {
        name: 'Python',
        tier: 'proficient',
        usedAt: ['Personal', 'Academic'],
        ghost: 'Py',
        // Py = every import, extension, and CLI flag
      },
      // Production
      {
        name: 'PostgreSQL',
        tier: 'production',
        usedAt: ['Personal', 'Magneto'],
        ghost: 'PSQL',
        // PSQL = the actual CLI command every backend dev types
      },
      {
        name: 'Node.js',
        tier: 'production',
        usedAt: ['Magneto'],
        ghost: 'No',
      },
      {
        name: 'Express.js',
        tier: 'production',
        usedAt: ['Magneto'],
        ghost: 'Ex',
      },
      {
        name: 'SQL',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto'],
        ghost: 'SQL',
      },
      {
        name: 'REST APIs',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: 'GET',
        // GET = the HTTP verb every developer has typed thousands of times
      },
    ],
  },

  // ── Cloud & DevOps ─────────────────────────────────────────────────────────
  {
    id: 'cloud',
    icon: '⬡',
    accent: 'var(--color-accent-lime)',
    skills: [
      // Familiar
      {
        name: 'Cloud Run',
        tier: 'familiar',
        usedAt: ['Personal', 'Academic'],
        ghost: '↑',
        // ↑ = code running upward into the cloud
      },
      {
        name: 'AWS Lambda',
        tier: 'familiar',
        usedAt: ['Personal', 'Academic'],
        ghost: 'λ',
        // λ = AWS uses this in their own console icon
      },
      // Proficient
      {
        name: 'GitHub Actions',
        tier: 'proficient',
        usedAt: ['Personal'],
        ghost: '▶',
        // ▶ = the workflow trigger / run button
      },
      {
        name: 'Nginx',
        tier: 'proficient',
        usedAt: ['Personal'],
        ghost: 'N}',
        // N} = Nginx's bracket-heavy config syntax
      },
      {
        name: 'CI/CD Pipelines',
        tier: 'proficient',
        usedAt: ['Magneto', 'Personal', 'Academic'],
        ghost: '→',
        // → = a pipeline is an arrow
      },
      // Production
      {
        name: 'AWS S3',
        tier: 'production',
        usedAt: ['Magneto'],
        ghost: 'S3',
      },
      {
        name: 'AWS EC2',
        tier: 'production',
        usedAt: ['Magneto'],
        ghost: 'EC2',
      },
      {
        name: 'GCP',
        tier: 'production',
        usedAt: ['Certified'],
        ghost: 'GCP',
      },
      {
        name: 'Docker',
        tier: 'production',
        usedAt: ['Magneto', 'Personal'],
        ghost: '🐳',
      },
    ],
  },

  // ── Tools & Practices ──────────────────────────────────────────────────────
  {
    id: 'tools',
    icon: '◫',
    accent: 'var(--color-accent-amber)',
    skills: [
      // Proficient
      {
        name: 'AI-augmented workflow',
        tier: 'proficient',
        usedAt: ['Personal'],
        ghost: '◈',
        // ◈ = circuit/neural node — connected thinking
      },
      {
        name: 'Azure DevOps',
        tier: 'proficient',
        usedAt: ['Magneto'],
        ghost: 'Az',
        // Az = the literal Azure CLI command: `az login`, `az deploy`
      },
      {
        name: 'Postman',
        tier: 'proficient',
        usedAt: ['Arroyo', 'Magneto'],
        ghost: 'PM',
      },
      // Production
      {
        name: 'ESLint / Prettier',
        tier: 'production',
        usedAt: ['Personal', 'Magneto'],
        ghost: '✓',
        // ✓ = linting is fundamentally validation — pass/fail
      },
      {
        name: 'Git',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: 'Git',
      },
      {
        name: 'Scrum / Kanban',
        tier: 'production',
        usedAt: ['Arroyo', 'Magneto', 'Cafeto'],
        ghost: '∞',
        // ∞ = the iterative sprint loop — cycles without end
      },
    ],
  },
];

export const CERT_TAGS: string[] = [
  'Compute Engine',
  'Cloud Storage',
  'IAM',
  'VPC & Networking',
  'Cloud Run',
  'Monitoring',
];

export interface CharacterStatement {
  key: string;
  accent: string;
}

export const CHARACTER_STATEMENTS: CharacterStatement[] = [
  { key: 'clarity', accent: 'var(--color-accent-cyan)' }, // 0 — wide
  { key: 'directions', accent: 'var(--color-accent-amber)' }, // 1
  { key: 'tangents', accent: 'var(--color-accent-lime)' }, // 2
  { key: 'slowDown', accent: 'var(--color-accent-cyan)' }, // 3 — wide
  { key: 'overengineering', accent: 'var(--color-accent-coral)' }, // 4
  { key: 'feedback', accent: 'var(--color-accent-amber)' }, // 5
  { key: 'curious', accent: 'var(--color-accent-lime)' }, // 6 — wide
  { key: 'understand', accent: 'var(--color-accent-cyan)' }, // 7
  { key: 'calm', accent: 'var(--color-accent-coral)' }, // 8
];
