"use client"

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { loginHandler } from "@/actions/login";
import { useEffect } from "react";
import { toast } from "sonner";

export const LoginForm = ()=>{
  const initialState = { error: undefined ,message:"",success:false };
  const [state, formAction] = useActionState(loginHandler, initialState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success(state.message);
  }, [state.error, state.success, state.message]);

    return(
           <form action={formAction} className="flex flex-col gap-4 my-6  max-w-xl w-full  p-6" >
          
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" required />
            
            <button className="cursor-pointer">Forgot password?</button>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-4xl cursor-pointer">Login</button>
            <Link href="/signup" className="text-center">Dont have an account? signup </Link>
          
          <button className="flex gap-4 items-center bg-amber-100 rounded-4xl p-2 text-gray-800 cursor-pointer"> 
            <Image src="/googlelogo.png" width={30} height={20} alt="sign in with gogle "/>
            Sign in with google </button>
        </form>
    )
}