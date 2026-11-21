import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const emailInput = (credentials.email as string).trim().toLowerCase();
          const emailAliases: Record<string, string> = {
            "operator@borneo.id": "operator.sid@borneo.id",
            "operator.sid@borneo.id": "operator@borneo.id",
            "dinas@borneo.id": "dinas.pmd@borneo.id",
            "dinas.pmd@borneo.id": "dinas@borneo.id",
            "tokoh.masyarakat@contoh.id": "warga@borneo.id",
            "warga@borneo.id": "tokoh.masyarakat@contoh.id",
          };

          let user = await prisma.user.findUnique({
            where: { email: emailInput }
          });

          if (!user && emailAliases[emailInput]) {
            user = await prisma.user.findUnique({
              where: { email: emailAliases[emailInput] }
            });
          }

          if (!user) {
            throw new Error("EMAIL_SALAH");
          }

          const inputPassword = credentials.password as string;
          let isPasswordValid = false;

          try {
            isPasswordValid = await bcrypt.compare(inputPassword, user.password);
          } catch {
            // fallback
          }

          if (!isPasswordValid) {
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
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[AUTH] Auth Error:", message);
          return null;
        }
      }
    })
  ]
});
