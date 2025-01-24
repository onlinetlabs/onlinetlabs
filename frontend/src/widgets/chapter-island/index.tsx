import { Chapter } from "contentlayer/generated"
import { BookAIcon } from "lucide-react"

import { Icons } from "@components/icons"
import { Separator } from "@ui/separator"
import { cn } from "@lib/utils"

import { ChapterCount } from "./chapter-count"
import { RingProgress } from "./ring-progress"
import { ScrollToTop } from "./scroll-to-top"
import { TableOfContents } from "./toc"

export const ChapterIsland = ({ chapter, index = false, className }: Props) => {
  return (
    <aside
      className={cn(
        "sticky bg-background top-4 border z-20 flex h-[52px] items-center rounded-full px-3 py-3 lg:h-[auto] w-full",
        className
      )}
    >
      <TableOfContents namespace={chapter.namespace} />
      <Separator orientation="vertical" className="h-8 ml-3 mr-4" />
      <div className="flex gap-3 items-center">
        <div className="hidden lg:block">
          <Icons.chapter />
        </div>
        <div className="flex flex-col">
          {!index && (
            <p className="text-sm text-muted-foreground">
              Глава {chapter.sortOrder}
            </p>
          )}
          <p
            className={cn("text-sm tracking-tight md:tracking-normal", {
              "text-muted-foreground": index,
            })}
          >
            {chapter.title}
          </p>
        </div>
      </div>
      <ChapterCount namespace={chapter.namespace} type="progress" />
      <RingProgress
        namespace={chapter.namespace}
        className="ml-auto md:ml-4 h-8 w-8"
      />
      <Separator orientation="vertical" className="h-8 ml-4 mr-3" />
      <ScrollToTop />
    </aside>
  )
}

type Props = {
  chapter: Chapter
  className?: string
  index?: boolean
}
