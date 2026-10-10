import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { HeroVideo } from "./HeroVideo";
import { ActionLink } from "./ui";

/**
 * Hero — la vidéo des quatre œuvres, en ouverture de campagne.
 * Desktop et tablette : plein écran, titre posé en bas à gauche sur un voile d'encre discret.
 * Mobile : la vidéo occupe le haut de l'écran, le titre se lit en dessous sur l'ivoire.
 */
export function Hero({ t }: { t: LandingDictionary }) {
  const { hero } = t;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative -mt-[72px]"
    >
      <div className="relative md:h-[max(680px,calc(100svh-38px))]">
        <div className="relative aspect-[4/5] max-h-[66svh] w-full overflow-hidden bg-kk-beige md:absolute md:inset-0 md:aspect-auto md:max-h-none">
          <HeroVideo
            label={hero.videoLabel}
            scenes={hero.scenes}
            pauseLabel={hero.pause}
            playLabel={hero.play}
          />
          {/* Voile noir léger sur toute la vidéo : ambiance plus feutrée, texte plus lisible. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-kk-ink/20"
          />
          {/* Voiles : lisibilité du menu en haut, du titre en bas (desktop). Jamais plus que nécessaire. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-kk-ink/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-kk-ink/45 to-transparent md:h-[78%] md:from-kk-ink/72 md:via-kk-ink/28"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-kk-ink/40 to-transparent md:block"
          />
        </div>

        <div className="relative md:absolute md:inset-x-0 md:bottom-0">
          <div className="kk-container grid gap-8 pt-9 pb-14 md:grid-cols-12 md:items-end md:gap-x-6 md:pt-0 md:pb-[clamp(104px,15vh,140px)] md:text-kk-white">
            <div className="md:col-span-8 lg:col-span-7">
              <Reveal onMount delay={0.35} y={12}>
                <p className="kk-label mb-6 text-kk-ink/70 md:mb-8 md:text-kk-white/85">
                  {hero.eyebrow}
                </p>
              </Reveal>
              <SplitLines
                as="h1"
                id="hero-title"
                onMount
                delay={0.5}
                stagger={0.12}
                lines={hero.title}
                className="kk-display text-[clamp(2.6rem,6.2vw,6.6rem)] leading-[0.98]"
              />
            </div>

            <div className="md:col-span-4 lg:col-span-4 lg:col-start-9">
              <Reveal onMount delay={1} y={16}>
                <p className="kk-lead max-w-[38ch] text-kk-ink/75 md:text-kk-white/85">
                  {hero.subtitle}
                </p>
              </Reveal>
              <Reveal
                onMount
                delay={1.15}
                y={16}
                className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
              >
                <ActionLink variant="dark" className="md:hidden">
                  {hero.cta}
                </ActionLink>
                <ActionLink variant="light" className="hidden md:inline-flex">
                  {hero.cta}
                </ActionLink>
                <a href="#how" className="kk-link">
                  {hero.secondary}
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
