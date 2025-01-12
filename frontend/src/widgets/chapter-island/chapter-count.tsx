'use client'
import { cn } from "@lib/utils";
import { useCourse } from "@shared/hooks/use-course"

export const ChapterCount = ({ namespace, type }: Props) => {
  const { course, total, completed, percentage } = useCourse({ namespace });


  console.log('course', course)
  console.log('total', total)
  console.log('completed', completed)
  console.log('percentage', percentage)

  return (
    <div className={cn({
      "flex flex-col items-start text-left": type === 'info',
      "hidden md:flex flex-col ml-auto": type === 'progress',
    })}>
      <p className={cn("text-sm", {
        "text-primary": type === 'info',
        "text-muted-foreground text-right": type === 'progress',
      })}>
        {type === 'info' ? course?.title : `${percentage}%`}
      </p>
      <p className={cn("text-sm", {
        "text-primary": type === 'info',
        "text-muted-foreground text-right": type === 'progress',
      })}>
        {completed}/{total} глав
      </p>
    </div>
  )
}

type Props = {
  type: 'progress' | 'info';
  namespace: string;
}