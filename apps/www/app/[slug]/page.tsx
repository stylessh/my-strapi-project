import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getMarketingPageBySlug,
  getAllMarketingPageSlugs,
} from "@/lib/marketing-pages";
import { SectionRenderer } from "@repo/ui/sections";
import type { StrapiMedia } from "@repo/ui/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllMarketingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    keywords: page.seo?.keywords,
    robots: page.seo?.metaRobots,
    alternates: page.seo?.canonicalURL
      ? { canonical: page.seo.canonicalURL }
      : undefined,
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || undefined,
      images: page.seo?.metaImage
        ? [
            {
              url: page.seo.metaImage.url.startsWith("/")
                ? `${strapiUrl}${page.seo.metaImage.url}`
                : page.seo.metaImage.url,
              width: page.seo.metaImage.width,
              height: page.seo.metaImage.height,
              alt: page.seo.metaImage.alternativeText || page.title,
            },
          ]
        : undefined,
    },
  };
}

function renderImage(image: StrapiMedia) {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = image.url.startsWith("/")
    ? `${strapiUrl}${image.url}`
    : image.url;

  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || ""}
      width={image.width}
      height={image.height}
      className="w-full h-auto"
    />
  );
}

export default async function MarketingPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.content && page.content.length > 0 && (
        <SectionRenderer sections={page.content} renderImage={renderImage} />
      )}
    </main>
  );
}
