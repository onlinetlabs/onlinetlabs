import { auth } from "auth"
import { Button, buttonVariants } from "@ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { BookOpenIcon, SquareArrowOutUpRightIcon } from "lucide-react"
import Link from "next/link"
import { unauthorized } from "next/navigation"
import CredentialsInput from "./components/credentials-input"
import { cn } from "@lib/utils"
import { ChecksTable } from "./components/check-table"
import { CheckLabButton } from "@features/lab"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { checksOptions } from "@entities/lab"
import { getQueryClient } from "@lib/get-query-client"

type Params = Promise<{ projectId: string }>

export default async function IndexPage({ params }: { params: Params }) {
  const session = await auth()

  if (!session) {
    unauthorized()
  }

  const projectId = (await params).projectId;

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(checksOptions(projectId))

  return (
    <>
      <div className="bg-muted p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-foreground text-lg font-semibold">
          Маршрутизация в IP сетях
          </h1>
          <p className="text-muted-foreground text-sm">
            На этой странице вы можете запустить автоматическую проверку, остановить
            лабораторную работу или перейти к ней. 
          </p>
          <div className="mt-8 flex w-full flex-col xl:flex-row gap-y-4">
            <div className="flex w-full flex-col gap-y-4 xl:max-w-4xl md:flex-row md:items-stretch md:space-x-4">
              <Card className="relative flex w-full flex-col md:w-9/12">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Учетная запись GNS3
                  </CardTitle>
                  <CardDescription>
                    Используйте этот логин и пароль для доступа к GNS3 серверу
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-x-4">
                  <CredentialsInput
                    label="Логин"
                    defaultValue="admin"
                  />
                  <CredentialsInput
                    label="Пароль"
                    defaultValue="admin"
                  />
                </CardContent>
              </Card>
              <Card className="relative w-full p-6 md:w-7/12">
                <div className="border-border inline-flex items-center justify-center rounded-md border p-2">
                  <BookOpenIcon
                    className="text-foreground size-5"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend link to entire card */}
                    <span className="absolute inset-0" aria-hidden={true} />
                    Описание работы
                  </a>
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
              </Card>
            </div>
            <div className="md:ml-auto mt-auto flex items-center gap-x-3">
              <Button variant="destructive" className="w-full md:w-fit" disabled>
                Остановить
              </Button>
              <CheckLabButton className="w-full md:w-fit" projectId={projectId} />
              <Link className={cn(buttonVariants({ variant: "link" }), "hidden md:flex")} href={`/gns3-server/static/web-ui/controller/1/project/${projectId}`} target="_blank">
                Перейти
                <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
              </Link>
              <Link className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden sm:flex md:hidden shrink-0")} href={`/gns3-server/static/web-ui/controller/1/project/${projectId}`} target="_blank">
                <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Проверки</h2>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ChecksTable projectId={projectId} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </>
  )
}