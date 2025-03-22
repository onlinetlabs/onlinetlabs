import { allCourses, type Course } from "contentlayer/generated"

export async function getNextChapter(chapter: Course) {
  const links = allCourses
    .filter((c) => c.slugAsParams.startsWith(chapter.namespace))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

  const activeIndex = links.findIndex((link) => chapter.slug === link.slug)

  const next = activeIndex !== links.length - 1 ? links[activeIndex + 1] : null
  return next
}


export async function getCourseBySlug(slug: string[]) {
  const slugAsParams = slug.join("/")

  const course = allCourses.find((c) => c.slugAsParams === slugAsParams);

  if (!course) {
    return null
  }

  return course
}

export async function getCourseChapterCountBySlug([slug]: string[]) {
  return allCourses.filter((c) => c.slugAsParams.startsWith(slug)).length
}

export async function getCourseChaptersBySlug([slug]: string[]) {
  return allCourses
    .filter((c) => c.slugAsParams.startsWith(slug))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}
