"use client"

import * as React from "react"
// import { CircleArrowUpIcon } from "lucide-react"

import { TableOfContents } from "@lib/toc"
import { cn } from "@lib/utils"

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc, children }: React.PropsWithChildren<TocProps>) {
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
      <h3 className="text-primary font-mono text-sm/6 font-medium tracking-widest uppercase">
        Содержание
      </h3>
      <Tree tree={toc} activeItem={activeHeading} />
      {children}
      {/* <ScrollToTopButton /> */}
    </div>
  )
}

// function ScrollToTopButton() {
//   const [isVisible, setIsVisible] = React.useState(false)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 200) {
//         setIsVisible(true)
//       } else {
//         setIsVisible(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   return (
//     <button
//       onClick={scrollToTop}
//       className={cn(
//         "text-muted-foreground hover:text-primary mt-8 flex cursor-pointer items-center gap-x-1.5 border-l pl-5 opacity-100 transition-opacity sm:pl-4",
//         {
//           "opacity-0": !isVisible,
//         }
//       )}
//     >
//       Наверх <CircleArrowUpIcon className="size-4" />
//     </button>
//   )
// }

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
          <li
            key={index}
            className={cn("-ml-px flex flex-col items-start gap-2")}
          >
            <a
              className={cn(
                "text-muted-foreground hover:border-primary/25 hover:text-primary aria-[current]:border-primary aria-[current]:text-primary inline-block border-l border-transparent text-sm/6 aria-[current]:font-semibold",
                {
                  "pl-5 sm:pl-4": level === 1,
                  "pl-8 sm:pl-7.5": level === 2,
                }
              )}
              type="button"
              href={item.url}
              aria-current={
                item.url === `#${activeItem}` ? "location" : undefined
              }
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
