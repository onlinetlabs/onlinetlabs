import { BackButton } from '@components/back-button'
import { Button } from '@ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "403 - Forbidden",
  description: "Нет доступа к этой странице",
}
 
export default function Forbidden() {
  return (
    <main className="bg-background relative mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-6 p-6 md:p-10">
    <div className="text-center">
      <p className="text-base font-semibold text-ds-blue-900">403</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Нет доступа
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Вы не авторизованы для доступа к этому ресурсу.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <BackButton variant="secondary">
          <span aria-hidden="true">&larr;</span> Назад
        </BackButton>
        <Button className="-order-1 sm:order-none" asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  </main>
  )
}