"use client"

import { use, useTransition } from "react"

import { ToggleGroup, ToggleGroupItem } from "@ui/toggle-group"

import { useFilters } from "./filter-provider"

export function CategoryFilter({ categoriesPromise }: Props) {
  const list = use(categoriesPromise)
  const { filters, updateFilters } = useFilters()
  const categories = filters.category || []
  const [, startTransition] = useTransition()

  return (
    <div className="flex h-full items-center gap-x-3 overflow-x-auto pb-2.5 xl:max-w-4xl xl:flex-1 xl:pb-0">
      <ToggleGroup
        variant="outline"
        type="multiple"
        value={categories}
        onValueChange={(newCategories) => {
          startTransition(() => {
            updateFilters({
              category: newCategories,
            })
          })
        }}
        className="gap-2"
      >
        {list.map((category, idx) => (
          <ToggleGroupItem
            key={idx}
            value={category.label}
            aria-label={`Toggle ${category.label}`}
            className="first:rounded-l-none last:rounded-r-none data-[variant=outline]:border-l data-[variant=outline]:first:border-l h-8 px-3 box-content min-w-[unset] w-auto"
          >
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

type Props = {
  categoriesPromise: Promise<
    {
      label: string
      slug: string
    }[]
  >
}
