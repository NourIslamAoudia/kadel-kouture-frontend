"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import type { LandingCopy } from "../content/fr";
import { cx } from "../lib/cx";
import { EASE_IN_OUT, EASE_OUT } from "../motion/ease";
import { ActionLink } from "./ui";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt=""
        width={52}
        height={40}
        priority
        className="h-9 w-auto"
      />
      <span
        className={cx(
          "font-display text-[1.3rem] leading-none tracking-[-0.01em]",
          light && "text-paper",
        )}
      >
        Kadel <em className="italic">Kouture</em>
      </span>
    </span>
  );
}

/** Menu : se cache quand on descend, revient dès qu'on remonte. */
export function SiteHeader({ copy }: { copy: LandingCopy }) {
  const { nav } = copy;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 40);
    setHidden(current > previous && current > 360);
  });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links = [
    { href: "#comment-ca-marche", label: nav.how },
    { href: "#ateliers", label: nav.workshops },
    { href: "#devenir-atelier", label: nav.join },
    { href: "#marques", label: nav.brands },
  ];

  return (
    <>
      <motion.header
        className={cx(
          "sticky top-0 z-40 transition-[background-color,box-shadow] duration-500",
          scrolled
            ? "bg-paper shadow-[0_1px_0_rgb(26_23_20/0.08)]"
            : "bg-paper/0",
        )}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <div className="kk-container flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label={nav.home}>
            <Wordmark />
          </Link>

          <nav aria-label={nav.label} className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.86rem] font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="kk-link-soft">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ActionLink size="small" className="hidden sm:inline-flex">
              {nav.order}
            </ActionLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="kk-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-night/15 lg:hidden"
            >
              <span className="sr-only">{nav.openMenu}</span>
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-night" />
                <span className="h-px w-3/5 self-end bg-night" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="kk-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            className="fixed inset-0 z-[80] flex flex-col bg-night text-paper"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.75, ease: EASE_IN_OUT }}
          >
            <div className="kk-container flex h-[72px] items-center justify-between">
              <Wordmark light />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-paper/25"
              >
                <span className="sr-only">{nav.closeMenu}</span>
                <span aria-hidden="true" className="relative block h-4 w-4">
                  <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-paper" />
                  <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-paper" />
                </span>
              </button>
            </div>

            <nav aria-label={nav.label} className="kk-container flex flex-1 flex-col justify-center">
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block font-display text-[clamp(2.3rem,9vw,4rem)] leading-[1.05]"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 + index * 0.07 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="kk-container pb-[max(2rem,env(safe-area-inset-bottom))]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
            >
              <ActionLink className="w-full justify-between">{nav.order}</ActionLink>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
