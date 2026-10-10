import { StepIcon } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ActionLink, SectionLabel } from "./ui";

/**
 * M — Recrutement des ateliers : même identité, autre ton.
 * Fond encre, langage professionnel, lien vers le formulaire d'inscription des ateliers.
 */
export function JoinAteliers({ t }: { t: LandingDictionary }) {
  const { join: copy } = t;

  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="kk-section kk-on-dark bg-kk-ink text-kk-ivory"
    >
      <div className="kk-container grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div className="lg:col-span-6">
          <StepIcon step={1} className="mb-10 h-14 w-14 text-kk-sand" />
          <SectionLabel className="mb-8 text-kk-sand">
            {copy.label}
          </SectionLabel>
          <SplitLines
            as="h2"
            id="join-title"
            lines={copy.title}
            className="kk-display text-[clamp(2.4rem,4.8vw,4.8rem)]"
          />
          <Reveal delay={0.1}>
            <p className="kk-lead mt-8 max-w-[44ch] text-kk-ivory/72">
              {copy.text}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ul className="border-t border-kk-ivory/15">
            {copy.benefits.map((benefit, index) => (
              <Reveal
                as="li"
                key={benefit}
                delay={index * 0.08}
                y={14}
                className="flex gap-6 border-b border-kk-ivory/15 py-6"
              >
                <span className="font-display text-[1rem] text-kk-sand italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[1rem] leading-relaxed text-kk-ivory/85">
                  {benefit}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10">
            <ActionLink href="/devenir-atelier" variant="outline">
              {copy.cta}
            </ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
