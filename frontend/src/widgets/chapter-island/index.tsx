import { Chapter } from "contentlayer/generated"
import { Separator } from "@ui/separator"
import { ScrollToTop } from "./scroll-to-top"
import { RingProgress } from "./ring-progress"
import { cn } from "@lib/utils"
import { TableOfContents } from "./toc"

export const ChapterIsland = ({ chapter, index = false, className }: Props) => {
  return (
    <aside className={cn("sticky bg-background top-4 border z-10 flex h-[52px] items-center rounded-full px-3 py-3 lg:h-[auto] w-full", className)}>
      {/* <TableOfContentsPopover namespace={chapter.namespace} className="max-sm:hidden" /> */}
      {/* <TableOfContentsDrawer namespace={chapter.namespace} className="sm:hidden" /> */}
      <TableOfContents namespace={chapter.namespace} />
      <Separator orientation="vertical" className="h-8 ml-3 mr-4" />
      <div className="flex gap-3 items-center">
        <div className="flex flex-col">
          {!index && <p className="text-sm text-muted-foreground">Глава {chapter.sortOrder}</p>}
          <p className={cn("text-sm tracking-tight md:tracking-normal", { "text-muted-foreground": index })}>{chapter.title}</p>
        </div>
      </div>
      <div className="hidden md:flex flex-col ml-auto">
        <p className="text-sm text-muted-foreground text-right">6%</p>
        <p className="text-sm text-muted-foreground text-right">1/16 глав</p>
      </div>
      <RingProgress value={6} className="ml-auto md:ml-4 h-8 w-8" />
      <Separator orientation="vertical" className="h-8 ml-4 mr-3" />
      <ScrollToTop />
    </aside>
  )
}

type Props = {
  chapter: Chapter;
  className?: string;
  index?: boolean;
}
