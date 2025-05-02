import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Статистика",
}

export default async function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">
        Статистика
      </h1>
    </div>
  )
}