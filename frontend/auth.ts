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
      // First-time login, save the `access_token`, its expiry and the `refresh_token`
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
            const response = await fetch(`${process.env.API_URL}/api/auth/refresh?refresh_token=${token.refreshToken}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            })

            const tokensOrError = (await response.json());

            if (!response.ok) {
              throw tokensOrError;
            }

            const newTokens = {
              accessToken: tokensOrError.access_token,
              refreshToken: tokensOrError.refresh_token,
              // expiresIn
            } as { accessToken: string; refreshToken: string; };

            const expiresAt = getExpiresAt(newTokens.accessToken);

            return {
              ...token,
              accessToken: newTokens.accessToken,
              // Some providers only issue refresh tokens once, so preserve if we did not get a new one
              refreshToken: newTokens.refreshToken ? newTokens.refreshToken : token.refreshToken,
              expiresAt
            }
          } catch (error) {
            console.error("Error refreshing access token", error);
            // If we fail to refresh the token, return an error so we can handle it on the page
            token.error = "RefreshTokenError"
            return token
          }
      }
    },
    // authorized({ auth }) {
    //   // const isLoggedIn = !!auth?.user;
    //   const isValid = isTokenValid(auth?.token?.accessToken);

    //   if (!isValid) {
    //     return false;
    //   }

    //   return true;
    // },
    async session({ session, token }) {
      session.error = token.error
      session.accessToken = token.accessToken
      return session
    },
    // async session({ session, token }) {
    //   const isValid = isTokenValid(token.accessToken);

    //   if(!isValid) {
    //     // @ts-expect-error TS2322
    //     session.user = null;
    //     return session
    //   };

    //   return ({
    //     expires: session.expires,
    //     user: session.user,
    //     token
    //   })
    // },
  },
  basePath: BASE_PATH,
  // // TODO: remove
  // secret: process.env.NEXTAUTH_SECRET,
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