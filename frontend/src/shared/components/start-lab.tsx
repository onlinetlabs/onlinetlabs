import {  Button } from "@ui/button"
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
import Link from "next/link"

export const StartLab = () => {
  return (
    <div className="relative mt-12 flex flex-col">
      <p className="text-[0.8125rem]/6 font-semibold text-ds-blue-600 dark:text-ds-blue-900">GNS3</p>
        <p className="mt-1.5 text-base/5 font-semibold text-foreground">Лабораторная работа</p>
      <p className="mt-3 text-[0.8125rem]/5 text-muted-foreground">
        Запусти индивидуальную среду моделирования в GNS3 и попробуй выполнить задания самостоятельно
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
              <AlertDialogTitle>Вы уверены, что готовы начать?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие запустит лабораторную работу и создаст новую среду моделирования.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/">
                  Продолжить
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}