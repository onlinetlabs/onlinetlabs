"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@shared/config/site"
import { cn } from "@lib/utils"
import { Icons } from "@components/icons"
import { navConfig } from "@shared/config/nav"

const isActive = (pathname: string, href: string, exact?: boolean) => {
  if (exact) {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export function MainNav() {
  const pathname = usePathname()

  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 flex items-center gap-4 text-sm xl:gap-6">
          {navConfig.main.map((item, idx) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={idx}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  active ? "text-foreground" : "text-foreground/80"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
