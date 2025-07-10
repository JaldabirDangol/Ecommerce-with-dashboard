import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/db"
import { PrismaAdapter } from "@next-auth/PrismaAdapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [
     GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
     }),CredentialProvider({
        name:"Credentials",
        credentials:{
            email:{
                label:"Email",
                type:"email"
            },
            password:{
                label:"Password",
                type:"password"
            }
        },
     authorize: ({ email, password }) => {
  console.log(email, password)

  if (password === "") {
    return
  }

  return email
}


     })
  ],
   session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
})