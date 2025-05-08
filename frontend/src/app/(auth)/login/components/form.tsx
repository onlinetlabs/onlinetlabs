"use client"

import Link from "next/link"
import { signIn } from "@features/auth/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { siteConfig } from "@shared/config/site"
import { Icons } from "@components/icons"
import { Button } from "@ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { Label } from "@ui/label"
import { cn } from "@lib/utils"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const redirectTo = useSearchParams().get("redirect") || "/"

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    signIn("credentials", {
      ...values,
      redirectTo,
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Вход {siteConfig.name}</h1>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm font-normal underline-offset-4 hover:underline pointer-events-none opacity-50"
                  >
                    Забыли пароль?
                  </a>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Пароль должен состоять не менее чем из 4 символов.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            Войти
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background-100 text-muted-foreground relative z-10 px-2">
              или
            </span>
          </div>
          <Button type="button" variant="outline" className="w-full" disabled>
            <Icons.gitHub />
            Войти с GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Нет аккаунта?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Создать аккаунт
          </Link>
        </div>
      </form>
    </Form>
  )
}
