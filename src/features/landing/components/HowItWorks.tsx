"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { StepArt } from "../art/StepArt";
import type { LandingCopy } from "../content/fr";
import { cx } from "../lib/cx";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useSvgId } from "../art/useSvgId";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { ActionLink, Frame, SectionLabel } from "./ui";

const THREAD = "M0 50C80 12 160 88 250 50S420 12 500 50 670 88 750 50 920 12 1000 50";

/** Le fil qui relie les étapes : il se coud au fur et à mesure du défilement. */
function Thread({ progress }: { progress: MotionValue<number> }) {
  const id = useSvgId("thread");

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-[46%] left-0 h-28 w-full -translate-y-1/2 text-night"
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="100">
          <motion.path d={THREAD} fill="none" stroke="#fff" strokeWidth="24" style={{ pathLength: progress }} />
        </mask>
      </defs>
      <path
        d={THREAD}
        fill="none"
        stroke="currentColor"
        strokeOpacity=".14"
        strokeWidth="1.5"
        strokeDasharray="7 7"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={THREAD}
        fill="none"
        stroke="var(--color-terracotta)"
        strokeWidth="2"
        strokeDasharray="7 7"
        vectorEffect="non-scaling-stroke"
        mask={`url(#${id})`}
      />
    </svg>
  );
}

function StepCard({
  index,
  step,
}: {
  index: number;
  step: LandingCopy["how"]["steps"][number];
}) {
  return (
    <article className="relative">
      <p
        aria-hidden="true"
        className="kk-outline mb-4 font-display text-[clamp(3.6rem,6vw,6rem)] leading-none"
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <Frame variant={index % 2 === 1 ? "oak" : "black"}>
        <StepArt step={index} title={step.alt} />
      </Frame>
      <h3 className="mt-7 font-display text-[clamp(1.45rem,1.9vw,1.75rem)] leading-[1.15]">
        <span className="sr-only">{index + 1}. </span>
        {step.title}
      </h3>
      <p className="mt-3 max-w-[30ch] text-[0.97rem] leading-relaxed text-night/70">{step.text}</p>
    </article>
  );
}

/**
 * 5.4 — Réduire l'effort perçu.
 * Sur grand écran, la section se fige et les étapes défilent à l'horizontale,
 * comme un mur de galerie. Sur mobile, une liste verticale cousue.
 */
export function HowItWorks({ copy }: { copy: LandingCopy }) {
  const { how } = copy;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const horizontal = wide && !reduce;

  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!horizontal || !track) return;

    const measure = () => {
      const next = Math.max(track.scrollWidth - window.innerWidth, 0);
      distanceValue.set(next);
      setDistance(next);
    };
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal, distanceValue]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distanceValue.get());

  return (
    <section
      ref={sectionRef}
      id="comment-ca-marche"
      aria-labelledby="how-title"
      className="relative"
      style={horizontal ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={cx(horizontal && "sticky top-0 h-svh overflow-hidden")}>
        <motion.div
          ref={trackRef}
          style={horizontal ? { x } : undefined}
          className={cx(
            "relative",
            horizontal
              ? "flex h-full w-max items-center gap-[5vw] pr-[8vw] pl-[clamp(20px,5vw,76px)]"
              : "kk-container kk-section",
          )}
        >
          <div className={cx("relative z-10", horizontal ? "w-[30vw] shrink-0" : "mb-16 max-w-xl")}>
            <SectionLabel index={how.index} label={how.label} className="mb-8" />
            <SplitLines
              as="h2"
              id="how-title"
              lines={how.title}
              className="kk-display text-[clamp(2.6rem,5.2vw,5.4rem)]"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[38ch] text-[1.02rem] leading-relaxed text-night/72">{how.intro}</p>
            </Reveal>
          </div>

          <ol
            className={cx(
              "relative z-10",
              horizontal
                ? "flex items-center gap-[5vw]"
                : "grid gap-20 border-l border-dashed border-night/25 pl-8 sm:pl-12",
            )}
          >
            {/* Le fil ne relie que les étapes : il passe derrière les cadres, jamais sur les titres. */}
            {horizontal ? <Thread progress={scrollYProgress} /> : null}
            {how.steps.map((step, index) => (
              <li
                key={step.title}
                className={cx(
                  "relative",
                  horizontal
                    ? cx("w-[clamp(250px,21vw,340px)] shrink-0", index % 2 === 1 ? "mt-[14vh]" : "-mt-[10vh]")
                    : "max-w-[22rem]",
                  !horizontal && index % 2 === 1 && "sm:ml-auto sm:mr-[6%]",
                )}
              >
                {horizontal ? (
                  <StepCard index={index} step={step} />
                ) : (
                  <Reveal>
                    <StepCard index={index} step={step} />
                  </Reveal>
                )}
              </li>
            ))}
          </ol>

          <div className={cx("relative z-10", horizontal ? "w-[24vw] shrink-0" : "mt-20")}>
            <SplitLines
              as="p"
              lines={how.outro.title}
              className="kk-display text-[clamp(2.2rem,3.6vw,3.6rem)]"
            />
            <div className="mt-8">
              <ActionLink>{how.outro.cta}</ActionLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
