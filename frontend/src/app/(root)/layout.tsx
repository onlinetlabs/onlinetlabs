import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="border-border/40 dark:border-border flex flex-col flex-1">
      <div className="flex flex-col flex-1 mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
