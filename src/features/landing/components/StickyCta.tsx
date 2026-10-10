"use client";

import { useEffect, useState } from "react";
import { cx } from "../lib/cx";
import { ActionLink } from "./ui";

/** Zones où le bouton fixe gênerait : formulaires, appel final, pied de page. */
const AVOID = ["order", "join", "brands", "site-footer"];

/**
 * Mobile : « Commander » reste accessible dès la sortie du hero,
 * mais s'efface devant les formulaires, l'appel final et le pied de page.
 */
export function StickyCta({ cta, note }: { cta: string; note: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const visible = pastHero && !blocked;

  useEffect(() => {
    const hero = document.getElementById("top");
    const zones = AVOID.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    const inView = new Set<Element>();

    const heroObserver = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting),
    );
    if (hero) heroObserver.observe(hero);

    const zoneObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setBlocked(inView.size > 0);
    });
    zones.forEach((zone) => zoneObserver.observe(zone));

    return () => {
      heroObserver.disconnect();
      zoneObserver.disconnect();
    };
  }, []);

  return (
    <div
      data-visible={visible}
      inert={!visible}
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-kk-ink/10 bg-kk-ivory/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden",
        visible ? "translate-y-0" : "translate-y-[110%]",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.75rem] leading-tight text-kk-ink/70">
          {note}
        </span>
        <ActionLink size="small">{cta}</ActionLink>
      </div>
    </div>
  );
}
