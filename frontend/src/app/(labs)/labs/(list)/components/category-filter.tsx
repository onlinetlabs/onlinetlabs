'use client';

import { use, useTransition } from "react";
import { useFilters } from "./filter-provider";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui/toggle-group"

export function CategoryFilter({ categoriesPromise }: Props) {
  const list = use(categoriesPromise)
  const { filters, updateFilters } = useFilters();
  const categories = filters.category || [];
  const [, startTransition] = useTransition();

  return (
    <div
      className="flex xl:flex-1 items-center h-full overflow-x-auto gap-x-3 xl:max-w-4xl pb-2.5 xl:pb-0"
    >
      <ToggleGroup 
        variant="outline" 
        type="multiple"
        value={categories}
        onValueChange={(newCategories) => {
          startTransition(() => {
            updateFilters({
              category: newCategories,
            });
          });
        }}
      >
        {list.map((category, idx) => (
          <ToggleGroupItem key={idx} value={category.label} aria-label={`Toggle ${category.label}`}>
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

type Props = {
  categoriesPromise: Promise<{
    label: string;
    slug: string;
  }[]>
}

