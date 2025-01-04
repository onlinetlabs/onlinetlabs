import type { CourseNavItem, MainNavItem, NavItem } from "@shared/types/nav"

export interface NavConfig {
  main: MainNavItem[]
  courses: CourseNavItem[]
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
  courses: [
    {
      title: "Сетевая модель OSI",
      description: "Описание сетевой модели OSI",
      slug: "osi-model",
    },
    {
      title: "Протоколы TCP/IP",
      description: "Описание протоколов TCP/IP",
      slug: "tcp-ip",
    },
    {
      title: "Беспроводные сети",
      description: "Описание беспроводных сетей",
      slug: "wireless-networks",
    },
  ],
}
