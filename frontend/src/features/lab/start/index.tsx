"use client"

import Link from "next/link"

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
import { useMutation } from "@tanstack/react-query"
import * as API from "./api"

export function StartLabButton({ labId }: { labId: string }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: API.start,
  })

  const onClick = () => {
    toast.promise(mutateAsync({ lab_id: labId }), {
      loading: "Запуск лабораторной работы...",
      success: (data) => {
        return (
          <div className="flex items-center gap-6">
            <p className="text-xs">Лабораторная работа запущена</p>
            <Link href={`/gns3/${data.labProjectId}`} onClick={() => toast.dismiss()} className={buttonVariants({ size: "sm" })}>Перейти</Link>
          </div>
        )
      },
      duration: Infinity,
      error: <p className="text-xs">Не удалось запустить лабораторную работу</p>,
    })
  }

  return (
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
          <AlertDialogAction onClick={onClick} disabled={isPending}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
