import { CommandMenu } from "@components/command-menu"
import { cn } from "@lib/utils"

import { Actions } from "./components/actions"
import { MobileNav } from "./components/mobile-nav"
import { MainNav } from "./components/main-nav"
import { auth } from "auth"
import { navConfig } from "@shared/config/nav"
import Link from "next/link"
import { Icons } from "@components/icons"
import { siteConfig } from "@shared/config/site"

export async function SiteHeader({ sticky = true }: Props) {
  const session = await auth();

  const authenticated = !!session?.user;
  const role = session?.user?.role;


  const items = navConfig.main.filter((item) => {
    if (item.protected && !authenticated) {
      return false;
    }
    if (item.protected && authenticated) {
      // If roles are defined for the item, check if the provided role is included.
      if (item.roles && (!role || !item.roles.includes(role))) {
        return false;
      }
      return true;
    }
    // Even for non-protected items, check role if specified.
    if (item.roles && (!role || !item.roles.includes(role))) {
      return false;
    }
    return true;
  });
  
  return (
    <header
      className={cn(
        "border-border bg-background-100/95 supports-backdrop-filter:bg-background-100/60 top-0 z-50 w-full border-b backdrop-blur-sm",
        { sticky: sticky }
      )}
    >
      <div className="relative flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold lg:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <MainNav items={items} />
        </div>
        <MobileNav items={items} />
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
