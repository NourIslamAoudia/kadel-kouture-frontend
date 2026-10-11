import { NEW_PRICE, SERVICES, lowestPrice } from "@/common/services";
import type { LandingDictionary } from "../i18n/fr";
import type { Locale } from "../i18n/locales";
import { formatPrice } from "../lib/price";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { EditorialImage, SectionLabel } from "./ui";

/**
 * C — L'attachement aux vêtements (cahier des charges 5.3) :
 * on nomme la situation, on l'étiquette, puis l'aversion à la perte —
 * « Le remplacer coûterait 80 €. Le réparer, à partir de 12 €. »
 */
export function Story({ t, locale }: { t: LandingDictionary; locale: Locale }) {
  const { story, problem } = t;
  const repairFrom =
    SERVICES.find((service) => service.id === "reprise")?.fromPrice ??
    lowestPrice("reparation");

  return (
    <section
      aria-labelledby="story-title"
      className="kk-section overflow-x-clip"
    >
      <div className="kk-container">
        <SectionLabel className="mb-8 text-kk-ink/70">
          {story.label}
        </SectionLabel>
        <SplitLines
          as="h2"
          id="story-title"
          lines={story.title}
          className="kk-display text-[clamp(2.4rem,5.4vw,5.4rem)]"
          lineClassNames={[undefined, "md:pl-[10%]"]}
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-center md:gap-x-6">
          <figure className="md:col-span-6 lg:col-span-5">
            <EditorialImage
              src="/media/scene-paris.jpg"
              alt={story.imageAlt}
              ratio="5 / 4"
              focus="30% 50%"
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            />
            <figcaption className="kk-caps mt-4 text-kk-ink/70">
              {story.caption}
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7">
            <Reveal>
              <span
                aria-hidden="true"
                className="block h-12 font-display text-[5rem] leading-none text-kk-sand"
              >
                “
              </span>
              <blockquote className="font-display text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.3]">
                {story.quote}
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 font-display text-[1.25rem] text-kk-ink/70 italic">
                {story.aside}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="kk-lead mt-8 max-w-[44ch] text-kk-ink/72">
                {story.body}
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-kk-ink/15 pt-8"
            >
              <p className="flex flex-col gap-3">
                <span className="kk-caps text-kk-ink/70">
                  {problem.replace}
                </span>
                <span className="font-display text-[clamp(2.4rem,3.6vw,3.4rem)] leading-none text-kk-ink/55 line-through decoration-1">
                  {formatPrice(locale, NEW_PRICE.jean)}
                </span>
              </p>
              <p className="flex flex-col gap-3">
                <span className="kk-caps text-kk-ink/70">{problem.repair}</span>
                <span className="font-display text-[clamp(2.4rem,3.6vw,3.4rem)] leading-none italic">
                  {formatPrice(locale, repairFrom)}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
