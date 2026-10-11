import { AnnouncementBar } from "./components/AnnouncementBar";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Founder } from "./components/Founder";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Professionals } from "./components/Professionals";
import { Services } from "./components/Services";
import { StickyCta } from "./components/StickyCta";
import { Story } from "./components/Story";
import { Transformations } from "./components/Transformations";
import { Trust } from "./components/Trust";
import type { LandingDictionary } from "./i18n/fr";
import type { Locale } from "./i18n/locales";
import { RevealObserver } from "./motion/RevealObserver";
import { RememberLocale } from "./components/RememberLocale";
import type { FounderOffer } from "./types";

interface LandingPageProps {
  locale: Locale;
  t: LandingDictionary;
  offer: FounderOffer | null;
}

/**
 * Récit du premier écran à l'appel final :
 * capter, faire se reconnaître, expliquer, prouver, rassurer, faire agir —
 * puis les deux publics professionnels (ateliers, marques).
 */
export function LandingPage({ locale, t, offer }: LandingPageProps) {
  return (
    <div lang={locale}>
      <a
        href="#content"
        className="sr-only z-90 bg-kk-ink px-5 py-3 text-kk-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.skip}
      </a>
      <AnnouncementBar t={t} offer={offer} />
      <Header nav={t.nav} locale={locale} />
      <main id="content" className="overflow-x-clip">
        <Hero t={t} />
        <Story t={t} locale={locale} />
        <HowItWorks t={t} />
        <Services copy={t.services} locale={locale} />
        <Transformations t={t} />
        <Trust t={t} />
        <Founder t={t} />
        <Faq copy={t.faq} />
        <FinalCta t={t} locale={locale} offer={offer} />
        <Professionals t={t} />
      </main>
      <Footer t={t} locale={locale} />
      <StickyCta cta={t.sticky.cta} note={t.sticky.note} />
      <RevealObserver />
      <RememberLocale locale={locale} />
    </div>
  );
}
