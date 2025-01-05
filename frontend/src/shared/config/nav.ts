import type { CoursesNav, MainNavItem, NavItem } from "@shared/types/nav"

export interface NavConfig {
  main: MainNavItem[]
  courses: CoursesNav;
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
  courses: {
    title: 'Список курсов',
    items: [
      {
        title: "Сетевая модель OSI",
        description: "Описание сетевой модели OSI",
        slug: "osi-model",
        tags: ["FREE", "EVENTS", "BEGGINER"],
      },
      {
        title: "Протоколы TCP/IP",
        description: "Описание протоколов TCP/IP",
        slug: "tcp-ip",
        tags: ["FREE", "EVENTS", "BEGGINER"],
      },
      {
        title: "Беспроводные сети",
        description: "Описание беспроводных сетей",
        slug: "wireless-networks",
      },
    ]
  },
}
