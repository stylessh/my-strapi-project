import type { TestimonialsSection, StrapiMedia } from "../types";

interface TestimonialsProps {
  data: TestimonialsSection;
  renderImage?: (image: StrapiMedia) => React.ReactNode;
}

export function Testimonials({ data, renderImage }: TestimonialsProps) {
  const { title, subtitle, testimonials, layout = "grid" } = data;

  const layoutClasses: Record<string, string> = {
    grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
    carousel:
      "flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4",
    single: "max-w-3xl mx-auto",
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={layoutClasses[layout]}>
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 ${
                layout === "carousel" ? "flex-shrink-0 w-80 snap-center" : ""
              }`}
            >
              {testimonial.rating && (
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating!
                          ? "text-emerald-500"
                          : "text-neutral-300 dark:text-neutral-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="text-neutral-700 dark:text-neutral-200 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                {testimonial.authorImage && (
                  <div className="flex-shrink-0">
                    {renderImage ? (
                      renderImage(testimonial.authorImage)
                    ) : (
                      <img
                        src={testimonial.authorImage.url}
                        alt={
                          testimonial.authorImage.alternativeText ||
                          testimonial.authorName
                        }
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-100 dark:ring-emerald-900/30"
                      />
                    )}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {testimonial.authorName}
                  </div>
                  {(testimonial.authorTitle || testimonial.authorCompany) && (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {testimonial.authorTitle}
                      {testimonial.authorTitle &&
                        testimonial.authorCompany &&
                        " at "}
                      {testimonial.authorCompany}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
