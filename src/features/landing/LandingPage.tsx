import { AnnouncementBar } from "./components/AnnouncementBar";
import { BeforeAfter } from "./components/BeforeAfter";
import { Brands } from "./components/Brands";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Guarantee } from "./components/Guarantee";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { JoinNetwork } from "./components/JoinNetwork";
import { Problem } from "./components/Problem";
import { Services } from "./components/Services";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StickyCta } from "./components/StickyCta";
import { Story } from "./components/Story";
import { Workshops } from "./components/Workshops";
import type { LandingCopy } from "./content/fr";
import type { FounderOffer } from "./types";
import { MotionProvider } from "./motion/MotionProvider";

interface LandingPageProps {
  copy: LandingCopy;
  offer: FounderOffer | null;
  savedGarments: number | null;
}

/**
 * Ordre fixe du cahier des charges (section 5) :
 * capter, faire se reconnaître, rassurer, prouver, faire agir.
 */
export function LandingPage({ copy, offer, savedGarments }: LandingPageProps) {
  return (
    <MotionProvider>
      <a
        href="#contenu"
        className="sr-only z-[90] rounded-full bg-night px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {copy.skipLink}
      </a>
      <AnnouncementBar copy={copy} offer={offer} />
      <SiteHeader copy={copy} />
      <main id="contenu" className="overflow-x-clip">
        <Hero copy={copy} />
        <Problem copy={copy} />
        <HowItWorks copy={copy} />
        <Services copy={copy} />
        <BeforeAfter copy={copy} />
        <Workshops copy={copy} savedGarments={savedGarments} />
        <Story copy={copy} />
        <Guarantee copy={copy} />
        <Faq copy={copy} />
        <FinalCta copy={copy} offer={offer} />
        <JoinNetwork copy={copy} />
        <Brands copy={copy} />
      </main>
      <SiteFooter copy={copy} />
      <StickyCta copy={copy} />
    </MotionProvider>
  );
}
