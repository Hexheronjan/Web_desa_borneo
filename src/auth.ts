import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig = {
  trustHost: process.env.AUTH_TRUST_HOST === "true" || process.env.NODE_ENV === "production",
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "slv-local-development-secret-change-in-production",
  debug: process.env.NODE_ENV === "development",
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
        console.log("[AUTH] Authorize called with credentials:", credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing credentials");
          return null;
        }

        console.log("[AUTH] Login attempt for email:", credentials.email);
        console.log("[AUTH] DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          console.log("[AUTH] User found:", !!user);
          if (user) {
            console.log("[AUTH] User data:", { id: user.id, email: user.email, role: user.role, status: user.status });
          }

          if (!user) {
            console.log("[AUTH] User not found - throwing EMAIL_SALAH");
            throw new Error("EMAIL_SALAH");
          }

          // Check password - support both hashed and plain text for migration
          const inputPassword = credentials.password as string;
          let isPasswordValid = false;

          console.log("[AUTH] Checking password...");
          // Try bcrypt comparison first (for hashed passwords)
          try {
            isPasswordValid = await bcrypt.compare(inputPassword, user.password);
            console.log("[AUTH] Bcrypt comparison result:", isPasswordValid);
          } catch (e) {
            console.log("[AUTH] Bcrypt comparison threw error:", (e as Error).message);
          }

          // If bcrypt returned false or threw error, try falling back to plain text comparison (for migration/seed data)
          if (!isPasswordValid) {
            isPasswordValid = user.password === inputPassword;
            console.log("[AUTH] Plain text fallback comparison result:", isPasswordValid);
          }

          if (!isPasswordValid) {
            console.log("[AUTH] Password invalid - throwing KATA_SANDI_SALAH");
            throw new Error("KATA_SANDI_SALAH");
          }

          if (user.status !== "Aktif") {
            console.log("[AUTH] Account not active - throwing AKUN_NONAKTIF");
            throw new Error("AKUN_NONAKTIF");
          }

          console.log("[AUTH] Login successful for:", user.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            wargaId: user.wargaId,
          };
        } catch (error: any) {
          console.error("[AUTH] Auth System Error:", error.message);
          console.error("[AUTH] Error stack:", error.stack);
          return null;
        }
      }
    })
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);
