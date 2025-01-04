import Link from "next/link"
import { Button } from "@ui/button"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="relative flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant='link' className="">
            <Link href="/login">вход / регистрация</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
