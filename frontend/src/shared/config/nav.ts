import type { MainNavItem, NavItemWithChildren } from "@shared/types/nav"

export interface NavConfig {
  main: MainNavItem[]
  courses: NavItemWithChildren[]
}

export const navConfig: NavConfig = {
  main: [
    {
      title: "Главная",
      href: "/",
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
      href: "/courses/osi-model",
      items: [
        {
          title: "История модели OSI",
          href: "/courses/osi-model/history",
        },
        {
          title: "Определения и основные концепции",
          href: "/courses/osi-model/definitions",
        },
        {
          title: "Уровни модели OSI",
          href: "/courses/osi-model/layers",
        },
      ],
    },
    {
      title: "Протоколы TCP/IP",
      description: "Описание протоколов TCP/IP",
      href: "/courses/tcp-ip",
      items: [
        {
          title: "Введение в TCP/IP",
          href: "/courses/tcp-ip/intro",
        },
        {
          title: "Структура и функции TCP/IP",
          href: "/courses/tcp-ip/structure",
        },
        {
          title: "Примеры использования TCP/IP",
          href: "/courses/tcp-ip/examples",
        },
      ],
    },
    {
      title: "Беспроводные сети",
      description: "Описание беспроводных сетей",
      href: "/courses/wireless-networks",
      items: [
        {
          title: "Основы беспроводных сетей",
          href: "/courses/wireless-networks/basics",
        },
      ],
    },
    {
      title: "Root",
      href: "/courses/root",
      items: [],
    },
  ],
}
