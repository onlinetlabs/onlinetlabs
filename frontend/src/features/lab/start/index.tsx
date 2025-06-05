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
import { useMutation, useQuery } from "@tanstack/react-query"
import * as API from "./api"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { projectsOptions } from "@entities/lab"
import { getLabById } from "@lib/lab"


export function StartLabButton({ labId }: { labId: string }) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: API.start,
  })

  const { data: projects } = useQuery({
    ...projectsOptions,
    select: (projects) => {
      return projects
        .map((project) => {
          if (project.labId === labId) {
            return undefined
          }

          const lab = getLabById(project.labId);
          return lab ? { ...lab, ...project } : undefined;
        })
        .filter((lab) => lab !== undefined)
    }
  });

  const onClick = () => {
    toast.promise(mutateAsync({ lab_id: labId, project_id_template: selectedTemplate || null }), {
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
    <div className="divide-primary-foreground/30 inline-flex divide-x rounded-md shadow-xs rtl:space-x-reverse">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
            Запустить {selectedTemplate && `из шаблона`}
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
      {projects && projects.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              size="icon"
              aria-label="Templates"
            >
              <ChevronDownIcon size={16} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-64 md:max-w-xs"
            side="bottom"
            sideOffset={4}
            align="end"
          >
            <DropdownMenuRadioGroup
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              {projects.map((project) => (
                <DropdownMenuRadioItem
                  key={project.projectId}
                  value={project.projectId}
                  className="items-center [&>span]:pt-1.5"
                >
                  <span className="text-sm font-medium">{project.title}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
