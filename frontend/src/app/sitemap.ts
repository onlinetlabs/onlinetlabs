import { allChapters } from "contentlayer/generated"

import { siteConfig } from "@shared/config/site"

export default async function sitemap() {
  const courses = allChapters
    .filter((chapter) => chapter.sortOrder === 0)
    .map((chapter) => ({
      url: `${siteConfig.url}${chapter.slug}`,
      lastModified: chapter.publishedAt,
    }))

  const routes = ["", "/courses"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...courses]
}
