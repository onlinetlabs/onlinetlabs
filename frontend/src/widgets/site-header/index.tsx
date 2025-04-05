import { CommandMenu } from "@components/command-menu"
import { cn } from "@lib/utils"

import { Actions } from "./actions"
import { MobileNav } from "./mobile-nav"
import { MainNav } from "./main-nav"

export function SiteHeader({ sticky = true }: Props) {
  return (
    <header
      className={cn(
        "border-border bg-background/95 supports-backdrop-filter:bg-background/60 top-0 z-50 w-full border-b backdrop-blur-sm",
        { sticky: sticky }
      )}
    >
      <div className="relative flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <CommandMenu />
            <Actions />
        </div>
      </div>
    </header>
  )
}

type Props = {
  sticky?: boolean
}
