import { allChapters } from "contentlayer/generated"

import { navConfig } from "@shared/config/nav"

import { TableOfContentsDrawer } from "./toc-drawer.client"
import { TableOfContentsPopover } from "./toc-popover.client"

async function getChaptersByNamespace(namespace: string) {
  return allChapters
    .filter((chapter) => chapter.namespace === namespace)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

async function getCourseByNamespace(namespace: string) {
  return navConfig.courses.items.find((course) => course.slug === namespace)
}

export const TableOfContents = async ({ namespace, className }: Props) => {
  const chapters = await getChaptersByNamespace(namespace)
  const course = await getCourseByNamespace(namespace)

  return (
    <>
      <TableOfContentsPopover
        course={course}
        chapters={chapters}
        className="max-sm:hidden"
      />
      <TableOfContentsDrawer
        course={course}
        chapters={chapters}
        className="sm:hidden"
      />
    </>
  )
}

type Props = {
  namespace: string
  className?: string
}
