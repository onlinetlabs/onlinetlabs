"use client"

import Link from "next/link"
import { Chapter } from "contentlayer/generated"
import { FileTextIcon, InfoIcon, TableOfContentsIcon } from "lucide-react"

import { CourseNavItem } from "@shared/types/nav"
import { Icons } from "@components/icons"
import { Button } from "@ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip"
import { VisuallyHidden } from "@ui/visually-hidden"
import { cn } from "@lib/utils"

export const TableOfContentsDrawer = ({
  course,
  chapters,
  className,
}: Props) => {
  const [intro, ...rest] = chapters
  return (
    <Drawer>
      <TooltipProvider>
        <Tooltip>
          <DrawerTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className={cn("rounded-full", className)}
              >
                <TableOfContentsIcon />
              </Button>
            </TooltipTrigger>
          </DrawerTrigger>
          <TooltipContent side="bottom" align="start">
            <p className="text-xs sm:text-sm">Посмотреть главы</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Список глав</DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="flex gap-3 p-3">
          <div className="flex w-[50%] items-center gap-3 rounded-md px-3 py-2.5 md:w-auto md:min-w-[225px] bg-background">
            <Icons.chapter />
            <div className="flex flex-col items-start text-left">
              <p className="text-primary text-sm">{course?.title}</p>
              <p className="text-primary text-sm">1/{rest.length + 1} Глав</p>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="grid grid-flow-row p-2">
            <Button variant="ghost" className="justify-start group" asChild>
              <Link href={intro.slug}>
                <div className="flex flex-shrink-0 justify-center items-center w-7 h-7 text-sm font-medium rounded-full text-blue-900 bg-blue-300">
                  <InfoIcon className="h-4 w-4" />
                </div>
                <p className="text-primary text-sm">{intro.title}</p>
              </Link>
            </Button>
          </div>
          <div className="grid grid-flow-row p-2 border-t">
            {rest.map((chapter, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="justify-start h-[50px] group"
                asChild
              >
                <Link href={chapter.slug}>
                  <div className="flex flex-shrink-0 justify-center items-center w-7 h-7 text-sm font-medium rounded-full text-blue-900 bg-blue-300">
                    {chapter.sortOrder}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-muted-foreground text-sm">
                      Глава {chapter.sortOrder}
                    </p>
                    <p className="text-primary text-sm truncate">
                      {chapter.title}
                    </p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type Props = {
  course?: CourseNavItem
  chapters: Chapter[]
  className?: string
}
