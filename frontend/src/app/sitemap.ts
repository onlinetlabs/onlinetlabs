import { allCourses } from "contentlayer/generated"

import { siteConfig } from "@shared/config/site"

export default async function sitemap() {
  const courses = allCourses
    // @ts-expect-error TS2362
    .filter((course) => course.sortOrder === 0)
    .map((course) => ({
      url: `${siteConfig.url}${course.slug}`,
      lastModified: course.publishedAt,
    }))

  const routes = ["", "/courses"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...courses]
}
