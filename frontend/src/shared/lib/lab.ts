import { allLabs } from "contentlayer/generated"

export async function getCategories() {
  const allCategories = allLabs.map((lab) => lab.categories).flat().filter((category: string | undefined): category is string => !!category);
  const uniqueCategories = [...new Set(allCategories)];

  const uniqueCategoriesWithSlug = uniqueCategories.map((category) => ({
    label: category,
    slug: category.toLowerCase(),
  }));

  return uniqueCategoriesWithSlug;
}

export async function getLabBySlug(slug: string[]) {
  const slugAsParams = slug.join("/")
  
  const lab = allLabs.find((c) => c.slugAsParams === slugAsParams);

  if (!lab) {
    return null
  }

  return lab
}

/**
 * Все фильтры для лабораторных работ (категория, пагинация, сортировка и т.д.)
 */
export const getLabsFilterOptions = async () => {
  const categories = await getCategories();

  return [
    {
      name: "Категория",
      value: "category",
      items: categories,
    },
    {
      name: 'Сортировка',
      value: 'sort',
      items: ['asc', 'desc'],
    },
    {
      name: 'Страница',
      value: 'page',
      items: ['1', '2', '3'],
    },
    {
      name: 'Элементов на странице',
      value: 'perPage',
      items: ['10', '25', '100'],
    },
  ]
}

export function getLabs({
  categories,
  q,
}: {
  categories?: string[];
  q?: string;
}) {
  return allLabs.filter((lab) => {
    if (categories && categories.length > 0) {
      return lab.categories?.some((c) => categories.includes(c));
    }

    if (q) {
      return lab.title.toLowerCase().includes(q.toLowerCase());
    }

    return true;
  });
}