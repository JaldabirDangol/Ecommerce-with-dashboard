"use client"
import Link from "next/link"
import { signupHandler } from "@/actions/signup"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export const SignupForm = ()=>{            
    const initialState = { error: undefined ,success:false,message:""};
    const [state,formAction] = useActionState(signupHandler,initialState);
    
     useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success(state.message);
  }, [state.error, state.success, state.message]);
    return(
        <form action={formAction} className="flex flex-col gap-4 my-6  max-w-xl w-full  p-6" >
            <label htmlFor="username">username</label>
            <input type="text"  name="username" className="w-full p-2 border border-gray-300 rounded" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" />
          
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-4xl cursor-pointer">Signup</button>
            <Link href="/login" className="text-center">Already have an account? login </Link>  
        </form>
    )
}