import Link from "next/link";
import type { LandingDictionary } from "../i18n/fr";
import { fill } from "../lib/fill";
import type { FounderOffer } from "../types";

/**
 * A — L'offre fondateur, et seulement si elle est réellement active.
 * Le compteur n'apparaît que si le backend renvoie une vraie valeur.
 */
export function AnnouncementBar({
  t,
  offer,
}: {
  t: LandingDictionary;
  offer: FounderOffer | null;
}) {
  const { announcement } = t;
  const active = offer?.active ?? false;

  return (
    <div className="relative z-[60] bg-kk-ink text-kk-ivory">
      <p className="kk-container flex min-h-[38px] flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-[0.66rem] font-semibold tracking-[0.2em] uppercase">
        {active && offer ? (
          <>
            <span className="hidden sm:inline">
              {fill(announcement.offer, { discount: offer.discountPercent })}
            </span>
            <span className="sm:hidden">
              {fill(announcement.offerShort, {
                discount: offer.discountPercent,
              })}
            </span>
            <span className="hidden text-kk-ivory/70 md:inline">
              {fill(announcement.limit, { limit: offer.limit })}
            </span>
            {offer.remaining !== null ? (
              <span className="text-kk-sand">
                {fill(announcement.remaining, { count: offer.remaining })}
              </span>
            ) : null}
          </>
        ) : (
          <span className="text-kk-ivory/80">{announcement.fallback}</span>
        )}
        <Link
          href="/commander"
          className="hidden underline decoration-kk-ivory/40 underline-offset-4 hover:decoration-kk-ivory sm:inline"
        >
          {announcement.cta}
        </Link>
      </p>
    </div>
  );
}
