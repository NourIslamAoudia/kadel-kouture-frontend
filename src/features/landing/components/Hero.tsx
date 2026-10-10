import { HeroArt } from "../art/HeroArt";
import type { LandingCopy } from "../content/fr";
import { ArtReveal } from "../motion/ArtReveal";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ActionLink, Frame } from "./ui";

/** 5.2 — Accroche immédiate : on nomme ce que le client ressent, pas le service. */
export function Hero({ copy }: { copy: LandingCopy }) {
  const { hero } = copy;

  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative">
      <div className="kk-container relative grid grid-cols-12 gap-x-4 pt-10 pb-24 sm:pt-14 lg:min-h-[calc(100svh-110px)] lg:items-center lg:pt-4 lg:pb-28">
        <div className="relative z-10 col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <Reveal onMount delay={0.1} y={14}>
            <p className="kk-label mb-8 text-night/65 lg:mb-10">{hero.eyebrow}</p>
          </Reveal>

          <SplitLines
            as="h1"
            id="hero-title"
            onMount
            delay={0.2}
            stagger={0.1}
            lines={hero.title}
            className="kk-display text-[clamp(3.05rem,7.6vw,7.25rem)]"
            lineClassNames={[undefined, "pl-[14%]", undefined, "pl-[8%]"]}
          />

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mt-14 lg:max-w-[46rem] lg:justify-start lg:gap-14">
            <Reveal onMount delay={0.75} className="max-w-[34ch]">
              <p className="text-[1.05rem] leading-[1.7] text-night/75">{hero.subtitle}</p>
            </Reveal>
            <Reveal onMount delay={0.9} className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-4">
              <ActionLink>{hero.cta}</ActionLink>
              <a href="#comment-ca-marche" className="kk-link text-[0.92rem] font-medium">
                {hero.secondary}
              </a>
            </Reveal>
          </div>
        </div>

        <figure className="relative col-span-10 col-start-3 mt-20 sm:col-span-7 sm:col-start-6 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0">
          <Parallax offset={36}>
            <Reveal onMount delay={0.3} y={48}>
              <Frame>
                <ArtReveal onMount delay={0.55}>
                  <HeroArt title={hero.art.alt} />
                </ArtReveal>
              </Frame>
            </Reveal>
          </Parallax>
          <Reveal onMount delay={1.35} y={10}>
            <figcaption className="kk-cartel mt-7 grid max-w-[15rem] gap-0.5 border-l border-night/20 pl-4 text-night/70">
              <span className="font-display text-[0.95rem] text-night">{hero.art.number}</span>
              <span className="font-display text-[1.15rem] text-night italic">{hero.art.title}</span>
              <span>{hero.art.detail}</span>
              <span className="mt-1 text-[0.66rem] font-semibold tracking-[0.2em] text-terracotta uppercase">
                {hero.art.verdict}
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </div>

      <p
        aria-hidden="true"
        className="absolute top-1/2 right-[clamp(8px,1.4vw,22px)] hidden origin-center translate-x-1/2 -translate-y-1/2 rotate-90 text-[0.62rem] font-semibold tracking-[0.3em] whitespace-nowrap text-night/40 uppercase xl:block"
      >
        {hero.coordinates}
      </p>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[clamp(20px,5vw,76px)] hidden items-center gap-4 text-[0.62rem] font-semibold tracking-[0.3em] text-night/50 uppercase lg:flex"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-night/15">
          <span className="kk-scroll-cue absolute inset-0 bg-night/70" />
        </span>
        {hero.scroll}
      </div>
    </section>
  );
}
