import Image from "next/image";
import Link from "next/link";

export default function Login() {
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

        <form className="flex flex-col gap-4 my-6  max-w-xl w-full  p-6" action="">
          
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" />
            <button className="cursor-pointer">Forgot password?</button>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-4xl cursor-pointer">Login</button>
            <Link href="/signup" className="text-center">Dont have an account? signup </Link>
          
          <button className="flex gap-4 items-center bg-amber-100 rounded-4xl p-2 text-gray-800 cursor-pointer"> <Image src="/googlelogo.png" width={30} height={20} alt="sign in with gogle "/>
            Sign in with google </button>
        </form>
    </div>

  </div>;
}