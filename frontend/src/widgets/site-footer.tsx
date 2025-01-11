import Link from "next/link"

import { siteConfig } from "@shared/config/site"
import { Icons } from "@components/icons"
import { ModeSwitcher } from "@components/mode-switcher"
import { Button } from "@ui/button"

export function SiteFooter() {
  return (
    <footer className="flex items-center justify-between gap-4 h-14 border-t border-border/40 dark:border-border px-4">
      <p className="text-balance text-sm text-muted-foreground text-left">
        © 2025 {siteConfig.name}
      </p>
      <div className="flex items-center ml-auto">
        <Button variant="ghost" size="icon" className="">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </Button>
        <ModeSwitcher />
      </div>
    </footer>
  )
}
