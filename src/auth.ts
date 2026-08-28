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
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          if (!user) {
            throw new Error("EMAIL_SALAH");
          }

          const inputPassword = credentials.password as string;
          let isPasswordValid = false;

          try {
            isPasswordValid = await bcrypt.compare(inputPassword, user.password);
          } catch (e) {
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
        } catch (error: any) {
          console.error("[AUTH] Auth Error:", error.message);
          return null;
        }
      }
    })
  ]
});
