import NextAuth from "next-auth"
import { refresh, signin } from "@features/auth"
import { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { decodeJwt } from "jose/jwt/decode";

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
      // Первый вход, значит сохраняем `access_token`, его срок действия и `refresh_token`
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
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
      session.error = token.error
      session.accessToken = token.accessToken
      console.log('session', session)
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