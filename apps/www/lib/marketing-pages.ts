import { fetchCollection, fetchCollectionStatic } from "./strapi";
import type { MarketingPage } from "@repo/ui/types";

const MARKETING_PAGE_POPULATE = {
  populate: {
    seo: {
      populate: {
        metaImage: true,
      },
    },
    content: {
      on: {
        "sections.hero": {
          populate: {
            image: true,
            ctas: true,
          },
        },
        "sections.two-columns": {
          populate: {
            media: true,
            cta: true,
          },
        },
        "sections.sticky-features": {
          populate: {
            features: {
              populate: {
                icon: true,
                image: true,
                link: true,
              },
            },
          },
        },
        "sections.features-grid": {
          populate: {
            features: {
              populate: {
                icon: true,
                image: true,
                link: true,
              },
            },
          },
        },
        "sections.cta-banner": {
          populate: {
            backgroundImage: true,
            ctas: true,
          },
        },
        "sections.testimonials": {
          populate: {
            testimonials: {
              populate: {
                authorImage: true,
              },
            },
          },
        },
      },
    },
  },
};

export async function getMarketingPages(): Promise<MarketingPage[]> {
  try {
    const response = await fetchCollection(
      "marketing-pages",
      MARKETING_PAGE_POPULATE,
    );
    return (response.data || []) as MarketingPage[];
  } catch (error) {
    console.error("Error fetching marketing pages:", error);
    return [];
  }
}

export async function getMarketingPageBySlug(
  slug: string,
): Promise<MarketingPage | null> {
  try {
    const response = await fetchCollection("marketing-pages", {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      ...MARKETING_PAGE_POPULATE,
    });

    const pages = response.data as MarketingPage[];
    return pages?.[0] || null;
  } catch (error) {
    console.error(`Error fetching marketing page with slug "${slug}":`, error);
    return null;
  }
}

export async function getAllMarketingPageSlugs(): Promise<string[]> {
  try {
    const response = await fetchCollectionStatic("marketing-pages", {
      fields: ["slug"],
    });

    const pages = response.data as unknown as Pick<MarketingPage, "slug">[];
    return pages?.map((page) => page.slug) || [];
  } catch (error) {
    console.error("Error fetching marketing page slugs:", error);
    return [];
  }
}
