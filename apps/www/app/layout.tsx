import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DraftModeBadge } from "@/components/DraftModeBadge";
import { LivePreview } from "@/components/LivePreview";
import { Navbar, Footer } from "@repo/ui/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Site",
  description: "Built with Next.js and Strapi",
};

const navLinks = [
  { id: 1, text: "Features", href: "#features" },
  { id: 2, text: "Pricing", href: "#pricing" },
  { id: 3, text: "About", href: "/about" },
  { id: 4, text: "Blog", href: "/posts" },
];

const navCta = {
  id: 5,
  text: "Get Started",
  href: "#cta",
  type: "primary" as const,
};

const footerColumns = [
  {
    title: "Product",
    links: [
      { id: 1, text: "Features", href: "#features" },
      { id: 2, text: "Pricing", href: "#pricing" },
      { id: 3, text: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { id: 4, text: "About", href: "/about" },
      { id: 5, text: "Blog", href: "/posts" },
      { id: 6, text: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { id: 7, text: "Privacy", href: "/privacy" },
      { id: 8, text: "Terms", href: "/terms" },
    ],
  },
];

const footerBottomLinks = [
  { id: 1, text: "Privacy Policy", href: "/privacy" },
  { id: 2, text: "Terms of Service", href: "/terms" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DraftModeBadge />
        <LivePreview />
        <Navbar logoText="Acme" links={navLinks} cta={navCta} />
        <div className="min-h-screen">{children}</div>
        <Footer
          logoText="Acme"
          description="Building the future of web development with modern tools and best practices."
          columns={footerColumns}
          bottomLinks={footerBottomLinks}
        />
      </body>
    </html>
  );
}
