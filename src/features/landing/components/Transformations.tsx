import { Flat, type FlatKind } from "../art/LineArt";
import type { LandingDictionary } from "../i18n/fr";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { HScroll } from "./HScroll";
import { SectionLabel } from "./ui";

const KINDS: FlatKind[] = ["jeans", "dress", "jacket"];

/**
 * G — Avant / après, en rangée horizontale.
 * Pas encore de photos réelles : dessins techniques signalés comme illustrations.
 * Aucun résultat client n'est inventé ; les photos des ateliers prendront leur place.
 */
export function Transformations({ t }: { t: LandingDictionary }) {
  const { transformations: copy, carousel } = t;

  return (
    <section
      aria-labelledby="transformations-title"
      className="kk-section overflow-x-clip bg-kk-beige"
    >
      <div className="kk-container">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="mb-6 text-kk-ink/70">
              {copy.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="transformations-title"
              lines={copy.title}
              className="kk-display text-[clamp(2.2rem,4.4vw,4.4rem)]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="kk-lead text-kk-ink/72">{copy.intro}</p>
          </Reveal>
        </div>

        <HScroll
          label={copy.label}
          prevLabel={carousel.prev}
          nextLabel={carousel.next}
          className="mt-12 md:mt-16"
        >
          {copy.items.map((item, index) => (
            <li key={item.title} className="w-[min(84vw,420px)] bg-kk-ivory">
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
                        className="mx-auto block h-auto w-full max-w-[190px] px-5 pt-6 text-kk-ink"
                      />
                      <figcaption className="kk-caps px-5 pt-2 pb-5 text-center text-kk-ink/70">
                        {state === "before" ? copy.before : copy.after}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="p-6">
                  <p className="kk-caps text-kk-ink/70">{item.category}</p>
                  <h3 className="mt-2 font-display text-[1.5rem] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-kk-ink/72">
                    {item.before} {item.after}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </HScroll>

        <p className="mt-6 max-w-[60ch] text-[0.85rem] text-kk-ink/70">
          {copy.disclaimer}
        </p>
      </div>
    </section>
  );
}
