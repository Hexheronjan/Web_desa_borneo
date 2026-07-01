import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig = {
  trustHost: process.env.NODE_ENV === "production",
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "slv-local-development-secret-change-in-production",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (nextUrl.pathname === "/login") return true;
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string;
        (session.user as any).id = token.id as string;
        (session.user as any).wargaId = token.wargaId as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.wargaId = (user as any).wargaId;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          if (!user) {
            throw new Error("EMAIL_SALAH");
          }

          // Check password - support both hashed and plain text for migration
          const inputPassword = credentials.password as string;
          let isPasswordValid = false;

          // Try bcrypt comparison first (for hashed passwords)
          try {
            isPasswordValid = await bcrypt.compare(inputPassword, user.password);
          } catch (e) {
            // If bcrypt fails, fall back to plain text comparison (for migration)
            isPasswordValid = user.password === inputPassword;
          }

          if (!isPasswordValid) {
            throw new Error("KATA_SANDI_SALAH");
          }

          if (user.status !== "Aktif") {
            throw new Error("AKUN_NONAKTIF");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            wargaId: user.wargaId,
          };
        } catch (error: any) {
          console.error("Auth System Error:", error);
          return null;
        }
      }
    })
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);
