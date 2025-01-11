"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { navConfig } from "@shared/config/nav"
import { useMetaColor } from "@shared/hooks/use-meta-color"
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

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { setMetaColor, metaColor } = useMetaColor()

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open)
      setMetaColor(open ? "#09090b" : metaColor)
    },
    [setMetaColor, metaColor]
  )

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
            className="!size-6"
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
              <h4 className="font-medium">{navConfig.courses.title}</h4>
              {navConfig.courses.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {!item.disabled &&
                    (item.slug ? (
                      <MobileLink
                        href={item.slug}
                        onOpenChange={setOpen}
                        className="text-muted-foreground"
                      >
                        {item.title}
                        {item.label && (
                          <span className="ml-2 rounded-md bg-chart-2 px-1.5 py-0.5 text-xs leading-none text-background no-underline group-hover:no-underline">
                            {item.label}
                          </span>
                        )}
                      </MobileLink>
                    ) : (
                      item.title
                    ))}
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
