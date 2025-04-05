import Link from "next/link"
import { Button } from "@ui/button"
import { auth, signOut } from "auth"

export async function Actions() {
  const session = await auth()

  if (!session?.user) {
    return (
      <Button variant="link" asChild>
        <Link href="/login">вход / регистрация</Link>
      </Button>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button 
        type="submit"
        variant="link" 
      >
        выйти
      </Button>
    </form>
  )
}
