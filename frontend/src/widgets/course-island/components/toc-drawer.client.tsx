"use client"

import Link from "next/link"
import { Course } from "contentlayer/generated"
import { InfoIcon, TableOfContentsIcon } from "lucide-react"

import { Icons } from "@components/icons"
import { Button } from "@ui/button"
import { Circle } from "@ui/circle"
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

import { ChapterCount } from "./chapter-count"

export const TableOfContentsDrawer = ({ chapters, className }: Props) => {
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
                className={className}
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
          <div className="bg-background-100 flex w-full items-center gap-3 rounded-md px-3 py-2.5 md:w-auto md:min-w-[225px]">
            <Icons.chapter />
            <ChapterCount namespace={intro.namespace} type="info" />
          </div>
        </div>
        <div className="border-t">
          <div className="grid grid-flow-row p-2">
            <Button variant="ghost" className="group justify-start" asChild>
              <Link href={intro.slug}>
                <Circle variant="subtle-blue">
                  <InfoIcon className="h-4 w-4" />
                </Circle>
                <p className="text-primary text-sm">Введение</p>
              </Link>
            </Button>
          </div>
          <div className="grid grid-flow-row border-t p-2">
            {rest.map((chapter, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="group h-[50px] justify-start"
                asChild
              >
                <Link href={chapter.slug}>
                  <Circle variant="subtle-blue" className="font-medium">
                    {chapter.sortOrder}
                  </Circle>
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-muted-foreground text-sm">
                      Глава {chapter.sortOrder}
                    </p>
                    <p className="text-primary truncate text-sm">
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
  chapters: Course[]
  className?: string
}
