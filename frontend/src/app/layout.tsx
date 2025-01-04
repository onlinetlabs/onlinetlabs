import "@styles/globals.css";
import type { Metadata } from "next";
import { fontMono, fontSans } from "@lib/fonts"
import { Providers } from "@shared/providers";
import { cn } from "@lib/utils";
import { siteConfig } from "@shared/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  // keywords: [
  //   "Next.js",
  //   "React",
  //   "Tailwind CSS",
  //   "Server Components",
  //   "Radix UI",
  // ],
  // authors: [
  //   {
  //     name: "author",
  //     url: "https://author.com",
  //   },
  // ],
  creator: "creator",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
