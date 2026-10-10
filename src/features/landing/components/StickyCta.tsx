"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LandingCopy } from "../content/fr";
import { EASE_OUT } from "../motion/ease";
import { ActionLink } from "./ui";

/** Mobile : le bouton Commander reste en bas de l'écran dès la sortie du hero (section 5). */
export function StickyCta({ copy }: { copy: LandingCopy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] lg:hidden"
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 rounded-full bg-paper/95 p-1.5 pl-5 shadow-[0_20px_40px_-18px_rgb(26_23_20/0.55)] ring-1 ring-night/10">
            <span className="flex-1 text-[0.72rem] leading-tight text-night/65">{copy.sticky.note}</span>
            <ActionLink size="small">{copy.sticky.cta}</ActionLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
