import { Metadata } from "next"
import Link from "next/link"
import { allCourses } from "contentlayer/generated"
import { BlocksIcon } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { cn } from "@lib/utils"

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
        {allCourses
          .filter((page) => page.isEntryPage)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((course, idx) => {
            const isFirst = idx === 0
            const isEveryFifth = (idx + 1) % 5 === 0

            return (
              <Link
                key={idx}
                href={course.slug}
                className={cn(
                  "transition-transform duration-300 hover:-translate-y-2",
                  {
                    "bg-muted/70 flex flex-col justify-between gap-6 rounded-lg p-8 md:col-span-2 lg:row-span-2":
                      isFirst,
                    "bg-muted/70 flex h-80 flex-col justify-between gap-4 rounded-lg p-8":
                      !isFirst && !isEveryFifth,
                    "bg-muted/70 flex h-80 flex-col-reverse justify-between gap-4 rounded-lg p-8 lg:col-span-2 lg:grid lg:grid-cols-2":
                      isEveryFifth,
                  }
                )}
              >
                <div className={cn({ "flex h-full flex-col": !isFirst })}>
                  {!isEveryFifth && <BlocksIcon className="mb-6 h-auto w-11" />}
                  <h2 className="mt-auto mb-1 text-2xl font-medium">
                    {course.title}
                  </h2>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                {(isFirst || isEveryFifth) && (
                  <img
                    src="/placeholder.svg"
                    alt="integration feature"
                    className={cn(
                      "h-full min-h-0 w-full rounded-lg object-cover",
                      {
                        "ml-auto max-h-80 sm:w-11/12": isFirst,
                      }
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
