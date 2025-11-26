import type { CTAButton } from "../types";

export interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: CTAButton[];
  cta?: CTAButton;
}

export function Navbar({ logo, logoText = "Logo", links, cta }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-50">
            {logo || (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                {logoText.charAt(0)}
              </div>
            )}
            <span>{logoText}</span>
          </a>
          {links && links.length > 0 && (
            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href || "#"}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {cta && cta.href && (
            <a
              href={cta.href}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              {cta.text}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
