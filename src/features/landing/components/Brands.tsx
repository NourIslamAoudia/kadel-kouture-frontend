import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { BrandForm } from "./BrandForm";
import { SectionLabel } from "./ui";

/** N — Les marques (B2B) : une offre claire, un formulaire court. */
export function Brands({ t }: { t: LandingDictionary }) {
  const { brands: copy } = t;

  return (
    <section id="brands" aria-labelledby="brands-title" className="kk-section">
      <div className="kk-container grid gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <SectionLabel className="mb-8 text-kk-ink/70">
            {copy.label}
          </SectionLabel>
          <SplitLines
            as="h2"
            id="brands-title"
            lines={copy.title}
            className="kk-display text-[clamp(2.4rem,4.6vw,4.6rem)]"
          />
          <Reveal delay={0.1}>
            <p className="kk-lead mt-8 max-w-[40ch] text-kk-ink/72">
              {copy.text}
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <BrandForm copy={copy} />
        </Reveal>
      </div>
    </section>
  );
}
