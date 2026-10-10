import Link from "next/link";
import { BogolanRule } from "../art/Ornaments";
import type { LandingCopy } from "../content/fr";

/** Pied de page. TODO : sélecteur de langues (étape i18n) et liens réseaux sociaux. */
export function SiteFooter({ copy }: { copy: LandingCopy }) {
  const { footer } = copy;

  return (
    <footer className="relative overflow-hidden bg-night pt-24 pb-28 text-paper lg:pb-10">
      <div className="kk-container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-[2rem] leading-tight italic">{footer.tagline}</p>
            <p className="mt-4 text-[0.7rem] font-mono font-bold tracking-[0.12em] text-paper/45 uppercase">
              {footer.cities}
            </p>
          </div>
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2 lg:first-of-type:col-start-6">
              <p className="text-[0.66rem] font-mono font-bold tracking-[0.12em] text-paper/45 uppercase">{column.title}</p>
              <ul className="mt-5 grid gap-3 text-[0.92rem] text-paper/80">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("#") ? (
                      <a href={link.href} className="kk-link-soft hover:text-paper">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="kk-link-soft hover:text-paper">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <BogolanRule className="mt-20 text-paper/20" />

        <p
          aria-hidden="true"
          className="mt-10 font-display text-[clamp(3.4rem,15.5vw,15rem)] leading-[0.85] tracking-[-0.035em] whitespace-nowrap text-paper"
        >
          Kadel <em className="text-ochre italic">Kouture</em>
        </p>

        <p className="mt-10 text-[0.75rem] text-paper/45">
          © {new Date().getFullYear()} Kadel Kouture. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
