"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LandingCopy } from "../content/fr";
import { cx } from "../lib/cx";
import { EASE_OUT } from "../motion/ease";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

/**
 * 5.10 — Traiter les dernières objections.
 * Les réponses restent dans la page (repliées) : lisibles par Google
 * et par les lecteurs d'écran.
 */
export function Faq({ copy }: { copy: LandingCopy }) {
  const { faq } = copy;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="kk-section bg-sand">
      <div className="kk-container grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionLabel index={faq.index} label={faq.label} className="mb-8" />
          <SplitLines
            as="h2"
            id="faq-title"
            lines={faq.title}
            className="kk-display text-[clamp(2.4rem,4.2vw,4rem)]"
          />
        </div>

        <ul className="border-b border-night/15 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          {faq.items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <Reveal as="li" key={item.q} delay={index * 0.04} y={16} className="border-t border-night/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex w-full items-baseline gap-5 py-6 text-left sm:gap-8"
                  >
                    <span className="w-7 shrink-0 font-display text-[0.95rem] text-terracotta italic">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-[clamp(1.25rem,2.1vw,1.75rem)] leading-snug transition-transform duration-500 group-hover:translate-x-1">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "relative mt-2 h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                        isOpen && "rotate-[135deg]",
                      )}
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full bg-night" />
                      <span className="absolute top-0 left-1/2 h-full w-px bg-night" />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[58ch] pb-8 pl-12 text-[1rem] leading-relaxed text-night/72 sm:pl-15">
                    {item.a}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
