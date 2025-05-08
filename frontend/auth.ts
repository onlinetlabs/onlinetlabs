import NextAuth from "next-auth"
import { refresh, signin } from "@features/auth"
import { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { decodeJwt } from "jose/jwt/decode";
import { User as ApiUser } from "@entities/user";

const BASE_PATH = "/auth";

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
          const user = await getUser(credentials.accessToken as string)

          return {
            email: credentials.email as string,
            role: user.role,
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
        const user = await getUser(accessToken as string)

        return {
          email,
          role: user.role,
          accessToken,
          refreshToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Первый вход, значит сохраняем `access_token`, его срок действия и `refresh_token`
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
          expiresAt: getExpiresAt(user.accessToken),
        }
      } else if (Date.now() < token.expiresAt * 1000) {
        return token;
      } else {
        if (!token.refreshToken) throw new TypeError("Missing refresh token")

          try {
            const newTokens = await refresh({ refreshToken: token.refreshToken })

            const expiresAt = getExpiresAt(newTokens.accessToken);

            return {
              ...token,
              accessToken: newTokens.accessToken,
              // Некоторые провайдеры выдают токены обновления только один раз, поэтому сохраняем, если мы не получили новый
              refreshToken: newTokens.refreshToken ? newTokens.refreshToken : token.refreshToken,
              expiresAt
            }
          } catch (error) {
            console.error("Error refreshing access token", error);
            // Если токен обновления недействителен, мы не можем получить новый токен доступа
            token.error = "RefreshTokenError"
            return token
          }
      }
    },
    async session({ session, token }) {
      if (token.error) {
        throw new Error(token.error)
      }

      session.accessToken = token.accessToken
      session.user.role = token.role
      return session
    },
  },
  basePath: BASE_PATH,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})

const getExpiresAt = (token: string) => {
  const { expires: expiresAt } = decodeJwt(token) as { email: string; expires: number; };
  return expiresAt;
}

async function getUser(accessToken: string) {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json()) as ApiUser
}