'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TERMINAL_LINES, PROCESS_STEPS, CODE_LINES, type TokenType } from '@/content/about';

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: 'var(--color-accent-cyan)',
  var: 'var(--color-accent-cyan)',
  key: 'var(--color-text-secondary)',
  op: 'rgba(230,238,243,0.3)',
  string: 'var(--color-accent-lime)',
  comment: 'var(--color-text-muted)',
  builtin: 'var(--color-accent-coral)',
};

interface ResolvedTerminalLine {
  type: 'prompt' | 'output' | 'gap';
  text: string;
  color?: string;
}

function Terminal({ lines }: { lines: ResolvedTerminalLine[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    let typingLine = false;

    function step() {
      if (lineIdx >= lines.length) return;
      const line = lines[lineIdx];

      if (line.type === 'gap') {
        setVisibleCount(lineIdx + 1);
        lineIdx++;
        setTimeout(step, 100);
        return;
      }

      if (!typingLine) {
        typingLine = true;
        charIdx = 0;
        setVisibleCount(lineIdx + 1);
      }

      const text = line.text;
      const speed = line.type === 'prompt' ? 36 : 16;

      if (charIdx < text.length) {
        charIdx++;
        setCharIndex(charIdx);
        setTimeout(step, speed);
      } else {
        typingLine = false;
        charIdx = 0;
        lineIdx++;
        setTimeout(step, line.type === 'prompt' ? 160 : 50);
      }
    }

    setTimeout(step, 300);
  }, [inView, lines]);

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden border"
      style={{
        background: 'var(--color-bg-primary)',
        borderColor: 'var(--color-stroke)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{
          background: 'color-mix(in srgb, var(--color-bg-card) 60%, transparent)',
          borderColor: 'var(--color-stroke)',
        }}
      >
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
          bash — sebastian@bccloudsolutions ~
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 min-h-65 font-mono text-[13px] leading-[1.8]">
        {lines.slice(0, visibleCount).map((line, i) => {
          const isLast = i === visibleCount - 1;

          if (line.type === 'gap') return <div key={i} className="h-2" />;

          if (line.type === 'prompt') {
            const raw = line.text;
            const display = isLast ? raw.slice(0, charIndex) : raw;
            const cmd = display.replace('sebastian ', '');
            return (
              <div key={i} className="flex items-center gap-2">
                <span style={{ color: 'var(--color-accent-lime)' }}>❯</span>
                <span>
                  <span style={{ color: 'var(--color-accent-cyan)' }}>sebastian</span>
                  <span style={{ color: 'var(--color-text-muted)' }}> </span>
                  <span style={{ color: 'var(--color-accent-amber)' }}>{cmd}</span>
                </span>
                {isLast && charIndex < raw.length && <Cursor />}
              </div>
            );
          }

          const raw = line.text;
          const display = isLast ? raw.slice(0, charIndex) : raw;
          return (
            <div
              key={i}
              className="pl-5"
              style={{ color: line.color ?? 'var(--color-text-muted)' }}
            >
              {display}
              {isLast && charIndex < raw.length && <Cursor />}
            </div>
          );
        })}

        {visibleCount >= lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: 'var(--color-accent-lime)' }}>❯</span>
            <Cursor />
          </div>
        )}
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <span
      className="inline-block align-middle ml-0.5"
      style={{
        width: '7px',
        height: '14px',
        background: 'var(--color-text-muted)',
        animation: 'termCursorBlink 1s step-end infinite',
      }}
    />
  );
}

function ProcessFlow() {
  const t = useTranslations('about.howIWork.process');

  return (
    <Reveal>
      <div
        className="rounded-xl border p-6 h-full"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-stroke)',
        }}
      >
        <p
          className="text-[11px] font-mono uppercase tracking-widest mb-5"
          style={{ color: 'var(--color-accent-cyan)' }}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          // process.flow
        </p>

        <div className="flex flex-col">
          {PROCESS_STEPS.map((step, i) => {
            const stepT = t.raw(step.key) as { label: string; description: string };
            const isLast = i === PROCESS_STEPS.length - 1;

            return (
              <div key={step.key} className="flex gap-3">
                {/* Node + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center border text-[9px] font-mono"
                    style={{
                      background: `color-mix(in srgb, ${step.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${step.accent} 30%, transparent)`,
                      color: step.accent,
                    }}
                  >
                    {step.num}
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{
                        minHeight: '16px',
                        background: `linear-gradient(to bottom, ${step.accent}44, ${PROCESS_STEPS[i + 1].accent}22)`,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={isLast ? 'pb-0' : 'pb-4'}>
                  <p
                    className="font-display font-bold text-sm leading-tight"
                    style={{ color: step.accent }}
                  >
                    {stepT.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed mt-0.5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {stepT.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

function CodeBlock({
  resolvedLines,
}: {
  resolvedLines: { indent?: number; tokens: { type: TokenType; text: string }[] }[];
}) {
  return (
    <Reveal delay={0.1}>
      <div
        className="rounded-xl border overflow-hidden h-full"
        style={{
          background: 'var(--color-bg-primary)',
          borderColor: 'var(--color-stroke)',
        }}
      >
        {/* File tab */}
        <div
          className="flex items-center px-4 py-2 border-b"
          style={{
            background: 'color-mix(in srgb, var(--color-bg-card) 60%, transparent)',
            borderColor: 'var(--color-stroke)',
          }}
        >
          <div
            className="px-3 py-1 rounded-t text-[11px] font-mono border-b"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-accent-cyan)',
              background: 'var(--color-bg-card)',
            }}
          >
            sebastian.config.ts
          </div>
        </div>

        {/* Code */}
        <div className="px-4 py-4 overflow-x-auto">
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {resolvedLines.map((line, i) => (
                <tr key={i}>
                  <td
                    className="pr-5 select-none align-top text-right"
                    style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      opacity: 0.4,
                      minWidth: '28px',
                      lineHeight: '1.8',
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    className="align-top whitespace-pre"
                    style={{ fontFamily: 'var(--font-code)', fontSize: '12px', lineHeight: '1.8' }}
                  >
                    {'  '.repeat(line.indent ?? 0)}
                    {line.tokens.map((token, j) => (
                      <span key={j} style={{ color: TOKEN_COLORS[token.type] }}>
                        {token.text}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

export function HowIWork() {
  const t = useTranslations('about.howIWork');
  const resolvedTerminalLines = TERMINAL_LINES.map((line) => ({
    type: line.type,
    text: line.type === 'prompt' ? (line.command ?? '') : line.key ? t(`terminal.${line.key}`) : '',
    color: line.color,
  }));

  const resolvedCodeLines = CODE_LINES.map((line) => ({
    indent: line.indent,
    tokens: line.tokens.map((token) => ({
      type: token.type,
      text: token.i18nKey ? t(`codeBlock.${token.i18nKey}`) : (token.value ?? ''),
    })),
  }));

  return (
    <section className="relative py-20 md:py-24">
      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes termCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('heading')} />

        <div className="flex flex-col gap-5">
          {/* Terminal — full width */}
          <Reveal>
            <Terminal lines={resolvedTerminalLines} />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProcessFlow />
            <CodeBlock resolvedLines={resolvedCodeLines} />
          </div>
        </div>
      </div>
    </section>
  );
}
