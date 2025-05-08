import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@shared/config/site"
import { Icons } from "@components/icons"

import { SignUpForm } from "./components/form"
import Image from "next/image"

export const metadata: Metadata = {
  title: `Зарегистрироваться в ${siteConfig.name}`,
  description: "",
}

export default async function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <Icons.logo className="size-4" />
            </div>
            {siteConfig.name}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </div>
    </div>
  )
}
