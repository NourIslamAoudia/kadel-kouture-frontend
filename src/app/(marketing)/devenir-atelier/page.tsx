import type { Metadata } from "next";
import Link from "next/link";
import { StepArt } from "@features/landing/art/StepArt";
import { Frame, SectionLabel } from "@features/landing/components/ui";
import { LeadForm } from "@features/landing/components/LeadForm";
import { fr } from "@features/landing/content/fr";
import { ArtReveal } from "@features/landing/motion/ArtReveal";
import { MotionProvider } from "@features/landing/motion/MotionProvider";
import { SplitLines } from "@features/landing/motion/SplitLines";

export const metadata: Metadata = {
  title: fr.joinPage.meta.title,
  description: fr.joinPage.meta.description,
};

/**
 * En attendant le formulaire d'inscription complet (cahier des charges, section 10),
 * on recueille les ateliers intéressés pour les prévenir à l'ouverture.
 */
export default function JoinPage() {
  const page = fr.joinPage;

  return (
    <MotionProvider>
      <main className="min-h-svh bg-night text-paper" style={{ ["--accent" as string]: "var(--color-ochre)" }}>
        <div className="kk-container flex min-h-svh flex-col py-8">
          <Link href="/" className="kk-link w-fit text-[0.85rem] font-semibold">
            ← {page.back}
          </Link>
          <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel label={page.label} className="mb-8 text-paper/60" />
              <SplitLines
                as="h1"
                onMount
                lines={page.title}
                className="kk-display text-[clamp(3rem,7vw,7rem)]"
                lineClassNames={[undefined, "pl-[12%]"]}
              />
              <p className="mt-10 max-w-[44ch] text-[1.05rem] leading-relaxed text-paper/75">{page.text}</p>
              <div className="mt-14 max-w-xl border-t border-paper/15 pt-10">
                <p className="font-display text-[1.8rem] italic">{page.leadTitle}</p>
                <p className="mt-2 mb-8 text-paper/65">{page.leadText}</p>
                <LeadForm
                  copy={{ ...fr.lead, submit: page.leadSubmit, consent: page.leadConsent }}
                  kind="workshop"
                  locale={fr.locale}
                  tone="dark"
                />
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[24rem] lg:col-span-4 lg:col-start-9">
              <Frame variant="white">
                <ArtReveal onMount delay={0.3}>
                  <StepArt step={1} title={fr.join.artAlt} />
                </ArtReveal>
              </Frame>
            </figure>
          </div>
        </div>
      </main>
    </MotionProvider>
  );
}
