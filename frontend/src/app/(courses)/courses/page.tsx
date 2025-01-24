import { Metadata } from "next"
import Link from "next/link"

import { navConfig } from "@shared/config/nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { Badge } from "@ui/badge"

export const metadata: Metadata = {
  title: "Список курсов",
  description: "Полный список всех доступных курсов.",
}

export default function CoursesPage() {
  return (
    <div className="relative">
      <PageHeader>
        <PageHeaderHeading>Список курсов</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных курсов.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container py-6 grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 list-none h-auto">
        <ul className="contents">
          {navConfig.courses.items.map((item, idx) => (
            <li key={idx} className="list-none min-h-[136px]">
              <article className="h-full">
                <Link
                  className="group flex flex-col h-full p-4 bg-background rounded-xl transition-all relative border hover:bg-accent"
                  href={`/courses/${item.slug}`}
                >
                  <div className="mb-1">
                    <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">
                      4 часа
                    </p>
                    <p className="inline-block m-0 text-xs text-muted-foreground">
                      10 лекций
                    </p>
                  </div>
                  <header className="mb-4">
                    <h2 className="text-xl">{item.title}</h2>
                  </header>
                  <div className="flex content-center py-5 rounded overflow-hidden">
                    <div className="h-[132px] w-full border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-foreground)]/5"></div>
                  </div>
                  {item.tags && (
                    <footer className="mt-3 flex items-center [&>*:not(:last-child)]:mr-2">
                      {item.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="rounded-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </footer>
                  )}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
