import type { StickyFeaturesSection, StrapiMedia } from "../types";

interface StickyFeaturesProps {
  data: StickyFeaturesSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
}

export function StickyFeatures({ data, renderImage }: StickyFeaturesProps) {
  const { title, subtitle, features } = data;

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:gap-16">
          <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
          <div className="lg:w-2/3 space-y-16">
            {features?.map((feature, index) => (
              <div
                key={feature.id}
                className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              >
                {(feature.icon || feature.image) && (
                  <div className="flex-shrink-0">
                    {feature.icon && (
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
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
                    {!feature.icon &&
                      feature.image &&
                      (renderImage ? (
                        renderImage(feature.image)
                      ) : (
                        <img
                          src={feature.image.url}
                          alt={feature.image.alternativeText || feature.title}
                          className="w-full max-w-md rounded-xl shadow-md"
                        />
                      ))}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                      {feature.title}
                    </h3>
                  </div>
                  {feature.description && (
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                      {feature.description}
                    </p>
                  )}
                  {feature.link && feature.link.href && (
                    <a
                      href={feature.link.href}
                      className="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-500 font-medium hover:underline"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
