"use client"

import * as React from "react"

import { TableOfContents } from "@lib/toc"
import { cn } from "@lib/utils"
import { cva } from "class-variance-authority"

interface TocProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter((id): id is string => Boolean(id))
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.items?.length) {
    return null
  }

  return (
    <div className="space-y-2">
      <h3 className="font-mono text-sm/6 font-medium tracking-widest text-primary uppercase">Содержание</h3>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | undefined>()

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("flex flex-col gap-2 border-l")}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("-ml-px flex flex-col items-start gap-2")}>
            <a
              className={cn(
                "inline-block border-l border-transparent text-sm/6 text-muted-foreground hover:border-primary/25 hover:text-primary aria-[current]:border-primary aria-[current]:font-semibold aria-[current]:text-primary",
                {
                  "pl-5 sm:pl-4": level === 1,
                  "pl-8 sm:pl-7.5": level === 2
                }
              )} 
              type="button" 
              href={item.url}
              aria-current={item.url === `#${activeItem}` ? "location" : undefined}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
