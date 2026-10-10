import Link from "next/link";
import { Wordmark } from "@features/landing/art/Brand";
import { SectionLabel } from "@features/landing/components/ui";
import type { LegalDocument } from "./content";

const OTHERS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
];

/** Mise en page commune des pages légales, dans l'identité de la landing. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <main lang="fr" className="min-h-svh bg-kk-ivory text-kk-ink">
      <div className="kk-container flex items-center justify-between gap-6 py-6">
        <Link href="/fr" aria-label="Kadel Kouture, accueil">
          <Wordmark />
        </Link>
        <Link href="/fr" className="kk-link">
          Retour à l&apos;accueil
        </Link>
      </div>

      <article className="kk-container grid gap-12 pt-16 pb-28 lg:grid-cols-12 lg:gap-x-10">
        <header className="lg:col-span-4">
          <SectionLabel className="mb-8 text-kk-ink/70">
            Informations
          </SectionLabel>
          <h1 className="kk-display text-[clamp(2.4rem,4.4vw,4rem)]">
            {doc.title}
          </h1>
          <p className="mt-6 border-l-2 border-kk-sand pl-4 text-[0.88rem] leading-relaxed text-kk-ink/70">
            Brouillon établi à partir du cahier des charges. Les mentions [À
            compléter] et l&apos;ensemble du texte doivent être validés par un
            juriste espagnol avant la mise en ligne.
          </p>
          <nav aria-label="Pages légales" className="mt-10">
            <ul className="grid gap-3 text-[0.92rem]">
              {OTHERS.map((other) => (
                <li key={other.href}>
                  <Link
                    href={other.href}
                    aria-current={
                      other.href === `/${doc.slug}` ? "page" : undefined
                    }
                    className="kk-navlink aria-[current=page]:font-semibold"
                  >
                    {other.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="kk-lead text-kk-ink/80">{doc.intro}</p>
          {doc.sections.map((section) => (
            <section
              key={section.title}
              className="mt-12 border-t border-kk-ink/15 pt-8"
            >
              <h2 className="font-display text-[1.6rem] leading-tight">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-relaxed text-kk-ink/80"
                >
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-4 grid gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 leading-relaxed text-kk-ink/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-kk-sand"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
