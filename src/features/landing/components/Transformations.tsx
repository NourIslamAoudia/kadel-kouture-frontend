import { Flat, type FlatKind } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

const KINDS: FlatKind[] = ["jeans", "dress", "jacket"];

/**
 * G — Avant / après.
 * Aucune photo réelle n'est encore disponible : on présente des dessins techniques,
 * clairement signalés comme illustrations. Aucun résultat client n'est inventé.
 * Quand les photos des ateliers arrivent, elles remplacent les dessins (même mise en page).
 */
export function Transformations({ t }: { t: LandingDictionary }) {
  const { transformations: copy } = t;

  return (
    <section
      aria-labelledby="transformations-title"
      className="kk-section bg-kk-beige"
    >
      <div className="kk-container">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-8 text-kk-ink/70">
              {copy.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="transformations-title"
              lines={copy.title}
              className="kk-display text-[clamp(2.4rem,5vw,5rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{copy.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:mt-24 md:grid-cols-3">
          {copy.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.1}
              y={24}
              className="bg-kk-ivory"
            >
              <article>
                <div className="grid grid-cols-2 border-b border-kk-ink/10">
                  {(["before", "after"] as const).map((state) => (
                    <figure
                      key={state}
                      className={
                        state === "after"
                          ? "border-l border-kk-ink/10"
                          : undefined
                      }
                    >
                      <Flat
                        kind={KINDS[index]}
                        state={state}
                        className="mx-auto block h-auto w-full max-w-[220px] px-5 pt-8 text-kk-ink"
                      />
                      <figcaption className="kk-caps px-5 pt-3 pb-6 text-center text-kk-ink/70">
                        {state === "before" ? copy.before : copy.after}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="p-6 md:p-7">
                  <p className="kk-caps text-kk-ink/70">{item.category}</p>
                  <h3 className="mt-3 font-display text-[1.6rem] leading-tight">
                    {item.title}
                  </h3>
                  <dl className="mt-5 grid gap-3 text-[0.94rem] leading-relaxed">
                    <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                      <dt className="text-kk-ink/70">{copy.before}</dt>
                      <dd className="text-kk-ink/72">{item.before}</dd>
                    </div>
                    <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                      <dt className="text-kk-ink/70">{copy.after}</dt>
                      <dd className="text-kk-ink">{item.after}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-[70ch] text-[0.85rem] text-kk-ink/70">
          {copy.disclaimer}
        </p>
      </div>
    </section>
  );
}
