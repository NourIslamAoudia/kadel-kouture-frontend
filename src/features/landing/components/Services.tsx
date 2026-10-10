"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  CATALOGUE_GARMENTS,
  MIN_BASKET,
  NEW_PRICE,
  QUOTE_TOLERANCE_PERCENT,
  lowestPrice,
  orderHref,
  servicesFor,
  type CatalogueGarment,
  type ServiceCategory,
} from "@/common/services";
import { EmbroideryArt, GarmentArt, UpcyclingArt } from "../art/Garments";
import { ArrowIcon } from "../art/Ornaments";
import type { LandingCopy } from "../content/fr";
import { cx } from "../lib/cx";
import { fill } from "../lib/fill";
import { EASE_IN_OUT, EASE_OUT } from "../motion/ease";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ArtReveal } from "../motion/ArtReveal";
import { ActionLink, Frame, SectionLabel } from "./ui";

const CREATIVE: ServiceCategory[] = ["personnalisation", "upcycling"];

/**
 * 5.5 — Engagement par micro-étapes et ancrage de prix.
 * On choisit d'abord son vêtement, puis on voit les prestations « à partir de »,
 * comparées au prix du neuf. Chaque ligne ouvre la commande présélectionnée.
 */
export function Services({ copy }: { copy: LandingCopy }) {
  const { services } = copy;
  const [garment, setGarment] = useState<CatalogueGarment>("jean");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const list = servicesFor(garment);
  const cheapest = Math.min(...list.map((service) => service.fromPrice));

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    const next = (index + offset + CATALOGUE_GARMENTS.length) % CATALOGUE_GARMENTS.length;
    setGarment(CATALOGUE_GARMENTS[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section id="prestations" aria-labelledby="services-title" className="kk-section bg-sand">
      <div className="kk-container">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index={services.index} label={services.label} className="mb-8" />
            <SplitLines
              as="h2"
              id="services-title"
              lines={services.title}
              className="kk-display text-[clamp(2.6rem,5.6vw,5.6rem)]"
            />
          </div>
        </div>

        {/* Choix du vêtement */}
        <Reveal className="mt-14 lg:mt-20">
          <p className="kk-label mb-5 text-night/55">{services.pick}</p>
          <LayoutGroup>
            <div
              role="tablist"
              aria-label={services.pick}
              className="flex flex-wrap gap-x-[clamp(1.25rem,3.4vw,3.25rem)] gap-y-3 border-b border-night/15 pb-4"
            >
              {CATALOGUE_GARMENTS.map((item, index) => {
                const selected = item === garment;
                return (
                  <button
                    key={item}
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`garment-tab-${item}`}
                    aria-selected={selected}
                    aria-controls="services-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setGarment(item)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cx(
                      "relative pb-2 font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-none transition-colors duration-500",
                      selected ? "text-night italic" : "text-night/30 hover:text-night/60",
                    )}
                  >
                    {services.garments[item]}
                    {selected ? (
                      <motion.span
                        layoutId="garment-underline"
                        aria-hidden="true"
                        className="absolute right-0 -bottom-[17px] left-0 h-[2px] bg-terracotta"
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <div
          id="services-panel"
          role="tabpanel"
          aria-labelledby={`garment-tab-${garment}`}
          className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10"
        >
          {/* L'œuvre et l'ancrage de prix */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <div className="mx-auto max-w-[22rem] lg:mx-0">
              <Frame variant="oak">
                <div className="relative aspect-[4/5]">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={garment}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      exit={{ opacity: 0 }}
                      transition={{ clipPath: { duration: 0.9, ease: EASE_IN_OUT }, opacity: { duration: 0.6 } }}
                    >
                      <GarmentArt kind={garment} title={services.artAlt[garment]} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Frame>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-night/15 pt-6">
                <p className="flex flex-col gap-1.5">
                  <span className="text-[0.7rem] font-mono font-bold tracking-[0.12em] text-night/55 uppercase">
                    {services.anchor[garment]}
                  </span>
                  <span className="font-display text-[2rem] leading-none text-night/45 line-through decoration-terracotta decoration-2">
                    {NEW_PRICE[garment]}&nbsp;€
                  </span>
                </p>
                <p className="flex flex-col gap-1.5">
                  <span className="text-[0.7rem] font-mono font-bold tracking-[0.12em] text-night/55 uppercase">
                    {services.repairFrom}
                  </span>
                  <span className="font-display text-[2rem] leading-none text-terracotta italic">
                    {cheapest}&nbsp;€
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Les prestations */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.ul layout className="border-b border-night/15">
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((service, index) => {
                  const creative = CREATIVE.includes(service.category);
                  const label = services.items[service.id];
                  return (
                    <motion.li
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.035 }}
                    >
                      <Link
                        href={orderHref(service.id, garment)}
                        aria-label={fill(services.order, { label })}
                        className="group relative isolate grid grid-cols-[1fr_auto] items-center gap-x-6 border-t border-night/15 py-5 sm:grid-cols-[1fr_auto_auto] sm:py-6"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-paper transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        />
                        <span className="flex flex-col gap-1.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3">
                          <span className="flex items-center gap-2 text-[0.66rem] font-mono font-bold tracking-[0.12em] text-night/50 uppercase">
                            {services.categories[service.category]}
                            {creative ? (
                              <span className="rounded-full bg-ochre/20 px-2 py-0.5 tracking-[0.14em] text-[#7a5a14]">
                                {services.creativeTag}
                              </span>
                            ) : null}
                          </span>
                          <span className="font-display text-[clamp(1.2rem,1.9vw,1.55rem)] leading-snug">
                            {label}
                          </span>
                        </span>
                        <span className="text-right font-display text-[clamp(1.4rem,2.2vw,1.9rem)] whitespace-nowrap">
                          <span className="mr-1.5 font-body text-[0.7rem] font-mono font-bold tracking-[0.12em] text-night/50 uppercase">
                            {services.from}
                          </span>
                          {service.fromPrice}&nbsp;€
                        </span>
                        <span className="hidden h-10 w-10 -translate-x-2 place-items-center rounded-full bg-night text-paper opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:grid">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>

            <ul className="mt-8 grid gap-2 text-[0.88rem] leading-relaxed text-night/65">
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-terracotta">×</span>
                {services.notes.delivery}
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-terracotta">×</span>
                {services.notes.bundle} {fill(services.notes.minimum, { amount: MIN_BASKET })}
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-terracotta">×</span>
                {fill(services.notes.quote, { percent: QUOTE_TOLERANCE_PERCENT })}
              </li>
            </ul>
          </div>
        </div>

        <CreativeBand copy={copy} />
      </div>
    </section>
  );
}

/** Personnalisation et upcycling mis en avant : ce sont les paniers qui font vivre le modèle. */
function CreativeBand({ copy }: { copy: LandingCopy }) {
  const { services } = copy;
  const { creative } = services;

  const pieces = [
    {
      key: "personnalisation",
      copy: creative.personalise,
      price: lowestPrice("personnalisation"),
      href: orderHref("broderie"),
      art: <EmbroideryArt title={creative.personalise.alt} />,
      frame: "black" as const,
      className: "lg:col-span-5 lg:col-start-1",
    },
    {
      key: "upcycling",
      copy: creative.transform,
      price: lowestPrice("upcycling"),
      href: orderHref("transformation"),
      art: <UpcyclingArt title={creative.transform.alt} />,
      frame: "white" as const,
      className: "lg:col-span-5 lg:col-start-8 lg:mt-48",
    },
  ];

  return (
    <div className="mt-32 lg:mt-48">
      <SplitLines
        as="h3"
        lines={creative.title}
        className="kk-display max-w-[14ch] text-[clamp(2.4rem,4.6vw,4.6rem)]"
      />
      <div className="mt-14 grid gap-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        {pieces.map((piece) => (
          <figure key={piece.key} className={piece.className}>
            <Parallax offset={piece.key === "upcycling" ? 50 : 20}>
              <Frame variant={piece.frame}>
                <ArtReveal>{piece.art}</ArtReveal>
              </Frame>
            </Parallax>
            <Reveal>
              <figcaption className="mt-10 grid gap-4">
                <div className="flex items-baseline justify-between gap-6 border-b border-night/15 pb-4">
                  <p className="font-display text-[clamp(2rem,3vw,2.8rem)] leading-none italic">
                    {piece.copy.title}
                  </p>
                  <p className="font-display text-[1.5rem] whitespace-nowrap">
                    <span className="mr-1.5 font-body text-[0.7rem] font-mono font-bold tracking-[0.12em] text-night/50 uppercase">
                      {services.from}
                    </span>
                    {piece.price}&nbsp;€
                  </p>
                </div>
                <p className="max-w-[40ch] text-night/70">{piece.copy.text}</p>
                <div className="mt-2">
                  <ActionLink href={piece.href} variant="ghost">
                    {piece.copy.cta}
                  </ActionLink>
                </div>
              </figcaption>
            </Reveal>
          </figure>
        ))}
      </div>
    </div>
  );
}
