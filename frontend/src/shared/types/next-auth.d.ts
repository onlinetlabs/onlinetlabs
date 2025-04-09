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
    // user: DefaultSession["user"]
    // token: JWT | undefined;
    accessToken: string
    error?: "RefreshTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    expiresAt: number;
    accessToken: string
    refreshToken: string
    error?: "RefreshTokenError"
  }
}
