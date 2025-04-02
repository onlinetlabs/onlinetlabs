import { BookOpenIcon } from "lucide-react"
import { Card } from "@ui/card"
import { ActiveCard } from "./components/active-card"
import { auth } from "@auth"
import { unauthorized } from "next/navigation"
import { Suspense } from "react"
import { Projects } from "./components/projects"

export default async function IndexPage() {
  const session = await auth()
  if (!session) {
    unauthorized()
  }

  return (
    <>
      <div className="bg-muted p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-foreground text-lg font-semibold">
            Лабораторные работы
          </h1>
          <p className="text-muted-foreground text-sm">
            Просматривайте и управляйте своими лабораторными работами
          </p>
          <div className="mt-8 flex w-full flex-col gap-y-4 md:max-w-3xl md:flex-row md:items-stretch md:space-x-4">
            <ActiveCard />
            <Card className="relative w-full p-6 md:w-7/12">
              <div className="border-border inline-flex items-center justify-center rounded-md border p-2">
                <BookOpenIcon
                  className="text-foreground size-5"
                  aria-hidden={true}
                />
              </div>
              <h3 className="mt-4 text-sm font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden={true} />
                  Полезная информация
                </a>
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ваши работы</h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Projects />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
