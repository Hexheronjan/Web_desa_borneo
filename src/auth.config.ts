import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
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
        return false;
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
  providers: [],
} satisfies NextAuthConfig;
