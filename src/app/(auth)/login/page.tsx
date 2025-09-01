import { LoginForm } from "@/components/client/loginform";
import Image from "next/image";

import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
      <div className="h-screen -mt-2 flex max-w-9xl ">
  <div className="relative hidden h-full w-1/2 md:block">
    <Image
      src="/loginperson.jpg"
      fill
      className="object-cover object-center"
      alt="Login Person"
      priority
    />
    <div className="absolute bottom-12 left-6 max-w-md text-white drop-shadow-lg">
      <h2 className="text-3xl font-bold mb-2">
        {`"Everything you need, in one place"`}
      </h2>
      <p className="text-lg text-amber-200 leading-relaxed">
        From none to sun, we chased the light — from simple dreams to shining
        bright. Now all you seek, from near to far, lives right here —
        wherever you are.
      </p>
    </div>
  </div>

  <div className="flex w-full h-full flex-col items-center justify-center p-8 md:w-1/2 ">
    <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
      Welcome back to <span className="text-blue-600">HexaMart</span>
    </h1>
    <p className="mb-8 text-center text-lg text-gray-600">
      Shop smart, pay less — quality products at unbeatable prices.
    </p>
    <LoginForm />
  </div>
</div>

  );
}
