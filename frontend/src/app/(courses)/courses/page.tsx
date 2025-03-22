import { Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { cn } from "@lib/utils"
import { allCourses } from "contentlayer/generated"
import { BlocksIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Список курсов",
  description: "Полный список всех доступных курсов.",
}

export default function CoursesPage() {
  return (
    <div className="relative">
      <PageHeader>
        <PageHeaderHeading>Список курсов</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных курсов.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container mx-auto grid gap-4 py-4 sm:py-8 md:grid-cols-2 lg:grid-cols-3">
        {allCourses.filter(page => page.isEntryPage).sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)).map((course, idx) => {
          const isFirst = idx === 0;
          const isEveryFifth = (idx + 1) % 5 === 0;

          return (
            <Link key={idx} href={course.slug} className={cn(
              "transition-transform duration-300 hover:-translate-y-2",
              {
                "flex flex-col justify-between gap-6 rounded-lg bg-muted/70 p-8 md:col-span-2 lg:row-span-2": isFirst,
                "flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8": !isFirst && !isEveryFifth,
                "flex h-80 flex-col-reverse justify-between gap-4 rounded-lg bg-muted/70 p-8 lg:col-span-2 lg:grid lg:grid-cols-2": isEveryFifth
              }
            )}>
              <div className={cn({"flex flex-col h-full": !isFirst })}>
                {!isEveryFifth && <BlocksIcon className="mb-6 h-auto w-11" />}
                <h2 className="mb-1 mt-auto text-2xl font-medium">{course.title}</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              {(isFirst || isEveryFifth) && (
                <img src="/placeholder.svg" alt="integration feature" className={cn(
                    "rounded-lg object-cover min-h-0 w-full h-full",
                    {
                      "ml-auto max-h-80 sm:w-11/12": isFirst,
                    },
                  )} 
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
