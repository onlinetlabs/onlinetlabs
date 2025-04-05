import { Callout } from "@components/callout";
import { StartLabButton } from "@features/lab";
import { auth } from "auth";
import Link from "next/link";

export async function LabStartWidget({ labId }: { labId: string }) {
  const session = await auth();
  
  if (!session?.user) {
    return (
      <Callout className="bg-blue-50 mt-6 flex rounded-none border-blue-600 dark:border-blue-900 dark:bg-blue-950 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900">
        <p className="text-sm text-foreground [&_p]:leading-relaxed">
          Для запуска лабораторной работы <Link href="/login" className="font-medium underline underline-offset-4">войдите&nbsp;в&nbsp;аккаунт</Link>
        </p>
      </Callout>
    )
  }
  
  return (
    <div className="relative mt-12 flex flex-col">
      <p className="text-ds-blue-600 dark:text-ds-blue-900 text-[0.8125rem]/6 font-semibold">
        GNS3
      </p>
      <p className="text-foreground mt-1.5 text-base/5 font-semibold">
        Лабораторная работа
      </p>
      <p className="text-muted-foreground mt-3 text-[0.8125rem]/5">
        Запусти индивидуальную среду моделирования в GNS3 и попробуй выполнить
        задания самостоятельно
      </p>
      <div className="mt-4">
        <StartLabButton labId={labId} />
      </div>
    </div>
  )
}