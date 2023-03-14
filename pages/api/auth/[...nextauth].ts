import NextAuth, { NextAuthOptions, User } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "lib/prismadb"
import EmailProvider from "next-auth/providers/email";
import { emailProviderOptions } from "lib/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider(emailProviderOptions())
  ],
  pages: {
    signIn: '/',
    error: '/auth/error'
  },
  callbacks: {
    session: async (session: any) => {
      session.session.user.admin = session.user.admin;
      return Promise.resolve(session.session);
    },
    async signIn({ user: { email }}) {
      if (email) {
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (user) {
          return true
        }
      }

      return false

    },
  }
}

export default NextAuth(authOptions)