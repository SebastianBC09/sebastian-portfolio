export type TimelineTrack = 'professional' | 'academic';
export type TimelineStatus = 'completed' | 'active';

export interface TimelineEntry {
  /** Unique key — maps to i18n translation key */
  key: string;
  track: TimelineTrack;
  /** CSS color token e.g. 'var(--color-accent-coral)' */
  accent: string;
  /** ISO date string — used for absolute positioning on the time axis */
  startDate: string;
  /** ISO date string or null if currently active */
  endDate: string | null;
  status: TimelineStatus;
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  /* ── Professional ── */
  {
    key: 'fasterSolutions',
    track: 'professional',
    accent: 'var(--color-accent-coral)',
    startDate: '2019-06-01',
    endDate: '2019-08-01',
    status: 'completed',
  },
  {
    key: 'arroyo',
    track: 'professional',
    accent: 'var(--color-accent-coral)',
    startDate: '2022-02-01',
    endDate: '2022-10-01',
    status: 'completed',
  },
  {
    key: 'magneto',
    track: 'professional',
    accent: 'var(--color-accent-coral)',
    startDate: '2022-11-01',
    endDate: '2024-08-01',
    status: 'completed',
  },

  {
    key: 'cafeto',
    track: 'professional',
    accent: 'var(--color-accent-coral)',
    startDate: '2024-11-01',
    endDate: '2026-02-01',
    status: 'completed',
  },
  {
    key: 'lakeSuperior',
    track: 'academic',
    accent: 'var(--color-accent-cyan)',
    startDate: '2017-01-01',
    endDate: '2019-05-01',
    status: 'completed',
  },
  {
    key: 'platzi',
    track: 'academic',
    accent: 'var(--color-accent-amber)',
    startDate: '2021-01-01',
    endDate: '2021-09-01',
    status: 'completed',
  },
  {
    key: 'teinco',
    track: 'academic',
    accent: 'var(--color-accent-cyan)',
    startDate: '2022-02-01',
    endDate: '2023-09-01',
    status: 'completed',
  },
  {
    key: 'uninpahu',
    track: 'academic',
    accent: 'var(--color-accent-cyan)',
    startDate: '2024-02-01',
    endDate: null,
    status: 'active',
  },
];

export interface RecognitionItem {
  key: string;
  accent: string;
  /** Tech stack tags shown on the card */
  tags: string[];
  /** Optional external link */
  href?: string;
}

export const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    key: 'smartAgriculture',
    accent: 'var(--color-accent-lime)',
    tags: ['Arduino', 'Java', 'IoT', 'Sensors'],
    href: '/projects/smart-agriculture',
  },
  {
    key: 'gcpCert',
    accent: 'var(--color-accent-amber)',
    tags: ['GCP', 'Compute Engine', 'Cloud Storage', 'IAM'],
    href: 'https://cloud.google.com/certification/cloud-engineer',
  },
];

export type TerminalLineType = 'prompt' | 'output' | 'gap';

export interface TerminalLine {
  type: TerminalLineType;
  /** Hardcoded prompt command — not translated */
  command?: string;
  /** i18n key — maps to about.howIWork.terminal.{key} */
  key?: string;
  /** CSS color token for output lines */
  color?: string;
}

export const TERMINAL_LINES: TerminalLine[] = [
  { type: 'prompt', command: 'sebastian --approach' },
  { type: 'output', key: 'approach1', color: 'var(--color-accent-cyan)' },
  { type: 'output', key: 'approach2', color: 'var(--color-text-muted)' },
  { type: 'gap' },
  { type: 'prompt', command: 'sebastian --methodology' },
  { type: 'output', key: 'methodology1', color: 'var(--color-accent-lime)' },
  { type: 'output', key: 'methodology2', color: 'var(--color-text-muted)' },
  { type: 'gap' },
  { type: 'prompt', command: 'sebastian --tooling' },
  { type: 'output', key: 'tooling1', color: 'var(--color-accent-amber)' },
  { type: 'output', key: 'tooling2', color: 'var(--color-text-muted)' },
  { type: 'gap' },
  { type: 'prompt', command: 'sebastian --collab' },
  { type: 'output', key: 'collab1', color: 'var(--color-accent-coral)' },
  { type: 'output', key: 'collab2', color: 'var(--color-text-muted)' },
];

export interface ProcessStep {
  /** i18n key suffix — maps to about.howIWork.process.{key} */
  key: string;
  num: string;
  accent: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { key: 'understand', num: '01', accent: 'var(--color-accent-cyan)' },
  { key: 'architect', num: '02', accent: 'var(--color-accent-amber)' },
  { key: 'build', num: '03', accent: 'var(--color-accent-coral)' },
  { key: 'ship', num: '04', accent: 'var(--color-accent-lime)' },
  { key: 'reflect', num: '05', accent: 'var(--color-accent-cyan)' },
];

export type TokenType = 'keyword' | 'var' | 'key' | 'op' | 'string' | 'comment' | 'builtin';

export interface CodeToken {
  type: TokenType;
  /** Static value — hardcoded identifiers and operators */
  value?: string;
  /** i18n key — maps to about.howIWork.codeBlock.{i18nKey} */
  i18nKey?: string;
}

export interface CodeLine {
  indent?: number;
  tokens: CodeToken[];
}

export const CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { type: 'keyword', value: 'const ' },
      { type: 'var', value: 'sebastian' },
      { type: 'op', value: ' = {' },
    ],
  },
  { indent: 1, tokens: [{ type: 'comment', i18nKey: 'comment1' }] },
  {
    indent: 1,
    tokens: [
      { type: 'key', value: 'types' },
      { type: 'op', value: ': ' },
      { type: 'string', i18nKey: 'types' },
      { type: 'op', value: ',' },
    ],
  },
  { indent: 0, tokens: [{ type: 'op', value: '' }] },
  { indent: 1, tokens: [{ type: 'comment', i18nKey: 'comment2' }] },
  {
    indent: 1,
    tokens: [
      { type: 'key', value: 'api' },
      { type: 'op', value: ': ' },
      { type: 'string', i18nKey: 'api' },
      { type: 'op', value: ',' },
    ],
  },
  { indent: 0, tokens: [{ type: 'op', value: '' }] },
  { indent: 1, tokens: [{ type: 'comment', i18nKey: 'comment3' }] },
  {
    indent: 1,
    tokens: [
      { type: 'key', value: 'webVitals' },
      { type: 'op', value: ': ' },
      { type: 'string', i18nKey: 'webVitals' },
      { type: 'op', value: ',' },
    ],
  },
  { indent: 0, tokens: [{ type: 'op', value: '' }] },
  { indent: 1, tokens: [{ type: 'comment', i18nKey: 'comment4' }] },
  {
    indent: 1,
    tokens: [
      { type: 'key', value: 'testing' },
      { type: 'op', value: ': ' },
      { type: 'string', i18nKey: 'testing' },
      { type: 'op', value: ',' },
    ],
  },
  { indent: 0, tokens: [{ type: 'op', value: '' }] },
  {
    indent: 1,
    tokens: [
      { type: 'key', value: 'anyType' },
      { type: 'op', value: ': ' },
      { type: 'builtin', value: 'false' },
      { type: 'op', value: ',' },
      { type: 'comment', i18nKey: 'nonNegotiable' },
    ],
  },
  { tokens: [{ type: 'op', value: '};' }] },
];
