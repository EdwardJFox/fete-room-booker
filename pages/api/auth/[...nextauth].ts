import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
import EmailProvider from "next-auth/providers/email";
import { emailProviderOptions } from "../../../lib/email";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider(emailProviderOptions())
  ],
  pages: {
    signIn: '/',
    error: '/auth/error'
  },
  callbacks: {
    async signIn({ user: { email }}) {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (user) {
        return true
      } else {
        return false
      }
    },
  }
}

export default NextAuth(authOptions)