import type { HeroSection, StrapiMedia } from "../types";

interface HeroProps {
  data: HeroSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
}

export function Hero({ data, renderImage }: HeroProps) {
  const { title, subtitle, image, ctas, layout = "centered" } = data;

  const layoutClasses: Record<string, string> = {
    centered: "text-center items-center",
    "left-aligned": "text-left items-start",
    "image-right": "text-left items-center lg:flex-row",
    "image-left": "text-left items-center lg:flex-row-reverse",
  };

  const isImageLayout = layout === "image-right" || layout === "image-left";

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col gap-8 ${layoutClasses[layout]} ${isImageLayout ? "lg:gap-16" : ""}`}
        >
          <div
            className={`flex flex-col gap-6 ${isImageLayout ? "lg:w-1/2" : "max-w-3xl mx-auto"}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {subtitle}
              </p>
            )}
            {ctas && ctas.length > 0 && (
              <div
                className={`flex gap-4 flex-wrap mt-2 ${layout === "centered" ? "justify-center" : ""}`}
              >
                {ctas.map((cta) => (
                  <a
                    key={cta.id}
                    href={cta.href || "#"}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      cta.type === "primary"
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
                        : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cta.text}
                  </a>
                ))}
              </div>
            )}
          </div>
          {image && isImageLayout && (
            <div className="lg:w-1/2">
              {renderImage ? (
                renderImage(image)
              ) : (
                <img
                  src={image.url}
                  alt={image.alternativeText || title}
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
