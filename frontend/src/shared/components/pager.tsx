import Link from "next/link"
import { Course } from "contentlayer/generated"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { NavItem, NavItemWithChildren } from "@shared/types/nav"

import { navConfig } from "@shared/config/nav"
import { Button } from "@ui/button"

interface CoursesPagerProps {
  course: Course
}

export function CoursesPager({ course }: CoursesPagerProps) {
  const pager = getPagerForCourse(course)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev?.href && (
        <Button variant="ghost" asChild>
          <Link href={pager.prev.href}>
            <ChevronLeft />
            {pager.prev.title}
          </Link>
        </Button>
      )}
      {pager?.next?.href && (
        <Button variant="ghost" className="ml-auto" asChild>
          <Link href={pager.next.href}>
            {pager.next.title}
            <ChevronRight />
          </Link>
        </Button>
      )}
    </div>
  )
}

export function getPagerForCourse(course: Course) {
  const nav = navConfig.courses
  const flattenedLinks = [null, ...flatten(nav), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => course.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
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
