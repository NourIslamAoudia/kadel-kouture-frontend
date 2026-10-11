"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "../art/Brand";
import type { LandingDictionary } from "../i18n/fr";
import type { Locale } from "../i18n/locales";
import { cx } from "../lib/cx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ActionLink } from "./ui";

/** Hauteur fixe (72 px) : le hero passe dessous avec -mt-[72px], sans saut au défilement. */
const HEADER_HEIGHT = 72;

/**
 * B — Transparent sur la vidéo, il prend un fond ivoire dès qu'on défile.
 * Le menu mobile s'ouvre comme un rideau (transitions CSS, voir landing.css).
 */
export function Header({
  nav,
  locale,
}: {
  nav: LandingDictionary["nav"];
  locale: Locale;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      // Le focus revient sur le bouton qui a ouvert le menu.
      if (wasOpen.current) menuButtonRef.current?.focus();
      return;
    }
    wasOpen.current = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links = [
    { href: "#how", label: nav.how },
    { href: "#ateliers", label: nav.ateliers },
    { href: "#brands", label: nav.brands },
    { href: "#join", label: nav.join },
  ];

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-50 transition-[background-color,color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          solid
            ? "bg-kk-ivory text-kk-ink shadow-[0_1px_0_rgb(23_23_21/0.1)]"
            : "bg-transparent text-kk-white",
        )}
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="kk-container flex h-full items-center justify-between gap-8">
          <Link href={`/${locale}`} aria-label={nav.home} className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label={nav.label} className="hidden min-[1360px]:block">
            <ul className="flex items-center gap-8 text-[0.68rem] whitespace-nowrap font-semibold tracking-[0.18em] uppercase">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="kk-navlink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <LanguageSwitcher
              locale={locale}
              label={nav.language}
              className="hidden lg:block"
            />
            <ActionLink
              size="small"
              variant={solid ? "dark" : "light"}
              className="hidden sm:inline-flex"
            >
              {nav.order}
            </ActionLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="kk-menu"
              className="kk-caps flex items-center gap-3 min-[1360px]:hidden"
            >
              <span>{nav.menu}</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="kk-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.menu}
        data-open={open}
        inert={!open}
        className="kk-menu fixed inset-0 z-80 flex flex-col bg-kk-ivory text-kk-ink min-[1360px]:hidden"
      >
        <div
          className="kk-container flex items-center justify-between"
          style={{ height: HEADER_HEIGHT }}
        >
          <Wordmark />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="kk-caps"
          >
            {nav.close}
          </button>
        </div>

        <nav
          aria-label={nav.label}
          className="kk-container flex flex-1 flex-col justify-center"
        >
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="kk-menu__link block py-1 font-display text-[clamp(2.2rem,8.5vw,3.6rem)] leading-[1.1]"
                  style={{ "--i": index } as CSSProperties}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="kk-menu__foot kk-container grid gap-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <LanguageSwitcher
            locale={locale}
            label={nav.language}
            onNavigate={() => setOpen(false)}
          />
          <ActionLink className="w-full justify-between">
            {nav.order}
          </ActionLink>
        </div>
      </div>
    </>
  );
}
