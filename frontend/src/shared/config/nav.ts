import { Icons } from "@components/icons"
export interface NavConfig {
  main: MainNavItem[];
  admin: {
    users: AdminNavItem[];
    projects: AdminNavItem[];
  };
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
    {
      title: "GNS3",
      href: "/gns3",
      protected: true,
    },
    {
      title: "Серверная",
      href: "/admin",
      protected: true,
      roles: ["admin"],
    }
  ],
  admin: {
    users: [
      {
        title: "Управление пользователями",
        url: "#",
        items: [
          {
            title: "Все пользователи",
            url: "/admin/users",
          },
          {
            title: "Список ролей",
            url: "/admin/roles",
            isActive: true,
          },
        ],
      },
    ],
    projects: [
      {
        title: "Управление лабораторными",
        url: "#",
        items: [
          {
            title: "Проверки",
            url: "/admin/logs",
            isActive: true,
          },
        ],
      },
    ]
  }
}


type MainNavItem = NavItem & {
  href: string
  exact?: boolean
  protected?: boolean;
  roles?: Role[];
}

type AdminNavItem = {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
}


export type NavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}
