import { QUOTE_TOLERANCE_PERCENT } from "@/common/services";
import { GuaranteeIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { fill } from "../lib/fill";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { HScroll } from "./HScroll";
import { SectionLabel } from "./ui";

/**
 * H + J — La confiance en une seule rangée : comment les ateliers sont choisis,
 * puis nos engagements (tels qu'écrits dans le cahier des charges, rien de plus).
 * TODO : portraits et vraies notes des ateliers dès que la table des ateliers existe.
 */
export function Trust({ t }: { t: LandingDictionary }) {
  const { ateliers, guarantee, carousel } = t;

  return (
    <section
      id="ateliers"
      aria-labelledby="trust-title"
      className="kk-section overflow-x-clip"
    >
      <div className="kk-container">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-6 text-kk-ink/70">
              {ateliers.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="trust-title"
              lines={ateliers.title}
              className="kk-display text-[clamp(2.2rem,4.4vw,4.4rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{ateliers.text}</p>
          </Reveal>
        </div>

        <HScroll
          label={ateliers.label}
          prevLabel={carousel.prev}
          nextLabel={carousel.next}
          className="mt-12 md:mt-16"
        >
          {ateliers.criteria.map((criterion, index) => (
            <li
              key={criterion.title}
              className="w-[min(78vw,280px)] border-t border-kk-ink/20 pt-6"
            >
              <p className="font-display text-[2.2rem] leading-none text-kk-ink/70 italic">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-display text-[1.4rem] leading-tight">
                {criterion.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-kk-ink/70">
                {criterion.text}
              </p>
            </li>
          ))}
          {guarantee.items.map((item, index) => (
            <li
              key={item.title}
              className="w-[min(78vw,280px)] bg-kk-ink p-6 text-kk-ivory"
            >
              <GuaranteeIcon index={index} className="h-10 w-10 text-kk-sand" />
              <h3 className="mt-6 font-display text-[1.4rem] leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-kk-ivory/75">
                {fill(item.text, { percent: QUOTE_TOLERANCE_PERCENT })}
              </p>
            </li>
          ))}
        </HScroll>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {guarantee.extras.map((extra) => (
            <span
              key={extra}
              className="kk-caps flex items-center gap-3 text-kk-ink/70"
            >
              <span
                aria-hidden="true"
                className="block h-[7px] w-[7px] rotate-45 bg-kk-sand"
              />
              {extra}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-[70ch] text-[0.9rem] leading-relaxed text-kk-ink/70">
          {ateliers.note}
        </p>
      </div>
    </section>
  );
}
