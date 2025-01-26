import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@ui/badge"
import { allLabs } from "contentlayer/generated"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@components/page-header"
import { ActiveLink } from "@components/active-link"
import { Rss, Search } from "lucide-react"
import { Input } from "@ui/input"
import { Button } from "@ui/button"
import { getCategories } from "@lib/lab"

type SearchParams = Promise<{ category: string }>

const CATEGORY_SEARCH_PARAM = 'category' as const;

export const metadata: Metadata = {
  title: "Лабораторные",
  description: "Полный список всех доступных курсов.",
}


export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const categories = await getCategories();

  return (
    <div className="relative">
      <PageHeader>
        <PageHeaderHeading>Лабораторные</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных лабораторных работ.
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-4 xl:py-0 px-4 flex flex-col gap-y-3 xl:gap-y-0 xl:flex-row xl:items-center xl:h-16 w-full xl:justify-between border-b border-b-border">
        <div className="flex xl:flex-1 items-center h-full overflow-x-auto gap-x-3 xl:max-w-4xl pb-2.5 xl:pb-0">
          {[{ label: "Все", slug: "/" }, ...categories].map((item, i) => {
            const isActive =
              // set the first item as active if no search param is set
              (!searchParams[CATEGORY_SEARCH_PARAM] && i === 0) ||
              // otherwise check if the current item is the active one
              item.slug === searchParams[CATEGORY_SEARCH_PARAM];

            // create new searchParams object for easier manipulation
            const params = new URLSearchParams(searchParams);
            // remove the category search param if all is selected
            if (item.slug === "/") {
              params.delete(CATEGORY_SEARCH_PARAM);
            } else {
              params.set(CATEGORY_SEARCH_PARAM, item.slug);
            }

            return (
              <ActiveLink
                key={item.slug}
                isActive={isActive}
                searchParams={params.toString()}
              >
                {item.label}
              </ActiveLink>
            );
          })}
        </div>
        <div className="flex items-center gap-3 -mt-2.5 xl:mt-0">
          <div className="relative w-full xl:w-fit">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Найти курс..."
              className="h-8 bg-background pl-8 shadow-none"
            />
          </div>
          <Button size='icon' variant="outline" className="h-8 w-8 shrink-0" asChild>
            <Link href="/rss">
              <Rss />
            </Link>
          </Button>
        </div>
      </div>
      <ul className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 list-none h-auto [&>li]:border-border [&>li]:border-b [&>li]:border-r xl:[&>li:nth-child(4n)]:border-r-0">
        {allLabs.map((lab, idx) => (
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
