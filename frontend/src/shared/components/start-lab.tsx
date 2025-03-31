"use client"

import Link from "next/link"

import { labFeature } from "@features/lab"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog"
import { Button, buttonVariants } from "@ui/button"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Callout } from "./callout"

export const StartLab = ({ labId }: { labId: string }) => {
  const { status } = useSession();
  const { mutateAsync, isPending } = labFeature.useMutateStart()

  const onClickStart = () => {
    toast.promise(mutateAsync({ lab_id: labId }), {
      loading: "Запуск лабораторной работы...",
      success: (data) => {
        return (
          <div className="flex items-center gap-6">
            <p className="text-xs">Лабораторная работа запущена</p>
            <Link href={`/gns3/${data.labProjectId}`} className={buttonVariants({ size: "sm" })}>Перейти</Link>
          </div>
        )
      },
      duration: Infinity,
      error: <p className="text-xs">Не удалось запустить лабораторную работу</p>,
    })
  }

  if (status !== 'authenticated') {
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <span className="absolute inset-0 cursor-pointer"></span>
              Запустить
              <span aria-hidden="true">→</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Вы уверены, что готовы начать?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Это действие запустит лабораторную работу и создаст новую среду
                моделирования.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction onClick={onClickStart} disabled={isPending}>
                Продолжить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
