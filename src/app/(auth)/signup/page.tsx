import Image from "next/image";
import { SignupForm } from "@/components/client/signupform";

export default function Signup() {
  return (
    <div className="flex flex-col -mt-2 md:flex-row max-w-9xl w-full h-screen bg-gray-600">
      {/* Left image panel */}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen hidden md:block">
        <Image
          src="/loginperson.jpg"
          alt="Login Person"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-8 left-6 bg-black/50 p-4 rounded">
          <h2 className="text-2xl font-semibold text-white">
            "Everything you need, in one place"
          </h2>
          <p className="mt-2 text-sm text-amber-200">
            From none to sun, we chased the light — from simple dreams to shining
            bright. Now all you seek, from near to far, lives right here —
            wherever you are.
          </p>
        </div>
      </div>

  
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-gray-600">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Welcome to HexaMart
        </h1>
        <p className="text-gray-200 font-medium text-lg md:text-xl mb-6 text-center">
          Shop smart, pay less — quality products at unbeatable prices.
        </p>

        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
