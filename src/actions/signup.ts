"use server"
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const signupHandler = async (prevState: {
    error?: string;
    success?: boolean;
    message?: string;
}, formData: FormData): Promise<{ error?: string; success?: boolean; message?: string }> => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    if(!email || !password || !username){
        return { error: "Please provide all fields", success: false, message: "" };
    }
    
    try{
        const existingUser = await prisma.user.findUnique({
            where:{email:email}
           })
        
           if(existingUser){
            return { error: "User already exists", success: false, message: "" };
           }
        const hashedPassword = await bcrypt.hash(password,10);
        await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                username
            }
        })
        return { error: undefined, success: true, message: "User created successfully" };
    }catch(error){
        console.error("Signup error:", error);
        return { error: "An error occurred during signup", success: false, message: "" };
    }
    
}

