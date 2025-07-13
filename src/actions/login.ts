"use server"
import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const loginHandler = async (prevState: {
    error?: string;
    message?: string;
    success?: boolean;
}, formData: FormData): Promise<{ error?: string, message?: string, success?: boolean }> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(!email || !password) {
      return { error: "Please provide all fields" ,success:false };
    }

    const user = await prisma.user.findUnique({
      where:{
        email:email
      }
    })

    if(!user){
      return { error: "User not found" ,message:"",success:false };
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password || "");

    if(!isPasswordValid){
      return { error: "Invalid  password" ,message:"",success:false };
    }

   
    try {
       await signIn("credentials",{
        email,
        password,
        redirect:false
       })
       return { error: undefined, message: "Login successful" ,success:true };
    } catch (error) {
        const err = error as CredentialsSignin;
        
        if (err.type === "CredentialsSignin") {
          return { error: "Invalid email or password" ,message:"",success:false };    
        }
        
        return { error: "An error occurred during login" ,message:"",success:false };
    }
}
