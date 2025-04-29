'use client'

import { navConfig } from "@shared/config/nav"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@ui/breadcrumb"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export function AdminBreadcrumbs() {
  const pathname = usePathname()

  const breadcrumbs = useMemo(() => {
    // Объединяем группы админ-навигации в один массив.
    const adminGroups = [
      ...navConfig.admin.users,
      ...navConfig.admin.projects,
    ]

    // Ищем группу и активный пункт, соответствующие текущему пути.
    for (const group of adminGroups) {
      const activeItem = group.items.find(item => pathname.startsWith(item.url))
      if (activeItem) {
        return {
          parentTitle: group.title,
          childTitle: activeItem.title,
          childUrl: activeItem.url,
        }
      }
    }
    return null
  }, [pathname])

  if (!breadcrumbs) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">
            Серверная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="pointer-events-none">
            {breadcrumbs.parentTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {breadcrumbs.childTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}