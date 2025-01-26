import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-wrapper=""
      className="border-border flex flex-col flex-1"
    >
      <div className="flex flex-col flex-1 mx-auto w-full border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
