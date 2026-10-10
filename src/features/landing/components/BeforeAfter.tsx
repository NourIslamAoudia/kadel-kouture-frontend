"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import { BeforeAfterArt, type BeforeAfterKind } from "../art/Garments";
import type { LandingCopy } from "../content/fr";
import { cx } from "../lib/cx";
import { fill } from "../lib/fill";
import { EASE_IN_OUT } from "../motion/ease";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Frame, SectionLabel } from "./ui";

interface CompareProps {
  kind: BeforeAfterKind;
  label: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
}

/**
 * Curseur avant/après. Un vrai <input type="range"> couvre l'image :
 * souris, doigt et clavier fonctionnent sans code supplémentaire.
 */
function Compare({ kind, label, description, beforeLabel, afterLabel }: CompareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [position, setPosition] = useState(50);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();

  // Une fois visible, le fil glisse seul pour montrer qu'on peut le déplacer.
  useEffect(() => {
    if (!inView || reduce) return;
    controls.current = animate(92, 50, {
      duration: 1.8,
      ease: EASE_IN_OUT,
      delay: 0.35,
      onUpdate: (value) => setPosition(value),
    });
    return () => controls.current?.stop();
  }, [inView, reduce]);

  return (
    <div ref={ref} className="relative aspect-[4/5] touch-pan-y select-none">
      <div className="absolute inset-0">
        <BeforeAfterArt kind={kind} state="after" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <BeforeAfterArt kind={kind} state="before" />
      </div>

      <span className="absolute top-3 left-3 rounded-full bg-night/80 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-paper uppercase">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-night uppercase">
        {afterLabel}
      </span>

      {/* Le fil et l'aiguille */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <span className="absolute inset-y-0 -left-px w-[2px] bg-paper shadow-[0_0_0_1px_rgb(26_23_20/0.12)]" />
        <span className="absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-night shadow-[0_10px_30px_-10px_rgb(26_23_20/0.6)]">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        aria-label={label}
        aria-valuetext={`${Math.round(position)} %`}
        onPointerDown={() => controls.current?.stop()}
        onChange={(event) => {
          controls.current?.stop();
          setPosition(Number(event.target.value));
        }}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />
      <p className="sr-only">{description}</p>
    </div>
  );
}

const LAYOUT = [
  { frame: "black" as const, className: "lg:col-span-5 lg:col-start-1", offset: 20 },
  { frame: "oak" as const, className: "lg:col-span-3 lg:col-start-8 lg:mt-24", offset: 60 },
  { frame: "white" as const, className: "lg:col-span-4 lg:col-start-6 lg:-mt-24", offset: 35 },
];

/** 5.6 — Lever le doute sur le résultat : un accrochage façon salon. */
export function BeforeAfter({ copy }: { copy: LandingCopy }) {
  const { beforeAfter } = copy;

  return (
    <section aria-labelledby="before-after-title" className="kk-section overflow-x-clip">
      <div className="kk-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index={beforeAfter.index} label={beforeAfter.label} className="mb-8" />
            <SplitLines
              as="h2"
              id="before-after-title"
              lines={beforeAfter.title}
              className="kk-display text-[clamp(2.8rem,6.4vw,6.4rem)]"
              lineClassNames={[undefined, "pl-[18%]"]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pb-4">
            <p className="flex items-center gap-4 text-[0.95rem] text-night/70">
              <span aria-hidden="true" className="kk-stitch block w-16 text-terracotta opacity-100" />
              {beforeAfter.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-24 sm:grid-cols-2 sm:gap-x-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {beforeAfter.items.map((item, index) => {
            const layout = LAYOUT[index];
            return (
              <figure
                key={item.kind}
                className={cx(
                  layout.className,
                  index === 2 && "sm:col-span-2 sm:mx-auto sm:w-2/3 lg:mx-0 lg:w-auto",
                )}
              >
                <Parallax offset={layout.offset}>
                  <Reveal y={50}>
                    <Frame variant={layout.frame}>
                      <Compare
                        kind={item.kind}
                        label={fill(beforeAfter.slider, { title: item.title })}
                        description={item.description}
                        beforeLabel={beforeAfter.before}
                        afterLabel={beforeAfter.after}
                      />
                    </Frame>
                  </Reveal>
                </Parallax>
                <figcaption className="kk-cartel mt-6 flex items-baseline justify-between gap-4 border-t border-night/15 pt-3">
                  <span className="font-display text-[1.25rem] italic">{item.title}</span>
                  <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-night/50 uppercase">
                    {item.detail}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
