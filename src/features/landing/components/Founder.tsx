import { BogolanBand } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { EditorialImage, SectionLabel } from "./ui";

/**
 * I — L'histoire de Kadja. C'est ici que l'héritage malien prend tout son sens :
 * la carte du Mali à la feuille d'or, œuvre de la vidéo, et la frise bogolan.
 * Texte à valider avec Kadja ; son portrait pourra rejoindre cette section dès qu'il est fourni.
 */
export function Founder({ t }: { t: LandingDictionary }) {
  const { founder: copy } = t;

  return (
    <section
      aria-labelledby="founder-title"
      className="kk-section kk-on-dark overflow-x-clip bg-kk-ink text-kk-ivory"
    >
      <div className="kk-container">
        <div className="grid gap-16 md:grid-cols-12 md:items-center md:gap-x-6 lg:gap-x-10">
          <figure className="md:order-2 md:col-span-5 md:col-start-8">
            <EditorialImage
              src="/media/scene-mali-or.jpg"
              alt={copy.imageAlt}
              ratio="1 / 1"
              focus="54% 42%"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <figcaption className="kk-caps mt-4 text-kk-ivory/65">
              Mali
            </figcaption>
          </figure>

          <div className="md:order-1 md:col-span-7 lg:col-span-6">
            <SectionLabel className="mb-8 text-kk-sand">
              {copy.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="founder-title"
              lines={copy.title}
              className="kk-display text-[clamp(2.4rem,4.4vw,4.4rem)]"
            />
            <div className="mt-10 grid max-w-[52ch] gap-6">
              {copy.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.1 + index * 0.08}>
                  <p className="kk-lead text-kk-ivory/75">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <Reveal
              delay={0.3}
              className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-kk-ivory/15 pt-8"
            >
              <p>
                <span className="block font-display text-[2.4rem] leading-none italic">
                  {copy.signature}
                </span>
                <span className="kk-caps mt-3 block text-kk-ivory/65">
                  {copy.role}
                </span>
              </p>
              <p className="font-display text-[1.25rem] text-kk-sand italic">
                {copy.motto}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6 lg:mt-20">
          <BogolanBand className="kk-bogolan flex-1" />
          <p className="kk-caps shrink-0 text-kk-ivory/65">
            {copy.secondaryCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
