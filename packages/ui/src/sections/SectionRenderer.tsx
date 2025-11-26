import type { Section, StrapiMedia } from "../types";
import { Hero } from "./Hero";
import { TwoColumns } from "./TwoColumns";
import { StickyFeatures } from "./StickyFeatures";
import { FeaturesGrid } from "./FeaturesGrid";
import { CTABanner } from "./CTABanner";
import { Testimonials } from "./Testimonials";

interface SectionRendererProps {
  sections: Section[];
  renderImage?: (image: StrapiMedia) => React.ReactNode;
  renderRichText?: (content: string) => React.ReactNode;
}

export function SectionRenderer({ sections, renderImage, renderRichText }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "sections.hero":
            return <Hero key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} />;
          case "sections.two-columns":
            return <TwoColumns key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} renderRichText={renderRichText} />;
          case "sections.sticky-features":
            return <StickyFeatures key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} />;
          case "sections.features-grid":
            return <FeaturesGrid key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} />;
          case "sections.cta-banner":
            return <CTABanner key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} />;
          case "sections.testimonials":
            return <Testimonials key={`${section.__component}-${section.id}`} data={section} renderImage={renderImage} />;
          default:
            console.warn(`Unknown section type: ${(section as Section).__component}`);
            return null;
        }
      })}
    </>
  );
}
