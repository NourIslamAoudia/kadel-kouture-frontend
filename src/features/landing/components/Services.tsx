"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import {
  CATALOGUE_GARMENTS,
  MIN_BASKET,
  NEW_PRICE,
  QUOTE_TOLERANCE_PERCENT,
  orderHref,
  servicesFor,
  type CatalogueGarment,
  type CatalogueService,
} from "@/common/services";
import type { LandingDictionary } from "../i18n/fr";
import type { Locale } from "../i18n/locales";
import { cx } from "../lib/cx";
import { emphasis } from "../lib/emphasis";
import { fill } from "../lib/fill";
import { formatPrice } from "../lib/price";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

const CREATIVE = new Set(["personnalisation", "upcycling"]);

function ServiceRow({
  service,
  garment,
  copy,
  locale,
  index,
  dark = false,
}: {
  service: CatalogueService;
  garment: CatalogueGarment;
  copy: LandingDictionary["services"];
  locale: Locale;
  index: number;
  dark?: boolean;
}) {
  return (
    <li
      className={cx(
        "kk-row-in border-b",
        dark ? "border-kk-ivory/15" : "border-kk-ink/12",
      )}
      style={{ "--i": index } as CSSProperties}
    >
      <Link
        href={orderHref(service.id, garment)}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5"
      >
        {/* « Commander : » pour les lecteurs d'écran ; le texte visible reste dans le nom du lien. */}
        <span className="sr-only">{fill(copy.order, { label: "" })}</span>
        <span className="flex flex-col gap-1.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5">
          <span
            className={cx(
              "kk-caps",
              dark ? "text-kk-ivory/65" : "text-kk-ink/70",
            )}
          >
            {copy.categories[service.category]}
          </span>
          <span className="text-[1.02rem] leading-snug font-medium">
            {copy.items[service.id]}
          </span>
        </span>
        <span className="flex items-center gap-4 whitespace-nowrap">
          <span className="text-right">
            <span
              className={cx(
                "mr-2 text-[0.7rem]",
                dark ? "text-kk-ivory/65" : "text-kk-ink/70",
              )}
            >
              {copy.from}
            </span>
            <span className="font-display text-[1.5rem]">
              {formatPrice(locale, service.fromPrice)}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-4 bg-current opacity-40 transition-[width,opacity] duration-500 group-hover:w-8 group-hover:opacity-100 sm:block"
          />
        </span>
      </Link>
    </li>
  );
}

/**
 * F — Prestations et prix. On choisit d'abord son vêtement (micro-engagement),
 * puis on voit les prix « à partir de » comparés au neuf. Chaque ligne ouvre
 * le formulaire de commande avec la prestation présélectionnée.
 */
export function Services({
  copy,
  locale,
}: {
  copy: LandingDictionary["services"];
  locale: Locale;
}) {
  const [garment, setGarment] = useState<CatalogueGarment>("jean");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const list = servicesFor(garment);
  const repairs = list.filter((service) => !CREATIVE.has(service.category));
  const creations = list.filter((service) => CREATIVE.has(service.category));
  const cheapest = Math.min(...list.map((service) => service.fromPrice));

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const offset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    const next =
      (index + offset + CATALOGUE_GARMENTS.length) % CATALOGUE_GARMENTS.length;
    setGarment(CATALOGUE_GARMENTS[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="kk-section bg-kk-white"
    >
      <div className="kk-container">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-8 text-kk-ink/70">
              {copy.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="services-title"
              lines={copy.title}
              className="kk-display text-[clamp(2.4rem,5vw,5rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{copy.intro}</p>
          </Reveal>
        </div>

        {/* Choix du vêtement */}
        <Reveal className="mt-16 md:mt-24">
          <p className="kk-caps mb-5 text-kk-ink/70">{copy.pick}</p>
          <div
            role="tablist"
            aria-label={copy.pick}
            className="flex flex-wrap gap-x-[clamp(1.25rem,3vw,3rem)] gap-y-2 border-b border-kk-ink/15"
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
                    "relative pb-4 font-display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-none transition-colors duration-500",
                    selected
                      ? "text-kk-ink italic"
                      : "text-kk-ink/70 hover:text-kk-ink/80",
                  )}
                >
                  {copy.garments[item]}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute right-0 -bottom-px left-0 h-px origin-left bg-kk-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.95rem] text-kk-ink/70">
            <span>
              {copy.anchor[garment]}{" "}
              <span className="font-display text-[1.2rem] line-through decoration-1">
                {formatPrice(locale, NEW_PRICE[garment])}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-px w-6 bg-kk-ink/25 sm:block"
            />
            <span>
              {copy.repairFrom}{" "}
              <span className="font-display text-[1.2rem] text-kk-ink italic">
                {formatPrice(locale, cheapest)}
              </span>
            </span>
          </p>
        </Reveal>

        <div
          id="services-panel"
          role="tabpanel"
          aria-labelledby={`garment-tab-${garment}`}
          className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-10"
        >
          <div className="lg:col-span-7">
            <p className="kk-caps border-b border-kk-ink/15 pb-4 text-kk-ink/70">
              {copy.repairGroup}
            </p>
            <ul>
              {repairs.map((service, index) => (
                <ServiceRow
                  key={`${garment}-${service.id}`}
                  service={service}
                  garment={garment}
                  copy={copy}
                  locale={locale}
                  index={index}
                />
              ))}
            </ul>

            <ul className="mt-10 grid gap-2 text-[0.88rem] leading-relaxed text-kk-ink/70">
              <li>
                {copy.notes.bundle}{" "}
                {fill(copy.notes.minimum, {
                  amount: formatPrice(locale, MIN_BASKET),
                })}
              </li>
              <li>
                {fill(copy.notes.quote, { percent: QUOTE_TOLERANCE_PERCENT })}
              </li>
            </ul>
          </div>

          {/* Créer : la personnalisation et l'upcycling, mis en avant */}
          <div className="kk-on-dark bg-kk-ink text-kk-ivory lg:col-span-5">
            <div className="relative aspect-[16/9] overflow-hidden bg-kk-beige">
              <Image
                src="/media/scene-bogolan.jpg"
                alt={copy.create.imageAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "45% 30%" }}
              />
            </div>
            <div className="p-[clamp(24px,3.5vw,44px)]">
              <p className="kk-label text-kk-sand">{copy.create.label}</p>
              <h3 className="kk-display mt-6 text-[clamp(2rem,3vw,2.8rem)]">
                {copy.create.title.map((line, index) => (
                  <span key={index} className="block">
                    {emphasis(line)}
                  </span>
                ))}
              </h3>
              <p className="mt-5 max-w-[40ch] text-[0.98rem] leading-relaxed text-kk-ivory/70">
                {copy.create.text}
              </p>
              <ul className="mt-8 border-t border-kk-ivory/15">
                {creations.map((service, index) => (
                  <ServiceRow
                    key={`${garment}-${service.id}`}
                    service={service}
                    garment={garment}
                    copy={copy}
                    locale={locale}
                    index={index}
                    dark
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
