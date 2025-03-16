'use client';

import { Search } from "lucide-react"
import { Input } from "@ui/input"
import { useFilters } from "./filter-provider";
import { useTransition } from "react";

export function SearchFilter() {
  const { filters, updateFilters } = useFilters();
  const [, startTransition] = useTransition();

  return (
    <form className="relative w-full xl:w-fit">
      <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        name="q"
        placeholder="Найти курс..."
        onChange={e => {
          startTransition(() => {
            updateFilters({ q: e.target.value });
          });
        }}
        defaultValue={filters.q}
        className="h-8 bg-background pl-8 shadow-none"
      />
    </form>
  )
}
