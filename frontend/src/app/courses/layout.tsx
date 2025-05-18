import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"
import { Metadata } from "next"

interface CoursesLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
      <div data-wrapper="" className="border-border flex flex-1 flex-col">
      <div className="border-border mx-auto flex w-full flex-1 flex-col min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader sticky={false} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
