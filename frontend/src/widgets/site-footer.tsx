import Link from "next/link"
import { siteConfig } from "@shared/config/site"
import { Button } from "@ui/button"
import { Icons } from "@components/icons"
import { ModeSwitcher } from "@components/mode-switcher"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 dark:border-border px-4 ">
      <div className="flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          {siteConfig.description}
        </p>
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon" className="">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ModeSwitcher />
        </div>
      </div>
    </footer>
  )
}
