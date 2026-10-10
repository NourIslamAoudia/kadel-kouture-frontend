"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "../lib/cx";

/** La vidéo du hero : quatre scènes de 5 secondes (bogolan, Paris, Barcelone, Mali). */
const SCENE_SECONDS = 5;
/** Le poster correspond à cette seconde : le passage du poster à la vidéo est invisible. */
const START_AT = 1;

/** Grand écran : version agrandie (lanczos) et affinée. Mobile et tablette : le fichier d'origine, plus léger. */
const SOURCES = {
  large: [{ src: "/media/kadel-hero-hd.mp4", type: "video/mp4" }],
  small: [
    { src: "/media/kadel-hero.webm", type: "video/webm" },
    { src: "/media/kadel-hero.mp4", type: "video/mp4" },
  ],
};

const HERO_POSTER = "/media/kadel-hero-poster.jpg";

interface HeroVideoProps {
  label: string;
  scenes: string[];
  pauseLabel: string;
  playLabel: string;
}

/**
 * Lecture automatique, muette, en boucle et en ligne sur mobile.
 * - Le poster (image optimisée, prioritaire) est affiché tout de suite : aucun décalage de mise en page.
 * - La vidéo n'est chargée qu'après l'affichage, et jamais si l'utilisateur réduit les animations
 *   ou économise ses données : le poster reste alors en place.
 * - Un bouton discret permet de mettre en pause (WCAG 2.2.2).
 */
export function HeroVideo({
  label,
  scenes,
  pauseLabel,
  playLabel,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const loaded = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scene, setScene] = useState(0);

  const load = useCallback(() => {
    const video = videoRef.current;
    if (!video || loaded.current) return video;
    loaded.current = true;
    const large = window.matchMedia("(min-width: 1024px)").matches;
    for (const source of large ? SOURCES.large : SOURCES.small) {
      const element = document.createElement("source");
      element.src = source.src;
      element.type = source.type;
      video.appendChild(element);
    }
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.currentTime = START_AT;
      },
      { once: true },
    );
    video.load();
    return video;
  }, []);

  const play = useCallback(() => {
    const video = load();
    video?.play().catch(() => setPlaying(false));
  }, [load]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduce || saveData) return;

    // La vidéo attend la fin du chargement de la page : elle ne retarde ni l'affichage ni l'interaction.
    let idle = 0;
    const start = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(play, { timeout: 1500 })
        : window.setTimeout(play, 200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, [play]);

  // Barre de progression de la scène en cours, synchronisée sur la vidéo.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video) {
        const time = video.currentTime;
        const index = Math.min(
          scenes.length - 1,
          Math.floor(time / SCENE_SECONDS),
        );
        setScene((current) => (current === index ? current : index));
        const bar = barRefs.current[index];
        if (bar)
          bar.style.transform = `scaleX(${(time % SCENE_SECONDS) / SCENE_SECONDS})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, scenes.length]);

  const toggle = () => {
    const video = videoRef.current;
    if (playing && video) {
      video.pause();
    } else {
      play();
    }
  };

  return (
    <>
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => {
          setPlaying(true);
          setVisible(true);
        }}
        onPause={() => setPlaying(false)}
        className={cx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <p className="sr-only">{label}</p>

      {/* Index des quatre scènes, comme le chapitrage d'un film de campagne */}
      <div className="absolute right-[clamp(20px,4.5vw,64px)] bottom-5 left-[clamp(20px,4.5vw,64px)] z-10 flex items-end gap-6 text-kk-white md:bottom-8">
        <ol className="flex flex-1 gap-3 md:gap-6" aria-hidden="true">
          {scenes.map((name, index) => (
            <li key={name} className="flex-1">
              <span
                className={cx(
                  "flex items-baseline gap-2 text-[0.6rem] font-semibold tracking-[0.2em] uppercase transition-opacity duration-700",
                  index === scene ? "opacity-100" : "opacity-55",
                )}
              >
                <span className="font-display text-[0.8rem] tracking-normal normal-case italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline">{name}</span>
              </span>
              <span className="mt-2 block h-px w-full overflow-hidden bg-kk-white/30">
                <span
                  ref={(node) => {
                    barRefs.current[index] = node;
                  }}
                  className="block h-full w-full origin-left bg-kk-white"
                  // La scène en cours est animée image par image (requestAnimationFrame).
                  style={
                    index === scene && playing
                      ? undefined
                      : { transform: index < scene ? "scaleX(1)" : "scaleX(0)" }
                  }
                />
              </span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? pauseLabel : playLabel}
          className="-mb-2.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-kk-white/50 text-kk-white transition-colors hover:bg-kk-white/15"
        >
          {playing ? (
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              aria-hidden="true"
              fill="currentColor"
            >
              <rect x="2" y="1.5" width="2.4" height="9" />
              <rect x="7.6" y="1.5" width="2.4" height="9" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
