import type { MainNavItem } from "@shared/types/nav"

export interface NavConfig {
  main: MainNavItem[]
}

export const navConfig: NavConfig = {
  main: [
    {
      title: "Главная",
      href: "/",
      exact: true,
    },
    {
      title: "Курсы",
      href: "/courses",
    },
    {
      title: "Лабораторные",
      href: "/labs",
    },
  ],
}
