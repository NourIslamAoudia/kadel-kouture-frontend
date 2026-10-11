import { StepIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { emphasis } from "../lib/emphasis";
import { BrandForm } from "./BrandForm";
import { ActionLink, SectionLabel } from "./ui";

/**
 * M + N — Les deux publics professionnels côte à côte :
 * ateliers (recrutement) et marques (B2B, formulaire court).
 */
export function Professionals({ t }: { t: LandingDictionary }) {
  const { join, brands } = t;

  return (
    <section
      aria-label={`${join.label} · ${brands.label}`}
      className="grid lg:grid-cols-2"
    >
      <div
        id="join"
        className="kk-on-dark bg-kk-ink px-[clamp(20px,4.5vw,64px)] py-[clamp(64px,7.5vw,112px)] text-kk-ivory"
      >
        <StepIcon step={1} className="mb-8 h-12 w-12 text-kk-sand" />
        <SectionLabel className="mb-6 text-kk-sand">{join.label}</SectionLabel>
        <h2 className="kk-display text-[clamp(2rem,3.4vw,3.4rem)]">
          {join.title.map((line, index) => (
            <span key={index} className="block">
              {emphasis(line)}
            </span>
          ))}
        </h2>
        <p className="kk-lead mt-6 max-w-[44ch] text-kk-ivory/75">
          {join.text}
        </p>
        <ul className="mt-8 grid gap-3 text-[0.95rem] text-kk-ivory/85">
          {join.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 block h-[7px] w-[7px] shrink-0 rotate-45 bg-kk-sand"
              />
              {benefit}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ActionLink href="/devenir-atelier" variant="outline">
            {join.cta}
          </ActionLink>
        </div>
      </div>

      <div
        id="brands"
        className="bg-kk-ivory px-[clamp(20px,4.5vw,64px)] py-[clamp(64px,7.5vw,112px)]"
      >
        <SectionLabel className="mb-6 text-kk-ink/70">
          {brands.label}
        </SectionLabel>
        <h2 className="kk-display text-[clamp(2rem,3.4vw,3.4rem)]">
          {brands.title.map((line, index) => (
            <span key={index} className="block">
              {emphasis(line)}
            </span>
          ))}
        </h2>
        <p className="kk-lead mt-6 mb-10 max-w-[44ch] text-kk-ink/72">
          {brands.text}
        </p>
        <BrandForm copy={brands} />
      </div>
    </section>
  );
}
