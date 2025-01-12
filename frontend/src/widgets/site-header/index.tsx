import AuthProvider from "@providers/auth-provider"
import { cn } from "@lib/utils"

import { Actions } from "./actions"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { CommandMenu } from "@components/command-menu"

export function SiteHeader({ sticky = true }: Props) {
  return (
    <header
      className={cn(
        "top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border",
        { sticky: sticky }
      )}
    >
      <div className="relative flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <CommandMenu />
          <AuthProvider>
            <Actions />
          </AuthProvider>
        </div>
      </div>
    </header>
  )
}

type Props = {
  sticky?: boolean
}
