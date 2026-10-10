import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@features/landing/art/Brand";
import { StepIcon } from "@features/landing/art/LineArt";
import { LeadForm } from "@features/landing/components/LeadForm";
import { SectionLabel } from "@features/landing/components/ui";
import { getDictionary } from "@features/landing/i18n/config";
import { SplitLines } from "@features/landing/motion/SplitLines";

const page = {
  meta: {
    title: "Devenir atelier partenaire — Kadel Kouture",
    description:
      "Couturier ou atelier à Barcelone ? Rejoins le réseau Kadel Kouture et reçois des commandes avec photos, mensurations et consignes claires.",
  },
  label: "Ateliers partenaires",
  title: ["Le réseau", "*s'agrandit.*"],
  text: "Le formulaire d'inscription des ateliers ouvre très bientôt. Laisse ton email ou ton WhatsApp : on te prévient dès qu'il est en ligne.",
  leadTitle: "Être prévenu",
  leadText: "Un seul message, le jour de l'ouverture.",
  leadSubmit: "Me prévenir",
  leadConsent:
    "J'accepte d'être contacté par Kadel Kouture au sujet du réseau d'ateliers.",
  back: "Retour à l'accueil",
};

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

/**
 * En attendant le formulaire d'inscription complet (cahier des charges, section 10),
 * on recueille les ateliers intéressés pour les prévenir à l'ouverture.
 */
export default function JoinPage() {
  const t = getDictionary("fr");

  return (
    <main lang="fr" className="kk-on-dark min-h-svh bg-kk-ink text-kk-ivory">
      <div className="kk-container flex min-h-svh flex-col py-8">
        <div className="flex items-center justify-between gap-6">
          <Link href="/fr" aria-label="Kadel Kouture, accueil">
            <Wordmark />
          </Link>
          <Link href="/fr" className="kk-link">
            {page.back}
          </Link>
        </div>
        <div className="grid flex-1 items-center gap-16 py-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <SectionLabel className="mb-8 text-kk-sand">
              {page.label}
            </SectionLabel>
            <SplitLines
              as="h1"
              onMount
              lines={page.title}
              className="kk-display text-[clamp(3rem,7vw,6.6rem)]"
            />
            <p className="kk-lead mt-10 max-w-[44ch] text-kk-ivory/75">
              {page.text}
            </p>
          </div>
          <div className="lg:col-span-5">
            <StepIcon step={1} className="mb-10 h-14 w-14 text-kk-sand" />
            <div className="border-t border-kk-ivory/15 pt-10">
              <p className="font-display text-[1.8rem] italic">
                {page.leadTitle}
              </p>
              <p className="mt-2 mb-8 text-kk-ivory/65">{page.leadText}</p>
              <LeadForm
                copy={{
                  ...t.lead,
                  submit: page.leadSubmit,
                  consent: page.leadConsent,
                }}
                kind="workshop"
                locale="fr"
                tone="dark"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
