"use client"

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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as API from "./api"
import { useRouter } from "next/navigation"
import { labKeys } from "@entities/lab"

export function DeleteLabButton({ projectId, ...props }: { projectId: string; className?: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: API.remove,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: labKeys.projects() });
        router.push("/gns3")
      }
    }
  })

  const onClick = () => {
    toast.promise(mutateAsync({ project_id: projectId }), {
      loading: "Завершение лабораторной работы...",
      success: "Лабораторная работа завершена",
      error: <p className="text-xs">Не удалось завершить лабораторную работу</p>,
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" {...props}>
          Остановить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите остановить работу?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие завершит выполнение лабораторной работы, результат работы засчитан не будет.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={onClick} disabled={isPending}>
            Остановить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
