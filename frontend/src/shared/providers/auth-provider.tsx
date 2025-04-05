import { SessionProvider } from "next-auth/react"

export function AuthProvider({ children }: Props) {
  return (
    <SessionProvider basePath="/auth">
      {children}
    </SessionProvider>
  )
}

type Props = {
  children: React.ReactNode
}
