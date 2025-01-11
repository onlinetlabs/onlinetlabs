"use client"

// TODO: does not trigger state update on sign out
// use this instead of 'next-auth/react' when it's fixed
// import { signOut } from "@auth/helpers";
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@ui/button"

export const Actions = () => {
  const { status } = useSession()

  if (status === "loading") {
    return null
  }

  if (status === "authenticated") {
    return (
      <Button variant="link" onClick={() => signOut({ redirectTo: "/" })}>
        выйти
      </Button>
    )
  }

  return (
    <Button variant="link" asChild>
      <Link href="/login">вход / регистрация</Link>
    </Button>
  )
}
