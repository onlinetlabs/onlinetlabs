import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id?: string
    email?: string
    role: Role;
    accessToken: string
    refreshToken: string
  }

  interface Session {
    // user: DefaultSession["user"]
    // token: JWT | undefined;
    accessToken: string
    role: Role;
    error?: "RefreshTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    expiresAt: number;
    accessToken: string
    refreshToken: string
    role: Role;
    error?: "RefreshTokenError"
  }
}
