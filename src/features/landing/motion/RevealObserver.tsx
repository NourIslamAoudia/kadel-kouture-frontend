"use client";

import { useEffect } from "react";

const TARGETS =
  '[data-reveal="scroll"], [data-reveal="lines"], [data-reveal="art"]';

/**
 * Un seul IntersectionObserver pour toute la page : il ajoute « is-in » quand
 * un élément entre à l'écran, et le CSS (landing.css) joue l'animation.
 * Rien à hydrater élément par élément : la page reste légère.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-in"));
      root.classList.add("kk-anim-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    root.classList.add("kk-anim-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
