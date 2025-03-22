import FilterProvider from "./components/filter-provider"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      {children}
    </FilterProvider>
  )
}
