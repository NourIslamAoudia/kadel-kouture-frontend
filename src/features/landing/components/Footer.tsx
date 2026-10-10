import Link from "next/link";
import { BogolanBand } from "../art/LineArt";
import { Monogram } from "../art/Brand";
import type { LandingDictionary } from "../i18n/fr";
import type { Locale } from "../i18n/locales";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * O — Pied de page.
 * TODO : coordonnées de contact et réseaux sociaux, dès qu'ils sont fournis (rien d'inventé ici).
 */
export function Footer({
  t,
  locale,
}: {
  t: LandingDictionary;
  locale: Locale;
}) {
  const { footer: copy } = t;
  const columns = [
    {
      title: copy.service,
      links: [
        { label: copy.links.how, href: "#how" },
        { label: copy.links.services, href: "#services" },
        { label: copy.links.ateliers, href: "#ateliers" },
        { label: copy.links.faq, href: "#faq" },
      ],
    },
    {
      title: copy.join,
      links: [
        { label: copy.links.joinAtelier, href: "/devenir-atelier" },
        { label: copy.links.brands, href: "#brands" },
      ],
    },
    {
      title: copy.legal,
      links: [
        { label: copy.links.legalNotice, href: "/mentions-legales" },
        { label: copy.links.terms, href: "/cgv" },
        { label: copy.links.privacy, href: "/confidentialite" },
      ],
    },
  ];

  return (
    <footer
      id="site-footer"
      className="kk-on-dark bg-kk-ink pt-24 pb-28 text-kk-ivory md:pb-12"
    >
      <div className="kk-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Monogram className="h-10 w-10 text-kk-sand" />
            <p className="mt-8 font-display text-[1.8rem] leading-tight italic">
              {copy.tagline}
            </p>
            <p className="kk-caps mt-4 text-kk-ivory/65">{copy.cities}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-4">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="kk-caps text-kk-ivory/65">{column.title}</p>
                <ul className="mt-5 grid gap-3 text-[0.92rem] text-kk-ivory/80">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("#") ? (
                        <a
                          href={link.href}
                          className="kk-navlink hover:text-kk-ivory"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          prefetch={false}
                          className="kk-navlink hover:text-kk-ivory"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="kk-caps text-kk-ivory/65">{copy.language}</p>
              <LanguageSwitcher
                locale={locale}
                label={copy.language}
                className="mt-5 text-kk-ivory"
              />
            </div>
          </div>
        </div>

        <BogolanBand className="kk-bogolan mt-20" />

        <p
          aria-hidden="true"
          className="mt-12 font-display text-[clamp(2.2rem,9.4vw,9.6rem)] leading-[0.9] tracking-[0.08em] whitespace-nowrap uppercase"
        >
          Kadel Kouture
        </p>

        <p className="mt-10 text-[0.78rem] text-kk-ivory/65">
          © {new Date().getFullYear()} Kadel Kouture. {copy.rights}
        </p>
      </div>
    </footer>
  );
}
