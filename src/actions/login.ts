"use server"
import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";

export const loginHandler = async (prevState: {
    error?: string;
}, formData: FormData): Promise<{ error?: string }> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(!email || !password) {
      return { error: "Please provide all fields" };
    }
   
    try {
       await signIn("credentials",{
        email,
        password
       })
       return { error: undefined };
    } catch (error) {
        const err = error as CredentialsSignin;
        
        if (err.type === "CredentialsSignin") {
          return { error: "Invalid email or password" };    
        }
        
        return { error: "An error occurred during login" };
    }
}
