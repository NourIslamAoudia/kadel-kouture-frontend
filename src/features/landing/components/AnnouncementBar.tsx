import Link from "next/link";
import type { LandingCopy } from "../content/fr";
import type { FounderOffer } from "../types";
import { fill } from "../lib/fill";

/** 5.1 — Rareté réelle : le compteur vient de la base de commandes. */
export function AnnouncementBar({
  copy,
  offer,
}: {
  copy: LandingCopy;
  /** null si le backend ne répond pas */
  offer: FounderOffer | null;
}) {
  const { announcement } = copy;

  return (
    <div className="relative z-50 bg-night text-paper">
      <p className="kk-container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-[0.78rem] leading-snug">
        {offer?.active ? (
          <>
            <span className="text-[0.66rem] font-light tracking-[0.2em] text-ochre uppercase">
              {announcement.label}
            </span>
            <span className="hidden text-paper/80 md:inline">
              {fill(announcement.text, { discount: offer.discountPercent, limit: offer.limit })}
            </span>
            <span className="text-paper/80 md:hidden">
              {fill(announcement.short, { discount: offer.discountPercent })}
            </span>
            {offer.remaining !== null ? (
              <span className="font-semibold">{fill(announcement.remaining, { count: offer.remaining })}</span>
            ) : null}
          </>
        ) : (
          <span className="text-paper/80">{announcement.soldOut}</span>
        )}
        <Link href="/commander" className="kk-link font-semibold">
          {announcement.cta}
        </Link>
      </p>
    </div>
  );
}
