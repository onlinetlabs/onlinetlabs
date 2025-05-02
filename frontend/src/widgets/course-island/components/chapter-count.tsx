"use client"

import { useCourse } from "@shared/hooks/use-course"
import { cn } from "@lib/utils"

export const ChapterCount = ({ namespace, type }: Props) => {
  const { course, total, completed, percentage } = useCourse({ namespace })
  return (
    <div
      className={cn({
        "flex flex-col items-start text-left": type === "info",
        "ml-auto hidden flex-col md:flex": type === "progress",
      })}
    >
      <p
        className={cn("text-sm", {
          "text-primary": type === "info",
          "text-muted-foreground text-right": type === "progress",
        })}
      >
        {type === "info" ? course?.title : `${percentage}%`}
      </p>
      <p
        className={cn("text-sm", {
          "text-primary": type === "info",
          "text-muted-foreground text-right": type === "progress",
        })}
      >
        {completed}/{total} глав
      </p>
    </div>
  )
}

type Props = {
  type: "progress" | "info"
  namespace: string
}
