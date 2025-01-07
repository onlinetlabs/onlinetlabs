import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: {
      accessToken: string
      refreshToken: string
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
