import { auth } from "@auth"
import { BASE_PATH } from "@auth/config"
import { SessionProvider } from "next-auth/react"

export default async function AuthProvider({ children }: Props) {
  const session = await auth()
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      accessToken: session.user.accessToken,
      refreshToken: session.user.refreshToken,
    }
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      {children}
    </SessionProvider>
  )
}

type Props = {
  children: React.ReactNode
}
