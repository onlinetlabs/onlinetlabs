import { auth } from "auth"
import { buttonVariants } from "@ui/button"
import { SquareArrowOutUpRightIcon } from "lucide-react"
import Link from "next/link"
import { notFound, unauthorized } from "next/navigation"
import { cn } from "@lib/utils"
import { ChecksTable } from "./components/check-table"
import { CheckLabButton } from "@features/lab"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { checksOptions, projectInfoOptions } from "@entities/lab"
import { getQueryClient } from "@lib/get-query-client"
import { DeleteLabButton } from "@features/lab"
import { Metadata } from "next"
import { CredentialsCard } from "./components/credentials-card"
import { LabCard } from "./components/lab-card"
import { getLabById } from "@lib/lab"

type Props = {
  params: Promise<{ projectId: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const queryClient = getQueryClient()

  const { projectId } = await params
  const info = await queryClient.fetchQuery(projectInfoOptions(projectId))

  if (info) {
    const lab = getLabById(info.labId);

    return {
      title: lab?.title,
      description: lab?.description
    }
  }
 
  return {
    title: "Лабораторная работа",
  }
}
 

export default async function IndexPage({ params }: Props) {
  const session = await auth()

  if (!session) {
    unauthorized()
  }
  const projectId = (await params).projectId;
  const queryClient = getQueryClient()

  const info = await queryClient.fetchQuery(projectInfoOptions(projectId))

  if (!info) {
    notFound()
  }

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
              <CredentialsCard username={info.labUser} password={info.labPasswd} />
              <LabCard labId={info.labId} />
            </div>
            <div className="md:ml-auto mt-auto flex items-center gap-x-3">
              <DeleteLabButton className="w-full md:w-fit" projectId={projectId} disabled={info.checkInProgress} />
              <CheckLabButton className="w-full md:w-fit" projectId={projectId} loading={info.checkInProgress} />
              <Link 
                className={cn(buttonVariants({ variant: "link" }), "hidden md:flex")} 
                href={`${process.env.NEXT_PUBLIC_GNS3_SUBDOMAIN}/static/web-ui/controller/1/project/${projectId}`} 
                target="_blank"
              >
                Перейти
                <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
              </Link>
              <Link 
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden sm:flex md:hidden shrink-0")} 
                href={`${process.env.NEXT_PUBLIC_GNS3_SUBDOMAIN}/static/web-ui/controller/1/project/${projectId}`} 
                target="_blank"
              >
                <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:gap-6 w-1/2">
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