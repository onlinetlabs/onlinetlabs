import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  InfoIcon,
  SparkleIcon,
} from "lucide-react"

import { navConfig } from "@shared/config/nav"
import { Button } from "@ui/button"

const features = [
  {
    icon: <InfoIcon />,
    title: "Free and open source",
    description:
      "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: <InfoIcon />,
    title: "TypeScript based",
    description:
      "Build type safe applications, all components and hooks export types",
  },
  {
    icon: <InfoIcon />,
    title: "No annoying focus ring",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: <InfoIcon />,
    title: "Flexible",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
]

export const WhatWillILearn = () => {
  return (
    <div className="hero">
      <div className="mb-4 flex flex-col justify-center text-center md:mb-8 md:flex-row md:items-baseline md:justify-center md:text-left text-primary">
        <h2 className="text-base md:text-xl">Чему я научусь?</h2>
        <div className="mx-auto my-1 w-[70%] md:ml-2 md:mr-0 md:w-auto md:text-xl text-muted-foreground">
          Вот несколько наших курсов.
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {navConfig.courses.items.map((item, idx) => (
          <div
            key={idx}
            className="group h-full rounded-[12px] shadow-sm group transition-all border hover:bg-accent"
          >
            <Link className="flex flex-col p-6" href={`/courses/${item.slug}`}>
              <div className="mb-2 flex items-center">
                <div className="mr-2 flex h-8 w-8 flex-none flex-shrink-0 items-center justify-center rounded-full bg-blue-300 text-sm font-bold text-blue-700 group-hover:bg-foreground group-hover:text-background">
                  <SparkleIcon className="h-4 w-4 block group-hover:hidden" />
                  <ArrowUpRightIcon className="h-4 w-4 hidden group-hover:block" />
                </div>
                <p className="text-xl font-semibold text-primary">
                  {item.title}
                </p>
              </div>
              <div className="line-clamp-2 text-sm text-muted-foreground">
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
