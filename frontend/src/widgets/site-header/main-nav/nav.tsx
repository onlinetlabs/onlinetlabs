"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navConfig } from "@shared/config/nav"
import { cn } from "@lib/utils"
import { useMemo } from "react"

const isActive = (pathname: string, href: string, exact?: boolean) => {
  if (exact) {
    return pathname === href
  }
  return pathname.startsWith(href)
}

export function Nav({ authenticated }: { authenticated?: boolean }) {
  const pathname = usePathname();

  const items = useMemo(() => {
    return navConfig.main.filter((item) => {
      if (item.protected && !authenticated) {
        return false;
      }
      if (item.protected && authenticated) {
        return true;
      }
      return true;
    });
  }, [authenticated]);

  return (
    <nav className="flex items-center gap-4 text-sm lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:transform xl:gap-6">
      {items.map((item, idx) => {
        const active = isActive(pathname, item.href, item.exact)
        return (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              active ? "text-foreground" : "text-foreground/80"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}