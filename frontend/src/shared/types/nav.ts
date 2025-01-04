import { Icons } from "@components/icons"

export type NavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export type NavItemWithChildren = NavItem & {
  items: NavItem[]
}

export type CourseNavItem = NavItem & {
  slug: string;
}

export type MainNavItem = NavItem & {
  href: string;
  exact?: boolean;
}

