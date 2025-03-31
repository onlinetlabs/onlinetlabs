import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function GNS3Layout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="border-border flex flex-1 flex-col">
      <div className="border-border mx-auto flex w-full flex-1 flex-col min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}