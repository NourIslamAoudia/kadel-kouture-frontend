import { FOUNDER_OFFER } from "@/common/offer";
import type { FounderOfferState } from "@/server/landing";
import type { LandingCopy } from "../content/fr";
import { fill } from "../lib/fill";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { LeadForm } from "./LeadForm";
import { ActionLink } from "./ui";

/** 5.11 — Faire agir, puis rattraper les indécis. */
export function FinalCta({
  copy,
  offer,
}: {
  copy: LandingCopy;
  offer: FounderOfferState;
}) {
  const { finalCta, lead } = copy;

  return (
    <section
      id="commander"
      aria-labelledby="final-title"
      className="kk-section overflow-hidden bg-terracotta text-white"
      style={{ ["--accent" as string]: "var(--color-paper)" }}
    >
      <div className="kk-container">
        <SplitLines
          as="h2"
          id="final-title"
          lines={finalCta.title}
          className="kk-display text-[clamp(2.15rem,7.4vw,7.6rem)]"
          lineClassNames={[undefined, "pl-[12%]", "pl-[4%]"]}
        />

        <div className="mt-16 grid gap-12 border-t border-white/25 pt-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            {offer.active ? (
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                {offer.remaining !== null ? (
                  <p className="flex items-end gap-4">
                    <span className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.8]">
                      {offer.remaining}
                    </span>
                    <span className="max-w-[9rem] pb-1 text-[0.72rem] font-semibold tracking-[0.18em] text-white/80 uppercase">
                      {fill(finalCta.remaining, { limit: FOUNDER_OFFER.limit })}
                    </span>
                  </p>
                ) : null}
                <p className="max-w-[26ch] pb-1 text-[1.05rem] leading-snug">
                  {fill(finalCta.founder, { discount: FOUNDER_OFFER.discountPercent })}
                </p>
              </div>
            ) : (
              <p className="max-w-[36ch] text-[1.05rem]">{finalCta.soldOut}</p>
            )}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <ActionLink variant="light">{finalCta.cta}</ActionLink>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-10 rounded-[2px] bg-black/10 p-[clamp(24px,4vw,56px)] lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.05]">{lead.title}</p>
            <p className="mt-4 max-w-[34ch] text-white/80">{lead.text}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <LeadForm copy={lead} kind="guide" locale={copy.locale} tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
