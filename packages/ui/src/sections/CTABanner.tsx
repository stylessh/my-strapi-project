import type { CTABannerSection, StrapiMedia } from "../types";

interface CTABannerProps {
  data: CTABannerSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
}

export function CTABanner({ data, renderImage }: CTABannerProps) {
  const { title, subtitle, ctas, backgroundImage, style = "simple" } = data;

  const styleClasses: Record<string, string> = {
    simple: "bg-neutral-900",
    gradient: "bg-gradient-to-r from-emerald-600 to-emerald-800",
    "image-background": "",
  };

  return (
    <section
      className={`py-20 md:py-28 relative overflow-hidden ${styleClasses[style]}`}
      style={
        style === "image-background" && backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {style === "image-background" && (
        <div className="absolute inset-0 bg-neutral-900/80" />
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg mb-8 text-neutral-300">{subtitle}</p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="flex gap-4 justify-center flex-wrap">
              {ctas.map((cta) => (
                <a
                  key={cta.id}
                  href={cta.href || "#"}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    cta.type === "primary"
                      ? style === "gradient"
                        ? "bg-white text-emerald-700 hover:bg-neutral-100 shadow-sm hover:shadow-md"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
                      : "border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  {cta.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
