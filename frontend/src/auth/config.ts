import { login, refresh } from "@/shared/api/auth";
import { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode'

export const BASE_PATH = "/auth";

export const authConfig = {
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
          return null;
        }

        if (credentials.accessToken && credentials.refreshToken) {
          return {
            email: credentials.email as string,
            accessToken: credentials.accessToken as string,
            refreshToken: credentials.refreshToken as string
          }
        }
        
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const { accessToken, refreshToken } = await login({ email, password }, process.env.NEXT_PUBLIC_API_URL);

        if (!accessToken || !refreshToken) {
          return null;
        }

        return {
          email,
          accessToken,
          refreshToken
        }
      },
      
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken
      }

      if (token.refreshToken) {
        session.user.refreshToken = token.refreshToken
      }
      
      // session.user.id = token.id

      return session
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, ...user };
      }

      const decodedAccessToken = jwtDecode(token.accessToken);
      const decodedRefreshToken = jwtDecode(token.refreshToken);

      // Current access token is expired
      if (decodedAccessToken.exp && Date.now() >= decodedAccessToken.exp * 1000) {
        const { accessToken, refreshToken } = await refresh(token.refreshToken, process.env.NEXT_PUBLIC_API_URL);

        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        return { ...token };
      }

      // Refresh token is expired
      if (decodedRefreshToken.exp && Date.now() >= decodedRefreshToken.exp * 1000) {
        return null;
      }
      
      return token;
    },
  },
  basePath: BASE_PATH,
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthConfig;
