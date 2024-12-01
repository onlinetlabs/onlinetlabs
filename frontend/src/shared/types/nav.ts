import { Icons } from "@components/icons"

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export type NavItemWithChildren = NavItem & {
  items: NavItem[]
}

export type MainNavItem = NavItem & {}

