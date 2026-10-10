import { StepArt } from "../art/StepArt";
import type { LandingCopy } from "../content/fr";
import { ArtReveal } from "../motion/ArtReveal";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ActionLink, Frame, SectionLabel } from "./ui";

/** 5.12 — Recruter des ateliers en continu. */
export function JoinNetwork({ copy }: { copy: LandingCopy }) {
  const { join } = copy;

  return (
    <section
      id="devenir-atelier"
      aria-labelledby="join-title"
      className="kk-section bg-night text-paper"
      style={{ ["--accent" as string]: "var(--color-ochre)" }}
    >
      <div className="kk-container grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionLabel label={join.label} className="mb-8 text-paper/60" />
          <SplitLines
            as="h2"
            id="join-title"
            lines={join.title}
            className="kk-display text-[clamp(2.6rem,5.8vw,5.8rem)]"
            lineClassNames={[undefined, "pl-[10%]", "pl-[20%]"]}
          />
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-[44ch] text-[1.05rem] leading-relaxed text-paper/75">{join.text}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <ActionLink href="/devenir-atelier" variant="ghost">
              {join.cta}
            </ActionLink>
          </Reveal>
        </div>
        <figure className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <Frame variant="white">
            <ArtReveal>
              <StepArt step={1} title={join.artAlt} />
            </ArtReveal>
          </Frame>
        </figure>
      </div>
    </section>
  );
}
