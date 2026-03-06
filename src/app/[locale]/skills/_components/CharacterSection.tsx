import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CharacterStatement } from './CharacterStatement';
import { CHARACTER_STATEMENTS } from '@/content/skills';

// ═════════ CharacterStatement (subcomponent) ═════════

// interface CharacterStatementProps {
//   text: string;
//   accent: string;
//   index: number;
// }

// function CharacterStatement({ text, accent, index }: CharacterStatementProps) {
//   'use client';
//   const isWide = index % 3 === 0;

//   return (
//     <div
//       className={['group relative cursor-default', isWide ? 'md:col-span-2' : 'col-span-1'].join(
//         ' '
//       )}
//     >
//       <div
//         className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full
//                    opacity-20 group-hover:opacity-70
//                    transition-opacity duration-300"
//         style={{
//           background: `linear-gradient(180deg, ${accent}, transparent)`,
//         }}
//         aria-hidden="true"
//       />

//       <span
//         className="absolute left-4.5 -top-2 font-display font-bold
//                    leading-none select-none pointer-events-none
//                    opacity-[0.05] group-hover:opacity-[0.12]
//                    transition-opacity duration-300"
//         style={{
//           fontSize: 52,
//           color: accent,
//         }}
//         aria-hidden="true"
//       >
//         &ldquo;
//       </span>
//       <div
//         className="pl-6 pt-1 pb-5 border-b
//                    transition-colors duration-300"
//         style={{
//           borderColor: 'rgba(255,255,255,0.05)',
//         }}
//         onMouseEnter={(e) => {
//           (e.currentTarget as HTMLDivElement).style.borderColor =
//             `color-mix(in srgb, ${accent} 15%, transparent)`;
//         }}
//         onMouseLeave={(e) => {
//           (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.05)';
//         }}
//       >
//         <p
//           className={[
//             'font-body leading-relaxed transition-colors duration-300',
//             'text-text-secondary group-hover:text-text-primary',
//             isWide ? 'text-base md:text-[17px] font-medium max-w-2xl' : 'text-[15px] font-normal',
//           ].join(' ')}
//         >
//           {text}
//         </p>
//       </div>
//     </div>
//   );
// }

// ═════════ CharacterSection ═════════

export function CharacterSection() {
  const t = useTranslations('skills.character');

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t('label')} title={t('title')} description={t('description')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {CHARACTER_STATEMENTS.map((statement, i) => (
            <Reveal key={statement.key} delay={i * 0.06}>
              <CharacterStatement
                text={t(`statements.${statement.key}`)}
                accent={statement.accent}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
