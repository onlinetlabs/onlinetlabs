import Link from "next/link"
import { allCourses, Course } from "contentlayer/generated"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { NavItem } from "@shared/config/nav"
import { Button } from "@ui/button"

interface ChaptersPagerProps {
  chapter: Course
}

export function ChaptersPager({ chapter }: ChaptersPagerProps) {
  const pager = getPagerForChapter(chapter)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager.prev?.slug && (
        <Button variant="ghost" asChild>
          <Link href={pager.prev.slug}>
            <ChevronLeft />
            {pager.prev.title}
          </Link>
        </Button>
      )}
      {pager.next?.slug && (
        <Button variant="ghost" className="ml-auto" asChild>
          <Link href={pager.next.slug}>
            {pager.next.title}
            <ChevronRight />
          </Link>
        </Button>
      )}
    </div>
  )
}

export function getPagerForChapter(chapter: Course) {
  const links = allCourses
    .filter((c) => c.slugAsParams.startsWith(chapter.namespace))
    .toSorted((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

  const activeIndex = links.findIndex((link) => chapter.slug === link.slug)

  const prev = activeIndex !== 0 ? links[activeIndex - 1] : null
  const next = activeIndex !== links.length - 1 ? links[activeIndex + 1] : null
  return {
    prev,
    next,
  }
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? link.items : link)
    }, [])
    .filter((link) => !link?.disabled)
}


type NavItemWithChildren = NavItem & {
  items: NavItem[]
}