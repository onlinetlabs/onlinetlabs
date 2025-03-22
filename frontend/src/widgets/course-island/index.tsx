import { Icons } from "@components/icons"
import { Separator } from "@ui/separator"
import { cn } from "@lib/utils"

import { ChapterCount } from "./chapter-count"
import { RingProgress } from "./ring-progress"
import { ScrollToTop } from "./scroll-to-top"
import { getCourseBySlug, getCourseChaptersBySlug } from "@lib/course"
import { TableOfContentsPopover } from "./toc-popover.client"
import { TableOfContentsDrawer } from "./toc-drawer.client"

export const CourseIsland = async ({ slug, index = false, className }: Props) => {
  const course = await getCourseBySlug(slug);
  const chapters = await getCourseChaptersBySlug(slug);

  return (
    <aside
      className={cn(
        "sticky bg-background top-4 border z-20 flex h-[52px] items-center rounded-lg px-3 py-3 lg:h-[auto] w-full",
        className
      )}
    >
      <TableOfContentsPopover
        chapters={chapters}
        className="max-sm:hidden"
      />
      <TableOfContentsDrawer
        chapters={chapters}
        className="sm:hidden"
      />
      <Separator orientation="vertical" className="h-8 ml-3 mr-4" />
      <div className="flex gap-3 items-center">
        <div className="hidden lg:block">
          <Icons.chapter />
        </div>
        <div className="flex flex-col">
          {!index && (
            <p className="text-sm text-muted-foreground">
              Глава {course?.sortOrder}
            </p>
          )}
          <p
            className={cn("text-sm tracking-tight md:tracking-normal truncate", {
              "text-muted-foreground": index,
            })}
          >
            {course?.title}
          </p>
        </div>
      </div>
      {course && <ChapterCount namespace={course.namespace} type="progress" />}
      {course && (
        <RingProgress
          namespace={course.namespace}
          className="ml-auto md:ml-4 h-8 w-8"
        />
      )}
      <Separator orientation="vertical" className="h-8 ml-4 mr-3" />
      <ScrollToTop />
    </aside>
  )
}

type Props = {
  slug: string[];
  className?: string
  index?: boolean
}
