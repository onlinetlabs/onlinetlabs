import AuthProvider from "@providers/auth-provider"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { Actions } from "./actions"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="relative flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <AuthProvider>
            <Actions />
          </AuthProvider>
        </div>
      </div>
    </header>
  )
}
