import { SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar"
import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"
import { AdminSidebar } from "./components/admin-sidebar"
import { Separator } from "@ui/separator"
import { AdminBreadcrumbs } from "./components/admin-breadcrumbs"
import { Metadata } from "next"
import { auth } from "auth"
import { forbidden } from "next/navigation"

export const metadata: Metadata = {
  title: {
    default: "Серверная",
    template: `%s - Серверная`,
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
   
  if (session?.user?.role !== "admin") {
    return forbidden();
  }

  return (
    <div data-wrapper="" className="border-border flex flex-1 flex-col">
      <div className="border-border mx-auto flex w-full flex-1 flex-col min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <SiteHeader />
        <div className="flex-1 relative overflow-hidden">
          <SidebarProvider className="min-h-0">
            <AdminSidebar className="absolute" />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <AdminBreadcrumbs />
              </header>
              <main>
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
