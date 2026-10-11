"use client";

import { useState } from "react";
import type { LandingDictionary } from "../i18n/fr";
import { cx } from "../lib/cx";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

/**
 * K — Les dernières objections. Les réponses restent dans la page, repliées :
 * lisibles par les moteurs de recherche et les lecteurs d'écran.
 * La hauteur s'anime en CSS (grid-template-rows 0fr → 1fr).
 */
/** Les 6 questions essentielles (cahier des charges : 6 à 8). */
const FAQ_COUNT = 6;

export function Faq({ copy }: { copy: LandingDictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="kk-section bg-kk-white"
    >
      <div className="kk-container grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionLabel className="mb-8 text-kk-ink/70">
            {copy.label}
          </SectionLabel>
          <SplitLines
            as="h2"
            id="faq-title"
            lines={copy.title}
            className="kk-display text-[clamp(2.4rem,4.2vw,4.2rem)]"
          />
        </div>

        <ul className="border-b border-kk-ink/15 lg:col-span-7 lg:col-start-6">
          {copy.items.slice(0, FAQ_COUNT).map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <li key={item.q} className="border-t border-kk-ink/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex w-full items-center gap-6 py-7 text-left"
                  >
                    <span className="flex-1 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-snug transition-opacity duration-300 group-hover:opacity-70">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "relative h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                        isOpen && "rotate-45",
                      )}
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full bg-kk-ink" />
                      <span className="absolute top-0 left-1/2 h-full w-px bg-kk-ink" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={cx(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-8 text-[1rem] leading-relaxed text-kk-ink/72">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
