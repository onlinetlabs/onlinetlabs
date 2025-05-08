import Link from "next/link"
import { allCourses } from "contentlayer/generated"
import { ArrowRightIcon, ArrowUpRightIcon, SparkleIcon } from "lucide-react"

import { Button } from "@ui/button"
import { Circle } from "@ui/circle"
import { DUMMY_COURSES } from "@shared/config/content"
import { cn } from "@lib/utils"

export const WhatWillILearn = () => {
  return (
    <div className="hero">
      <div className="text-primary mb-4 flex flex-col justify-center text-center md:mb-8 md:flex-row md:items-baseline md:justify-center md:text-left">
        <h2 className="text-base md:text-xl">Чему я научусь?</h2>
        <div className="text-muted-foreground mx-auto my-1 w-[70%] md:mr-0 md:ml-2 md:w-auto md:text-xl">
          Вот несколько наших курсов.
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...allCourses, ...DUMMY_COURSES]
          .filter((page) => page.isEntryPage)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "group hover:bg-accent h-full rounded-[12px] border shadow-xs transition-all",
                {
                  "opacity-50 pointer-events-none": item.namespace === "test",
                }
              )}
            >
              <Link className="flex flex-col p-6" href={item.slug}>
                <div className="mb-2 flex items-center">
                  <Circle
                    variant="subtle-blue"
                    className="group-hover:bg-foreground group-hover:text-background-100 mr-2 h-8 w-8 text-sm font-bold"
                  >
                    <SparkleIcon className="block h-4 w-4 group-hover:hidden" />
                    <ArrowUpRightIcon className="hidden h-4 w-4 group-hover:block" />
                  </Circle>
                  <p className="text-primary text-xl font-semibold">
                    {item.title}
                  </p>
                </div>
                <div className="text-muted-foreground line-clamp-2 text-sm">
                  {item.description}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-center md:mt-8 md:w-auto">
        <Button asChild>
          <Link href="/courses">
            Перейти к курсам <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  )
}
