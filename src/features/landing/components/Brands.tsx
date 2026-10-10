import type { LandingCopy } from "../content/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { BrandForm } from "./BrandForm";
import { SectionLabel } from "./ui";

/** 5.13 — Ouvrir le canal B2B. */
export function Brands({ copy }: { copy: LandingCopy }) {
  const { brands } = copy;

  return (
    <section id="marques" aria-labelledby="brands-title" className="kk-section">
      <div className="kk-container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel label={brands.label} className="mb-8" />
          <SplitLines
            as="h2"
            id="brands-title"
            lines={brands.title}
            className="kk-display text-[clamp(2.6rem,5vw,5rem)]"
            lineClassNames={[undefined, "pl-[16%]"]}
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[36ch] text-[1.05rem] leading-relaxed text-night/72">{brands.text}</p>
          </Reveal>
        </div>
        <Reveal className="relative lg:col-span-6 lg:col-start-7 lg:pt-4">
          <BrandForm copy={brands} />
        </Reveal>
      </div>
    </section>
  );
}
