import { lowestPrice } from "@/common/services";
import type { Locale } from "../i18n/locales";
import type { LandingDictionary } from "../i18n/fr";
import { fill } from "../lib/fill";
import { formatPrice } from "../lib/price";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { SectionLabel } from "./ui";

/**
 * D — Les vrais freins du client, et la réponse en face.
 * Tous les prix viennent du catalogue (src/common/services.ts).
 */
export function ProblemSolution({
  t,
  locale,
}: {
  t: LandingDictionary;
  locale: Locale;
}) {
  const { problem } = t;
  const price = (amount: number) => formatPrice(locale, amount);
  const prices = {
    reparation: price(lowestPrice("reparation")),
    ajustement: price(lowestPrice("ajustement")),
    personnalisation: price(lowestPrice("personnalisation")),
    upcycling: price(lowestPrice("upcycling")),
  };

  return (
    <section aria-labelledby="problem-title" className="kk-section bg-kk-white">
      <div className="kk-container">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionLabel className="mb-8 text-kk-ink/70">
              {problem.label}
            </SectionLabel>
            <SplitLines
              as="h2"
              id="problem-title"
              lines={problem.title}
              className="kk-display text-[clamp(2.2rem,4.4vw,4.2rem)]"
            />
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="hidden grid-cols-12 gap-6 pb-5 md:grid">
            <p className="kk-caps col-span-5 text-kk-ink/70">
              {problem.problemHead}
            </p>
            <p className="kk-caps col-span-6 col-start-7 text-kk-ink/70">
              {problem.solutionHead}
            </p>
          </div>
          <ol className="border-t border-kk-ink/15">
            {problem.rows.map((row, index) => (
              <Reveal
                as="li"
                key={row.problem}
                delay={index * 0.05}
                y={14}
                className="border-b border-kk-ink/15"
              >
                <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-6 md:py-9">
                  <p className="flex gap-5 md:col-span-5">
                    <span className="w-6 shrink-0 font-display text-[1rem] text-kk-ink/70 italic">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.25rem,1.7vw,1.6rem)] leading-snug">
                      {row.problem}
                    </span>
                  </p>
                  <p className="pl-11 text-[1rem] leading-relaxed text-kk-ink/72 md:col-span-6 md:col-start-7 md:pl-0">
                    {fill(row.solution, prices)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
