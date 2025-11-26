import type { CTAButton } from "../types";

export interface FooterColumn {
  title: string;
  links: CTAButton[];
}

export interface FooterProps {
  logoText?: string;
  description?: string;
  columns?: FooterColumn[];
  bottomLinks?: CTAButton[];
  copyright?: string;
}

export function Footer({
  logoText = "Logo",
  description,
  columns,
  bottomLinks,
  copyright,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                {logoText.charAt(0)}
              </div>
              <span>{logoText}</span>
            </a>
            {description && (
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
          {columns?.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href || "#"}
                      className="text-sm text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 md:flex-row">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {copyright || `© ${currentYear} ${logoText}. All rights reserved.`}
          </p>
          {bottomLinks && bottomLinks.length > 0 && (
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href || "#"}
                  className="text-sm text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
