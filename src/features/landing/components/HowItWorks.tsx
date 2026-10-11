import { StepIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { HScroll } from "./HScroll";
import { ActionLink, SectionLabel } from "./ui";

/** E — Les cinq étapes, en rangée horizontale : on les parcourt d'un glissement. */
export function HowItWorks({ t }: { t: LandingDictionary }) {
  const { how, carousel } = t;

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="kk-section overflow-x-clip"
    >
      <div className="kk-container">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-6 text-kk-ink/70">
              {how.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="how-title"
              lines={how.title}
              className="kk-display text-[clamp(2.2rem,4.4vw,4.4rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{how.intro}</p>
          </Reveal>
        </div>

        <HScroll
          label={how.label}
          prevLabel={carousel.prev}
          nextLabel={carousel.next}
          className="mt-12 md:mt-16"
        >
          {how.steps.map((step, index) => (
            <li
              key={step.title}
              className="w-[min(78vw,300px)] border-t border-kk-ink/20 pt-6"
            >
              <div className="flex items-start justify-between">
                <p className="font-display text-[2.6rem] leading-none text-kk-ink/70 italic">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <StepIcon step={index} className="h-11 w-11 text-kk-ink" />
              </div>
              <h3 className="mt-8 font-display text-[1.45rem] leading-tight">
                <span className="sr-only">{index + 1}. </span>
                {step.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-kk-ink/70">
                {step.text}
              </p>
            </li>
          ))}
        </HScroll>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.95rem] text-kk-ink/70">{how.note}</p>
          <ActionLink>{how.cta}</ActionLink>
        </div>
      </div>
    </section>
  );
}
