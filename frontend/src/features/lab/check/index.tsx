"use client"

import { Button } from "@ui/button"
import { toast } from "sonner"
import { useMutateCheck } from "../query"

export function CheckLabButton({ projectId, ...props }: Props) {
  const { mutateAsync, isPending } = useMutateCheck()

  const onClickStart = async () => {
    const toastId = toast.loading("Проверяем работу...")
    
    const data = await mutateAsync({ project_id: projectId });

    if (data.passed) {
      toast.success("Проверка пройдена", { id: toastId })
    } else {
      toast.error("Неправильный ответ", { id: toastId })
    }
  }

  return (
    <Button onClick={onClickStart} disabled={isPending} {...props}>
      Отправить
    </Button>
  )
}

type Props = {
  className?: string;
  projectId: string
}