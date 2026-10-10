import { QUOTE_TOLERANCE_PERCENT } from "@/common/services";
import { GuaranteeIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { fill } from "../lib/fill";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

/** J — Les engagements, tels qu'écrits dans le cahier des charges. Rien de plus. */
export function Guarantee({ t }: { t: LandingDictionary }) {
  const { guarantee: copy } = t;

  return (
    <section aria-labelledby="guarantee-title" className="kk-section">
      <div className="kk-container">
        <SectionLabel className="mb-8 text-kk-ink/70">
          {copy.label}
        </SectionLabel>
        <SplitLines
          as="h2"
          id="guarantee-title"
          lines={copy.title}
          className="kk-display text-[clamp(2.2rem,4.4vw,4.4rem)]"
          lineClassNames={[undefined, "md:pl-[10%]"]}
        />

        <ul className="mt-16 grid border-t border-kk-ink/15 md:mt-24 md:grid-cols-3">
          {copy.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.1}
              y={18}
              className="border-b border-kk-ink/15 py-10 md:border-b-0 md:px-10 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <GuaranteeIcon index={index} className="h-11 w-11 text-kk-ink" />
              <h3 className="mt-8 font-display text-[1.6rem] leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-kk-ink/70">
                {fill(item.text, { percent: QUOTE_TOLERANCE_PERCENT })}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-kk-ink/15 pt-8">
          {copy.extras.map((extra) => (
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
        </Reveal>
      </div>
    </section>
  );
}
