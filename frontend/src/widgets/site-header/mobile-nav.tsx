"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { navConfig } from "@shared/config/nav"
import { Button } from "@ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer"
import { VisuallyHidden } from "@ui/visually-hidden"
import { cn } from "@lib/utils"
import { allCourses } from "contentlayer/generated"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6!"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh] p-0">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Мобильное меню</DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {navConfig.main?.map(
              (item, idx) =>
                item.href && (
                  <MobileLink key={idx} href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">Список курсов</h4>
              {allCourses.filter(page => page.isEntryPage).sort((a, b) => a.sortOrder - b.sortOrder).map((course, idx) => (
                <React.Fragment key={idx}>
                  <MobileLink
                    href={course.slug}
                    onOpenChange={setOpen}
                    className="text-muted-foreground"
                  >
                    {course.title}
                    {/* NEW label */}
                    {/* {course.label && (
                      <span className="ml-2 rounded-md bg-chart-2 px-1.5 py-0.5 text-xs leading-none text-background no-underline group-hover:no-underline">
                        {course.label}
                      </span>
                    )} */}
                  </MobileLink>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
