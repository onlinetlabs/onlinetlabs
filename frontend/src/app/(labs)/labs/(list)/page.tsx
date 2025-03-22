import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@ui/badge"
import { allLabs } from "contentlayer/generated"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@components/page-header"
import { Rss } from "lucide-react"
import { Button } from "@ui/button"
import { CategoryFilter } from "./components/category-filter"
import { SearchFilter } from "./components/search-filter"
import { getCategories, getLabs } from "@lib/lab"

type SearchParams = Promise<{
  q?: string;
  category?: string | string[];
}>

export const metadata: Metadata = {
  title: "Лабораторные",
  description: "Полный список всех доступных курсов.",
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { q, category } = await searchParams;
  
  const data = getLabs({
    categories: toArray(category),
    q,
  });

  return (
    <div className="relative">
      <PageHeader className="[&_[data-slot='page-header-container']]:max-[1800px]:mx-0">
        <PageHeaderHeading>Лабораторные</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных лабораторных работ.
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-4 xl:py-0 px-4 flex flex-col gap-y-3 xl:gap-y-0 xl:flex-row xl:items-center xl:h-16 w-full xl:justify-between border-b border-b-border">
        <CategoryFilter categoriesPromise={getCategories()} />
        <div className="flex items-center gap-3 -mt-2.5 xl:mt-0">
          <SearchFilter />
          <Button size='icon' variant="outline" className="h-8 w-8 shrink-0" asChild>
            <Link href="/rss">
              <Rss />
            </Link>
          </Button>
        </div>
      </div>
      <ul className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 list-none h-auto [&>li]:border-border [&>li]:border-b [&>li]:border-r xl:[&>li:nth-child(4n)]:border-r-0">
        {data.map((lab, idx) => (
          <li key={idx} className="list-none min-h-[136px] ">
            <article className="h-full">
              <Link
                className="group flex flex-col h-full p-4 bg-background transition-all relative hover:bg-accent"
                href={lab.slug}
                data-link
              >
                <div className="mb-1">
                  <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">
                    5 задач
                  </p>
                  <p className="inline-block m-0 text-xs text-muted-foreground">
                    Низкая сложность
                  </p>
                </div>
                <header className="h-14">
                  <h2 className="text-xl">{lab.title}</h2>
                </header>
                <div className="flex content-center py-5 rounded overflow-hidden">
                  <div className="h-[132px] w-full border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-foreground)]/5"></div>
                </div>
                {lab.categories && (
                  <footer className="mt-auto flex items-center  flex-wrap gap-2">
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
    return value;
  }
  return value ? [value] : undefined;
}