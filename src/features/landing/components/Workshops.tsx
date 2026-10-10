import { WorkshopArt } from "../art/WorkshopArt";
import type { LandingCopy } from "../content/fr";
import { fill } from "../lib/fill";
import { ArtReveal } from "../motion/ArtReveal";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Frame, SectionLabel } from "./ui";

/**
 * 5.7 — Autorité et preuve sociale.
 * TODO : portraits des ateliers (nom, spécialité, étoiles, nombre d'avis)
 * dès que la table des ateliers existe et que les photos sont fournies.
 */
export function Workshops({
  copy,
  savedGarments,
}: {
  copy: LandingCopy;
  savedGarments: number | null;
}) {
  const { workshops } = copy;
  // Le backend renvoie null tant que le nombre est trop petit : on ne gonfle rien.
  const counter = savedGarments;

  return (
    <section id="ateliers" aria-labelledby="workshops-title" className="kk-section overflow-x-clip pb-0">
      <div className="kk-container grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        <figure className="order-2 mx-auto w-full max-w-[30rem] lg:order-1 lg:col-span-5 lg:max-w-none">
          <Parallax offset={50}>
            <Frame variant="oak">
              <ArtReveal from="left">
                <WorkshopArt title={workshops.artAlt} />
              </ArtReveal>
            </Frame>
          </Parallax>
        </figure>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionLabel index={workshops.index} label={workshops.label} className="mb-8" />
          <SplitLines
            as="h2"
            id="workshops-title"
            lines={workshops.title}
            className="kk-display text-[clamp(2.6rem,5.4vw,5.4rem)]"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[40ch] text-[1.05rem] leading-relaxed text-night/72">{workshops.text}</p>
          </Reveal>

          <ol className="mt-12 border-b border-night/15">
            {workshops.criteria.map((criterion, index) => (
              <Reveal as="li" key={criterion} delay={0.08 * index} y={16}>
                <span className="flex items-baseline gap-5 border-t border-night/15 py-4">
                  <span className="font-display text-[0.95rem] text-terracotta italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.02rem]">{criterion}</span>
                </span>
              </Reveal>
            ))}
          </ol>

          {counter !== null ? (
            <Reveal className="mt-10 flex items-baseline gap-4">
              <span className="font-display text-[clamp(2.6rem,4vw,3.6rem)] leading-none">
                {fill(workshops.saved, { count: counter.toLocaleString(copy.locale) })}
              </span>
              <span className="text-night/55 italic">{workshops.savedCaption}</span>
            </Reveal>
          ) : null}

          <Reveal delay={0.2} className="mt-10">
            <a href="#devenir-atelier" className="kk-link text-[0.95rem] font-semibold">
              {workshops.join} →
            </a>
          </Reveal>
        </div>
      </div>

      <div aria-hidden="true" className="kk-marquee mt-28 overflow-hidden border-y border-night/12 py-6 lg:mt-40">
        <div className="kk-marquee__track">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="flex shrink-0 items-center">
              {workshops.marquee.map((word, index) => (
                <span key={`${copyIndex}-${word}`} className="flex items-center">
                  <span
                    className={
                      index % 2 === 0
                        ? "font-display text-[clamp(2rem,4vw,3.6rem)] italic"
                        : "font-display text-[clamp(2rem,4vw,3.6rem)] text-night/35"
                    }
                  >
                    {word}
                  </span>
                  <span className="mx-[clamp(1.25rem,3vw,2.75rem)] text-[1.4rem] text-terracotta">×</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
