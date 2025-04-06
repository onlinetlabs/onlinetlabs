import { BackButton } from '@components/back-button'
import { Button } from '@ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "401 - Unauthorized",
  description: "Нет доступа к этой странице",
}
 
export default function Unauthorized() {
  return (
    <main className="bg-background-100 relative mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-6 p-6 md:p-10">
    <div className="text-center">
      <p className="text-base font-semibold text-ds-blue-900">401</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
        Нет доступа
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
        Пожалуйста, войдите в аккаунт, чтобы получить доступ к этой странице.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <BackButton variant="secondary">
          <span aria-hidden="true">&larr;</span> Назад
        </BackButton>
        <Button className="-order-1 sm:order-none" asChild>
          <Link href="/login">Войти</Link>
        </Button>
      </div>
    </div>
  </main>
  )
}