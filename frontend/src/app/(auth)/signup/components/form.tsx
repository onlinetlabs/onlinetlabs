"use client"
import { cn } from "@lib/utils"
import { siteConfig } from "@shared/config/site"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { Label } from "@ui/label"
import { Icons } from "@components/icons"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { signup } from "@api/auth"
import { signIn } from "@auth/helpers"

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: z.string().min(4).max(50),
})

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { accessToken, refreshToken } = await signup(values);
    await signIn("credentials", { accessToken, refreshToken, redirectTo: "/" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Регистрация в {siteConfig.name}</h1>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input type='email' placeholder="johndoe@mail.com" {...field} />
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
                    className="ml-auto text-sm font-normal underline-offset-4 hover:underline"
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
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Создать аккаунт
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              или
            </span>
          </div>
          <Button type="button" variant="outline" className="w-full" disabled>
            <Icons.gitHub />
            Войти с GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Войти
          </Link>
        </div>
      </form>
    </Form>
  )
}
