'use client';
// TODO: does not trigger state update on sign out
// use this instead of 'next-auth/react' when it's fixed
// import { signOut } from "@auth/helpers";
import { Button } from "@ui/button"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export const Actions = () => {
  const { status, data } = useSession();


  console.log('status', status);
  console.log('data', data);

  if (status === 'loading') {
    return null
  }

  if (status === 'authenticated') {
    return (
      <Button variant="link" onClick={() => signOut({ redirectTo: '/' })}>
        выйти
      </Button>
    )
  }

  return (
    <Button variant='link'>
      <Link href="/login">вход / регистрация</Link>
    </Button>
  )
}