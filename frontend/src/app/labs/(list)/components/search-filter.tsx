"use client"

import { useTransition } from "react"
import { Search } from "lucide-react"

import { Input } from "@ui/input"

import { useFilters } from "./filter-provider"

export function SearchFilter() {
  const { filters, updateFilters } = useFilters()
  const [, startTransition] = useTransition()

  return (
    <form className="relative w-full xl:w-fit">
      <Search className="text-muted-foreground absolute top-2 left-2.5 h-4 w-4" />
      <Input
        type="search"
        name="q"
        placeholder="Найти курс..."
        onChange={(e) => {
          startTransition(() => {
            updateFilters({ q: e.target.value })
          })
        }}
        defaultValue={filters.q}
        className="bg-background-100 h-8 pl-8 shadow-none"
      />
    </form>
  )
}
