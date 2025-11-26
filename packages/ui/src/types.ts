// Strapi base types
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// CTA Button
export interface CTAButton {
  id: number;
  text?: string;
  href?: string;
  type?: "primary" | "secondary";
}

// SEO Component
export interface SEOData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiMedia;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  structuredData?: Record<string, unknown>;
}

// Feature Item
export interface FeatureItem {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia;
  image?: StrapiMedia;
  link?: CTAButton;
}

// Testimonial Item
export interface TestimonialItem {
  id: number;
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  authorImage?: StrapiMedia;
  rating?: number;
}

// Section Types
export interface HeroSection {
  __component: "sections.hero";
  id: number;
  title: string;
  subtitle?: string;
  image?: StrapiMedia;
  ctas?: CTAButton[];
  layout?: "centered" | "left-aligned" | "image-right" | "image-left";
}

export interface TwoColumnsSection {
  __component: "sections.two-columns";
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  media?: StrapiMedia;
  cta?: CTAButton;
  mediaPosition?: "left" | "right";
  backgroundColor?: "white" | "gray" | "primary" | "dark";
}

export interface StickyFeaturesSection {
  __component: "sections.sticky-features";
  id: number;
  title: string;
  subtitle?: string;
  features?: FeatureItem[];
}

export interface FeaturesGridSection {
  __component: "sections.features-grid";
  id: number;
  title: string;
  subtitle?: string;
  columns?: "2" | "3" | "4";
  features?: FeatureItem[];
  backgroundColor?: "white" | "gray" | "primary" | "dark";
}

export interface CTABannerSection {
  __component: "sections.cta-banner";
  id: number;
  title: string;
  subtitle?: string;
  ctas?: CTAButton[];
  backgroundImage?: StrapiMedia;
  style?: "simple" | "gradient" | "image-background";
}

export interface TestimonialsSection {
  __component: "sections.testimonials";
  id: number;
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
  layout?: "grid" | "carousel" | "single";
}

// Union type for all sections
export type Section =
  | HeroSection
  | TwoColumnsSection
  | StickyFeaturesSection
  | FeaturesGridSection
  | CTABannerSection
  | TestimonialsSection;

// Marketing Page
export interface MarketingPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  seo?: SEOData;
  content?: Section[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Helper type guard functions
export function isHeroSection(section: Section): section is HeroSection {
  return section.__component === "sections.hero";
}

export function isTwoColumnsSection(section: Section): section is TwoColumnsSection {
  return section.__component === "sections.two-columns";
}

export function isStickyFeaturesSection(section: Section): section is StickyFeaturesSection {
  return section.__component === "sections.sticky-features";
}

export function isFeaturesGridSection(section: Section): section is FeaturesGridSection {
  return section.__component === "sections.features-grid";
}

export function isCTABannerSection(section: Section): section is CTABannerSection {
  return section.__component === "sections.cta-banner";
}

export function isTestimonialsSection(section: Section): section is TestimonialsSection {
  return section.__component === "sections.testimonials";
}
