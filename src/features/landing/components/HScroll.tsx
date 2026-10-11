"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "../lib/cx";

interface HScrollProps {
  children: React.ReactNode;
  /** Nom de la liste pour les lecteurs d'écran. */
  label: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Rangée horizontale : on fait glisser (doigt, trackpad, Maj + molette) ou on utilise les flèches.
 * Chaque enfant direct est un <li> qui s'aligne sur un point d'arrêt (scroll-snap).
 * Le défilement vertical de la page n'est jamais détourné.
 */
export function HScroll({
  children,
  label,
  prevLabel,
  nextLabel,
  className,
  tone = "light",
}: HScrollProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const update = () =>
      setEdges({
        start: list.scrollLeft <= 4,
        end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 4,
      });
    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (direction: 1 | -1) => {
    const list = ref.current;
    if (!list) return;
    const card = list.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : list.clientWidth * 0.8;
    list.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const button = cx(
    "grid h-11 w-11 place-items-center rounded-full border transition-opacity duration-300 disabled:opacity-30",
    tone === "dark" ? "border-kk-ivory/40" : "border-kk-ink/30",
  );

  return (
    <div className={className}>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="kk-hscroll -mx-[clamp(20px,4.5vw,64px)] flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[clamp(20px,4.5vw,64px)] px-[clamp(20px,4.5vw,64px)] pb-2"
      >
        {children}
      </ul>
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={edges.start}
          aria-label={prevLabel}
          className={button}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <path d="M13 8H3m4-4L3 8l4 4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={edges.end}
          aria-label={nextLabel}
          className={button}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
