import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
import EmailProvider from "next-auth/providers/email";
import { gql } from "@apollo/client";
import client from "../../../lib/apollo_client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
    // {
    //   id: "startgg",
    //   name: "Start.gg",
    //   type: "oauth",
    //   authorization: "https://start.gg/oauth/authorize",
    //   token: "https://api.start.gg/oauth/refresh",
    //   clientId: "19282",
    //   userinfo: {
    //     url: "https://api.start.gg/gql/alpha",
    //     // The result of this method will be the input to the `profile` callback.
    //     async request(context) {
    //       console.log("context", context)
    //       // context contains useful properties to help you make the request.
    //       // return await makeUserinfoRequest(context)
    //     }
    //   },
    //   profile(profile) {
    //     return {
    //       id: profile.id,
    //       name: profile.name,
    //       email: profile.email,
    //       // image: profile.kakao_account?.profile.profile_image_url,
    //     }
    //   },
    // }
  ],
})