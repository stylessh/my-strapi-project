import { Metadata } from "next";
import { getMarketingPageBySlug } from "@/lib/marketing-pages";
import { SectionRenderer } from "@repo/ui/sections";
import type { StrapiMedia } from "@repo/ui/types";

const HOME_SLUG = "home";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug(HOME_SLUG);

  if (!page) {
    return {
      title: "Home",
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

export default async function Home() {
  const page = await getMarketingPageBySlug(HOME_SLUG);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a Marketing Page with slug &quot;home&quot; in Strapi to
            display content here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {page.content && page.content.length > 0 && (
        <SectionRenderer sections={page.content} renderImage={renderImage} />
      )}
    </main>
  );
}
