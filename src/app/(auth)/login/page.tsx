import { LoginForm } from "@/components/client/loginform";
import Image from "next/image";

import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Login() {
   const session = await auth();

  if(session?.user){
    redirect("/")

  }
  return <div className="flex w-screen h-screen  bg-gray-600">

    <div className="max-w-xl hidden md:block w-1/2 h-screen relative ">
      <Image  src="/loginperson.jpg" fill={true} alt="Login Person"   />
      <div className="absolute bottom-30 left-6"> 
                   <h2 className="text-2xl font-semibold">
                     {`"Everything you need, in one place"`}
                   </h2>
                   <p className="text-md text-amber-200">From none to sun, we chased the light — from simple dreams to shining bright.
Now all you seek, from near to far, lives right here — wherever you are.</p>
         </div>
    </div>

    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl font-bold ">Welcone back to HexaMart </h1>
      <p className="gray-200 font-semibold text-xl text-center">Shop smart, pay less — quality products at unbeatable prices.</p>
     <LoginForm/>
    </div>

  </div>;
}