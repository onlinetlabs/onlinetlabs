import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id?: string
    email?: string
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: {
      accessToken: string
      refreshToken: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    refreshToken: string
  }
}
