import NextAuth from "next-auth"
import { signin } from "@features/auth"
import { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { decodeJwt } from "jose";

const BASE_PATH = "/auth"

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        accessToken: { required: false },
        refreshToken: { required: false },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error("Invalid credentials")
        }

        if (credentials.accessToken && credentials.refreshToken) {
          return {
            email: credentials.email as string,
            accessToken: credentials.accessToken as string,
            refreshToken: credentials.refreshToken as string,
          }
        }

        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials")
        }

        const email = credentials.email as string
        const password = credentials.password as string

        const { accessToken, refreshToken } = await signin({ email, password })

        if (!accessToken || !refreshToken) {
          throw new Error("Invalid credentials")
        }

        return {
          email,
          accessToken,
          refreshToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    authorized({ auth }) {
      // const isLoggedIn = !!auth?.user;
      const isValid = isTokenValid(auth?.token?.accessToken);

      if (!isValid) {
        return false;
      }

      return true;
    },
    async session({ session, token }) {
      const isValid = isTokenValid(token.accessToken);

      if(!isValid) {
        // @ts-expect-error TS2322
        session.user = null;
        return session
      };

      return ({
        expires: session.expires,
        user: session.user,
        token
      })
    },
  },
  basePath: BASE_PATH,
  // // TODO: remove
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})


function isTokenValid(token?: string): boolean {
  if (!token) return false;

  try {
    // Decode the JWT to extract the expiration timestamp
    const { expires } = decodeJwt(token) as { email: string; expires: number; };

    if (!expires) {
      return false;
    }

    // Convert the expiration time (in seconds) to milliseconds and compare with the current time
    const jwtExpireDateTime = new Date(expires * 1000);

    if (jwtExpireDateTime < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}