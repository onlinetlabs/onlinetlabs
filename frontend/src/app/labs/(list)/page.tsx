import { Metadata } from "next"
import Link from "next/link"
import { Rss } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { getCategories, getLabs } from "@lib/lab"

import { CategoryFilter } from "./components/category-filter"
import { SearchFilter } from "./components/search-filter"

type SearchParams = Promise<{
  q?: string
  category?: string | string[]
}>

export const metadata: Metadata = {
  title: "Лабораторные",
  description: "Полный список всех доступных курсов.",
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { q, category } = await searchParams

  const data = getLabs({
    categories: toArray(category),
    q,
  })

  return (
    <div className="relative">
      <PageHeader className="[&_[data-slot='page-header-container']]:max-[1800px]:mx-0">
        <PageHeaderHeading>Лабораторные</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных лабораторных работ.
        </PageHeaderDescription>
      </PageHeader>
      <div className="border-b-border flex w-full flex-col gap-y-3 border-b px-4 py-4 xl:h-16 xl:flex-row xl:items-center xl:justify-between xl:gap-y-0 xl:py-0">
        <CategoryFilter categoriesPromise={getCategories()} />
        <div className="-mt-2.5 flex items-center gap-3 xl:mt-0">
          <SearchFilter />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 shrink-0"
            asChild
          >
            <Link href="/rss">
              <Rss />
            </Link>
          </Button>
        </div>
      </div>
      <ul className="[&>li]:border-border grid h-auto list-none auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [&>li]:border-r [&>li]:border-b xl:[&>li:nth-child(4n)]:border-r-0">
        {data.map((lab, idx) => (
          <li key={idx} className="min-h-[136px] list-none">
            <article className="h-full">
              <Link
                className="group bg-background-100 hover:bg-accent relative flex h-full flex-col p-4 transition-all"
                href={lab.slug}
                data-link
              >
                <div className="mb-1">
                  <p className="text-muted-foreground m-0 inline-block text-xs after:px-[0.33em] after:content-['•']">
                    5 задач
                  </p>
                  <p className="text-muted-foreground m-0 inline-block text-xs">
                    Низкая сложность
                  </p>
                </div>
                <header className="h-14">
                  <h2 className="text-xl">{lab.title}</h2>
                </header>
                <div className="flex content-center overflow-hidden rounded py-5">
                  <div className="h-[132px] w-full border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-foreground)]/5"></div>
                </div>
                {lab.categories && (
                  <footer className="mt-auto flex flex-wrap items-center gap-2">
                    {lab.categories.slice(0, 6).map((category, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="rounded-none uppercase"
                      >
                        {category}
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
  )
}

function toArray(value?: string | string[]): string[] | undefined {
  if (Array.isArray(value)) {
    return value
  }
  return value ? [value] : undefined
}
