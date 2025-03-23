import Link from "next/link"

import { siteConfig } from "@shared/config/site"
import { Icons } from "@components/icons"
import { ModeSwitcher } from "@components/mode-switcher"
import { Button } from "@ui/button"

export function SiteFooter() {
  return (
    <footer className="border-border flex h-14 items-center justify-between gap-4 border-t px-4">
      <p className="text-muted-foreground text-left text-sm text-balance">
        © 2025 {siteConfig.name}
      </p>
      <div className="ml-auto flex items-center">
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
