import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"

interface CoursesLayoutProps {
  children: React.ReactNode
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <div
      data-wrapper=""
      className="border-border flex flex-col flex-1"
    >
      <div className="flex flex-col flex-1 mx-auto w-full border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader sticky={false} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
