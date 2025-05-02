"use client"

import { Button } from "@ui/button"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "./api"
import { labKeys } from "@entities/lab";

export function CheckLabButton({ projectId, ...props }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: API.check,
    onSuccess: (_, { project_id }) => {
      queryClient.invalidateQueries({ queryKey: [...labKeys.logs(), project_id] });
    }
  })

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