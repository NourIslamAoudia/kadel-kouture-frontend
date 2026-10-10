import { LockIcon, RouteIcon, Seal, ShieldIcon } from "../art/Ornaments";
import type { LandingCopy } from "../content/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

const ICONS = { lock: LockIcon, route: RouteIcon, shield: ShieldIcon };

/** 5.9 — Supprimer le risque. */
export function Guarantee({ copy }: { copy: LandingCopy }) {
  const { guarantee } = copy;

  return (
    <section id="garantie" aria-labelledby="guarantee-title" className="kk-section">
      <div className="kk-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <SectionLabel index={guarantee.index} label={guarantee.label} className="mb-8" />
            <SplitLines
              as="h2"
              id="guarantee-title"
              lines={guarantee.title}
              className="kk-display text-[clamp(2.3rem,4.8vw,4.9rem)]"
              lineClassNames={[undefined, "lg:pl-[8%]"]}
            />
          </div>
          <Reveal className="w-40 justify-self-start sm:w-48 lg:col-span-3 lg:col-start-10 lg:w-56 lg:justify-self-end">
            <Seal text={guarantee.seal} center={guarantee.sealCenter} />
          </Reveal>
        </div>

        <ul className="mt-20 grid border-t border-night/15 md:grid-cols-3 lg:mt-28">
          {guarantee.pillars.map((pillar, index) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 0.1}
                className="relative border-b border-night/15 py-10 md:border-b-0 md:px-8 md:first:pl-0"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="kk-stitch-v absolute top-10 bottom-10 left-0 hidden md:block" />
                ) : null}
                <span className="text-terracotta">
                  <Icon />
                </span>
                <h3 className="mt-6 font-display text-[1.6rem] leading-tight">{pillar.title}</h3>
                <p className="mt-3 max-w-[32ch] text-night/70">{pillar.text}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal>
          <p className="mt-10 max-w-[60ch] text-[0.85rem] text-night/55">{guarantee.fine}</p>
        </Reveal>
      </div>
    </section>
  );
}
