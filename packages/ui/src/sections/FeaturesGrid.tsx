import type { FeaturesGridSection, StrapiMedia } from "../types";

interface FeaturesGridProps {
  data: FeaturesGridSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
}

export function FeaturesGrid({ data, renderImage }: FeaturesGridProps) {
  const {
    title,
    subtitle,
    columns = "3",
    features,
    backgroundColor = "white",
  } = data;

  const bgClasses: Record<string, string> = {
    white: "bg-white dark:bg-neutral-950",
    gray: "bg-neutral-50 dark:bg-neutral-900",
    primary: "bg-emerald-600",
    dark: "bg-neutral-900",
  };

  const cardClasses: Record<string, string> = {
    white:
      "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
    gray: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
    primary: "bg-white/10 border border-white/20",
    dark: "bg-neutral-800 border border-neutral-700",
  };

  const textClasses: Record<
    string,
    { title: string; subtitle: string; cardTitle: string; cardDesc: string }
  > = {
    white: {
      title: "text-neutral-900 dark:text-neutral-50",
      subtitle: "text-neutral-600 dark:text-neutral-400",
      cardTitle: "text-neutral-900 dark:text-neutral-50",
      cardDesc: "text-neutral-600 dark:text-neutral-400",
    },
    gray: {
      title: "text-neutral-900 dark:text-neutral-50",
      subtitle: "text-neutral-600 dark:text-neutral-400",
      cardTitle: "text-neutral-900 dark:text-neutral-50",
      cardDesc: "text-neutral-600 dark:text-neutral-400",
    },
    primary: {
      title: "text-white",
      subtitle: "text-emerald-100",
      cardTitle: "text-white",
      cardDesc: "text-emerald-100",
    },
    dark: {
      title: "text-white",
      subtitle: "text-neutral-300",
      cardTitle: "text-white",
      cardDesc: "text-neutral-400",
    },
  };

  const gridCols: Record<string, string> = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  };

  const colors = textClasses[backgroundColor];

  return (
    <section className={`py-20 md:py-28 ${bgClasses[backgroundColor]}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.title}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg ${colors.subtitle}`}>{subtitle}</p>
          )}
        </div>
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {features?.map((feature) => (
            <div
              key={feature.id}
              className={`p-6 rounded-2xl transition-all hover:shadow-lg ${cardClasses[backgroundColor]}`}
            >
              {feature.icon && (
                <div
                  className={`mb-4 w-12 h-12 flex items-center justify-center rounded-xl ${
                    backgroundColor === "primary" || backgroundColor === "dark"
                      ? "bg-white/20"
                      : "bg-emerald-100 dark:bg-emerald-900/30"
                  }`}
                >
                  {renderImage ? (
                    renderImage(feature.icon)
                  ) : (
                    <img
                      src={feature.icon.url}
                      alt={feature.icon.alternativeText || feature.title}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                </div>
              )}
              {feature.image && !feature.icon && (
                <div className="mb-4">
                  {renderImage ? (
                    renderImage(feature.image)
                  ) : (
                    <img
                      src={feature.image.url}
                      alt={feature.image.alternativeText || feature.title}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  )}
                </div>
              )}
              <h3 className={`text-lg font-semibold mb-2 ${colors.cardTitle}`}>
                {feature.title}
              </h3>
              {feature.description && (
                <p className={`text-sm leading-relaxed ${colors.cardDesc}`}>
                  {feature.description}
                </p>
              )}
              {feature.link && feature.link.href && (
                <a
                  href={feature.link.href}
                  className={`inline-flex items-center mt-4 text-sm font-medium ${
                    backgroundColor === "primary" || backgroundColor === "dark"
                      ? "text-white hover:underline"
                      : "text-emerald-600 dark:text-emerald-500 hover:underline"
                  }`}
                >
                  {feature.link.text || "Learn more"}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
