import { AtelierStillLife } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

/**
 * H — Les ateliers partenaires, présentés comme des professionnels.
 * Pas encore de portraits ni d'avis réels : on montre comment ils sont choisis,
 * et la mention « Nouvel atelier » remplace les étoiles tant qu'il n'y a pas d'avis.
 * TODO : portraits, spécialités et vraies notes dès que la table des ateliers existe.
 */
export function Ateliers({ t }: { t: LandingDictionary }) {
  const { ateliers: copy } = t;

  return (
    <section
      id="ateliers"
      aria-labelledby="ateliers-title"
      className="kk-section"
    >
      <div className="kk-container grid gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <SectionLabel className="mb-8 text-kk-ink/70">
            {copy.label}
          </SectionLabel>
          <SplitLines
            as="h2"
            id="ateliers-title"
            lines={copy.title}
            className="kk-display text-[clamp(2.4rem,4.4vw,4.4rem)]"
          />
          <Reveal delay={0.1}>
            <p className="kk-lead mt-8 max-w-[42ch] text-kk-ink/72">
              {copy.text}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <AtelierStillLife
              title={copy.illustrationAlt}
              className="mt-14 h-auto w-full max-w-[420px] text-kk-ink/80"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
          <ol className="grid border-t border-kk-ink/15 sm:grid-cols-2">
            {copy.criteria.map((criterion, index) => (
              <Reveal
                as="li"
                key={criterion.title}
                delay={index * 0.08}
                y={16}
                className="border-b border-kk-ink/15 py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <p className="font-display text-[1rem] text-kk-ink/70 italic">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight">
                  {criterion.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-kk-ink/70">
                  {criterion.text}
                </p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 flex items-start gap-4 text-[0.92rem] leading-relaxed text-kk-ink/65">
            <span
              aria-hidden="true"
              className="mt-1.5 block h-[9px] w-[9px] shrink-0 rotate-45 border border-kk-ink/50"
            />
            <p>{copy.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
