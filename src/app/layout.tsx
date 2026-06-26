import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingShapes } from "@/components/layout/floating-shapes";
import { GameLauncher } from "@/components/layout/game-launcher";
import { PageTransition } from "@/components/layout/page-transition";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

// Sans: the design calls for the commercial "Helvetica Now Display". Until the
// licensed files are added, a system Helvetica stack stands in via the
// `--font-sans` fallback in globals.css. To switch to the real font, drop the
// .woff2 files into `src/fonts/` and enable the stub below:
//
//   import localFont from "next/font/local";
//   const helveticaNow = localFont({
//     variable: "--font-sans",
//     src: [
//       { path: "../fonts/HelveticaNowDisplay-Regular.woff2", weight: "400", style: "normal" },
//       { path: "../fonts/HelveticaNowDisplay-Medium.woff2",  weight: "500", style: "normal" },
//       { path: "../fonts/HelveticaNowDisplay-Bold.woff2",    weight: "700", style: "normal" },
//     ],
//   });
//
// then add `helveticaNow.variable` to the <html> className alongside the mono.

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Isaac David — UI/UX Designer",
    template: "%s — Isaac David",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Design Systems",
    "Portfolio",
    "Isaac David",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Isaac — UI/UX Designer",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac — UI/UX Designer",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingShapes />
          <QueryProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-brand"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1 pt-16">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <GameLauncher />
            <ScrollProgress />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
