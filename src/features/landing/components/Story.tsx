import { BarcelonaPoster, MaliPoster, ParisPoster } from "../art/CityPosters";
import { BogolanRule } from "../art/Ornaments";
import type { LandingCopy } from "../content/fr";
import { ArtReveal } from "../motion/ArtReveal";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Frame, SectionLabel } from "./ui";

/**
 * 5.8 — Sympathie et unité : l'histoire de Kadja.
 * Texte à valider avec Kadja ; sa photo remplacera le triptyque dès qu'elle est fournie.
 */
export function Story({ copy }: { copy: LandingCopy }) {
  const { story } = copy;
  const posters = [
    { key: "mali", art: <MaliPoster title={story.posters.mali.alt} />, caption: story.posters.mali.caption, offset: 30, className: "mt-0" },
    { key: "paris", art: <ParisPoster title={story.posters.paris.alt} />, caption: story.posters.paris.caption, offset: 70, className: "mt-16" },
    { key: "barcelona", art: <BarcelonaPoster title={story.posters.barcelona.alt} />, caption: story.posters.barcelona.caption, offset: 45, className: "mt-6" },
  ];

  return (
    <section
      id="histoire"
      aria-labelledby="story-title"
      className="kk-section overflow-x-clip bg-forest text-paper"
      style={{ ["--accent" as string]: "var(--color-ochre)" }}
    >
      <div className="kk-container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index={story.index} label={story.label} className="mb-8 text-paper/60" />
            <SplitLines
              as="h2"
              id="story-title"
              lines={story.title}
              className="kk-display text-[clamp(2.7rem,6vw,6rem)]"
              lineClassNames={[undefined, "pl-[10%]", undefined]}
            />
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <p className="text-[1.05rem] leading-relaxed text-paper/80">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <p className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-[2rem] text-ochre italic">{story.signature}</span>
                <span className="text-[0.7rem] font-mono font-bold tracking-[0.12em] text-paper/55 uppercase">
                  {story.signatureRole}
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        <BogolanRule className="mt-20 text-paper/25 lg:mt-28" />

        <div className="mt-16 grid grid-cols-3 gap-[clamp(10px,3vw,48px)] lg:mt-24">
          {posters.map((poster, index) => (
            <figure key={poster.key} className={poster.className}>
              <Parallax offset={poster.offset}>
                <Frame variant="white" mat={false}>
                  <ArtReveal delay={index * 0.15}>{poster.art}</ArtReveal>
                </Frame>
              </Parallax>
              <figcaption className="mt-6 hidden text-[0.66rem] font-mono font-bold tracking-[0.12em] text-paper/55 uppercase sm:block">
                {poster.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
