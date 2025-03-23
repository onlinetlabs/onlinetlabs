"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@ui/button"
import { cn } from "@lib/utils"

export function ActiveLink({
  isActive,
  searchParams,
  children,
}: {
  isActive: boolean
  searchParams: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const variant = isActive ? "default" : "outline"

  return (
    <Link
      className={cn(buttonVariants({ variant }), "h-8")}
      href={pathname + "?" + searchParams}
    >
      {children}
    </Link>
  )
}
