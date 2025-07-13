import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    // debug: false, // This will reduce console logging
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

      const email = credentials?.email as string | undefined;
      const password = credentials?.password as string | undefined;

                if (!email || !password) {
         return null;
      }
         
      const user = await prisma.user.findUnique({
        where:{email:email},
      });
     
   
      if(!user){
        return null;
      }
    
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return null;
    }

      return user;
   }


     })
  ],
   session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
})