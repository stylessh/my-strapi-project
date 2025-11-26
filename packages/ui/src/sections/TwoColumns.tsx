import type { TwoColumnsSection, StrapiMedia } from "../types";

interface TwoColumnsProps {
  data: TwoColumnsSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
  renderRichText?: (content: string) => React.ReactNode;
}

export function TwoColumns({
  data,
  renderImage,
  renderRichText,
}: TwoColumnsProps) {
  const {
    title,
    subtitle,
    content,
    media,
    cta,
    mediaPosition = "right",
    backgroundColor = "white",
  } = data;

  const bgClasses: Record<string, string> = {
    white: "bg-white dark:bg-neutral-950",
    gray: "bg-neutral-50 dark:bg-neutral-900",
    primary: "bg-emerald-600",
    dark: "bg-neutral-900",
  };

  const textClasses: Record<
    string,
    { title: string; subtitle: string; content: string }
  > = {
    white: {
      title: "text-neutral-900 dark:text-neutral-50",
      subtitle: "text-neutral-600 dark:text-neutral-400",
      content: "prose-neutral dark:prose-invert",
    },
    gray: {
      title: "text-neutral-900 dark:text-neutral-50",
      subtitle: "text-neutral-600 dark:text-neutral-400",
      content: "prose-neutral dark:prose-invert",
    },
    primary: {
      title: "text-white",
      subtitle: "text-emerald-100",
      content: "prose-invert",
    },
    dark: {
      title: "text-white",
      subtitle: "text-neutral-300",
      content: "prose-invert",
    },
  };

  const colors = textClasses[backgroundColor];

  return (
    <section className={`py-20 md:py-28 ${bgClasses[backgroundColor]}`}>
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col gap-12 lg:gap-16 items-center ${mediaPosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        >
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className={`text-3xl md:text-4xl font-bold ${colors.title}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-lg ${colors.subtitle}`}>{subtitle}</p>
            )}
            {content && (
              <div className={`prose ${colors.content} max-w-none mt-2`}>
                {renderRichText ? (
                  renderRichText(content)
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                )}
              </div>
            )}
            {cta && cta.href && (
              <div className="mt-6">
                <a
                  href={cta.href}
                  className={`inline-flex px-6 py-3 rounded-lg font-medium transition-all ${
                    cta.type === "primary"
                      ? backgroundColor === "primary" ||
                        backgroundColor === "dark"
                        ? "bg-white text-neutral-900 hover:bg-neutral-100"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
                      : backgroundColor === "primary" ||
                          backgroundColor === "dark"
                        ? "border border-white/30 text-white hover:bg-white/10"
                        : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                >
                  {cta.text}
                </a>
              </div>
            )}
          </div>
          {media && (
            <div className="lg:w-1/2">
              {renderImage ? (
                renderImage(media)
              ) : (
                <img
                  src={media.url}
                  alt={media.alternativeText || title}
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
