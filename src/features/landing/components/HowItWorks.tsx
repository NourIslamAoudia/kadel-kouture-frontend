import { StepIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ActionLink, SectionLabel } from "./ui";

/**
 * E — Cinq étapes lisibles d'un coup d'œil.
 * Un fil horizontal ponctué de losanges (motif bogolan) relie les étapes sur grand écran.
 */
export function HowItWorks({ t }: { t: LandingDictionary }) {
  const { how } = t;

  return (
    <section id="how" aria-labelledby="how-title" className="kk-section">
      <div className="kk-container">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-8 text-kk-ink/70">
              {how.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="how-title"
              lines={how.title}
              className="kk-display text-[clamp(2.4rem,5vw,5rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{how.intro}</p>
          </Reveal>
        </div>

        <div className="relative mt-20 md:mt-28">
          {/* Le fil qui relie les étapes (décoratif, hors de la liste) */}
          <span
            aria-hidden="true"
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-kk-ink/15 lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[7px] w-px bg-kk-ink/15 md:hidden"
          />
          <ol className="relative grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-5 lg:gap-8">
            {how.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.08}
                y={20}
                className="relative pl-12 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 block h-[15px] w-[15px] rotate-45 border border-kk-ink/40 bg-kk-ivory"
                />
                <div className="md:pt-12">
                  <p className="font-display text-[1.1rem] text-kk-ink/70 italic">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <StepIcon
                    step={index}
                    className="mt-6 h-12 w-12 text-kk-ink"
                  />
                  <h3 className="mt-6 font-display text-[1.45rem] leading-tight">
                    <span className="sr-only">{index + 1}. </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[30ch] text-[0.95rem] leading-relaxed text-kk-ink/70">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 flex flex-col gap-6 border-t border-kk-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.95rem] text-kk-ink/65">{how.note}</p>
          <ActionLink>{how.cta}</ActionLink>
        </Reveal>
      </div>
    </section>
  );
}
