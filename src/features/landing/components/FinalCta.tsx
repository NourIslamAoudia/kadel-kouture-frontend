import type { LandingDictionary } from "../i18n/fr";
import type { Locale } from "../i18n/locales";
import { fill } from "../lib/fill";
import type { FounderOffer } from "../types";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { LeadForm } from "./LeadForm";
import { ActionLink, EditorialImage } from "./ui";

/**
 * L — La phrase de clôture, en pleine largeur, puis le geste principal face à l'atelier de Barcelone.
 * L'offre fondateur n'est rappelée que si elle est réellement active.
 * En dessous, pour les indécis : le guide gratuit (email ou WhatsApp).
 */
export function FinalCta({
  t,
  locale,
  offer,
}: {
  t: LandingDictionary;
  locale: Locale;
  offer: FounderOffer | null;
}) {
  const { final: copy, lead } = t;
  const active = offer?.active ?? false;

  return (
    <section id="order" aria-labelledby="final-title">
      <div className="kk-section kk-on-dark bg-kk-ink text-kk-ivory">
        <div className="kk-container">
          <SplitLines
            as="h2"
            id="final-title"
            lines={copy.title}
            className="kk-display text-[clamp(2.4rem,5.6vw,5.8rem)]"
            lineClassNames={[undefined, "md:pl-[8%]"]}
          />

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end md:gap-x-6 lg:gap-x-10">
            <figure className="md:col-span-5">
              <EditorialImage
                src="/media/scene-barcelona.jpg"
                alt={copy.imageAlt}
                ratio="16 / 10"
                focus="42% 40%"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
              <figcaption className="kk-caps mt-4 text-kk-ivory/65">
                Barcelona
              </figcaption>
            </figure>

            <div className="md:col-span-6 md:col-start-7 md:pb-10">
              {active && offer ? (
                <Reveal>
                  <p className="max-w-[40ch] border-t border-kk-ivory/15 pt-8 text-[1.05rem] leading-relaxed text-kk-ivory/80">
                    {fill(copy.offer, { discount: offer.discountPercent })}{" "}
                    {offer.remaining !== null ? (
                      <span className="text-kk-sand">
                        {fill(copy.remaining, {
                          count: offer.remaining,
                          limit: offer.limit,
                        })}
                      </span>
                    ) : null}
                  </p>
                </Reveal>
              ) : null}
              <Reveal delay={0.1} className="mt-10">
                <ActionLink variant="light">{copy.cta}</ActionLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-kk-beige">
        <div className="kk-container grid gap-10 py-[clamp(64px,8vw,112px)] lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <p className="kk-display text-[clamp(1.9rem,3vw,2.8rem)]">
              {lead.title}
            </p>
            <p className="kk-lead mt-4 max-w-[38ch] text-kk-ink/72">
              {lead.text}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <LeadForm copy={lead} kind="guide" locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
