import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    debug: true, 
    pages: {
      signIn: '/login',
    },
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
     async authorize(credentials){
      try {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          console.log("Missing email or password");
          return null;
        }
         
        const user = await prisma.user.findUnique({
          where:{email:email},
        });
       
        if(!user){
          console.log("User not found:", email);
          return null;
        }
      
        const isPasswordValid = await bcrypt.compare(password,user.password || "");

        if(!isPasswordValid){
          console.log("Invalid password for user:", email);
          return null;
        }

        return user;
      } catch (error) {
        console.error("Error in authorize function:", error);
        return null;
      }
     }
     })
  ],
   session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; 
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})