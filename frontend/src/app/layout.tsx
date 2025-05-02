import "@styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"

import { siteConfig } from "@shared/config/site"
import { Providers } from "./providers"
import { Toaster } from "@ui/sonner"

const inter = Inter({ subsets: ["latin"] })

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

export default async function RootLayout({ children }: RootLayoutProps) {
  const userAgent = (await headers()).get("user-agent") ?? ""
  const isMac = userAgent.toLowerCase().includes("mac os x")

  return (
    <html
      lang="en"
      className={isMac ? "os-macos" : ""}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <div vaul-drawer-wrapper="">
            <div className="bg-background-100 relative flex min-h-screen flex-col">
              {children}
            </div>
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
