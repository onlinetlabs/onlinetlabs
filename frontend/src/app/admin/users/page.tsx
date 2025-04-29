import { DataTable } from "./components/data-table";
import { getAllUsersOptions } from "@entities/admin";
import { getQueryClient } from "@lib/get-query-client";
import { auth } from "auth";
import { unauthorized } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все пользователи",
}

export default async function Page() {
  const session = await auth()
  if (!session) {
    unauthorized()
  }

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(getAllUsersOptions)

  return (
    <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
      <section>
        <h2 
          className="scroll-mt-10 text-lg font-semibold text-foreground sm:text-xl"
        >
          Все пользователи
        </h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DataTable />
        </HydrationBoundary>
      </section>
    </div>
  )
}