import { Icons } from "@components/icons"
import { Separator } from "@ui/separator"
import { getCourseBySlug, getCourseChaptersBySlug } from "@lib/course"
import { cn } from "@lib/utils"

import { ChapterCount } from "./components/chapter-count"
import { RingProgress } from "./components/ring-progress"
import { ScrollToTop } from "./components/scroll-to-top"
import { TableOfContentsDrawer } from "./components/toc-drawer.client"
import { TableOfContentsPopover } from "./components/toc-popover.client"

export const CourseIsland = async ({
  slug,
  index = false,
  className,
}: Props) => {
  const course = await getCourseBySlug(slug)
  const chapters = await getCourseChaptersBySlug(slug)

  return (
    <aside
      className={cn(
        "bg-background-100 sticky top-4 z-20 flex h-[52px] w-full items-center rounded-lg border px-3 py-3 lg:h-[auto]",
        className
      )}
    >
      <TableOfContentsPopover chapters={chapters} className="max-sm:hidden" />
      <TableOfContentsDrawer chapters={chapters} className="sm:hidden" />
      <Separator orientation="vertical" className="mr-4 ml-3 h-8" />
      <div className="flex items-center gap-3">
        <div className="hidden lg:block">
          <Icons.chapter />
        </div>
        <div className="flex flex-col">
          {!index && (
            <p className="text-muted-foreground text-sm">
              Глава {course?.sortOrder}
            </p>
          )}
          <p
            className={cn(
              "truncate text-sm tracking-tight md:tracking-normal",
              {
                "text-muted-foreground": index,
              }
            )}
          >
            {course?.title}
          </p>
        </div>
      </div>
      {course && <ChapterCount namespace={course.namespace} type="progress" />}
      {course && (
        <RingProgress
          namespace={course.namespace}
          className="ml-auto h-8 w-8 md:ml-4"
        />
      )}
      <Separator orientation="vertical" className="mr-3 ml-4 h-8" />
      <ScrollToTop />
    </aside>
  )
}

type Props = {
  slug: string[]
  className?: string
  index?: boolean
}
