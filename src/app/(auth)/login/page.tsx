import Image from "next/image";

export default function Login() {
  return <div className="flex justify-center items-center h-screen max-h-screen bg-blue-600">

    <div className="max-w-xl h-screen realtive bg-green-500">
      <Image  src="/loginperson.jpg" fill={true} className="object-contain" alt="Login Person"   />
    </div>

    <div className="flex flex-col justify-center items-center bg-red-500 w-1/2">
      <h1 className="text-2xl font-bold mb-4">Welcone back to HexaMart </h1>
      <p className="gray-200">Shop smart, pay less — quality products at unbeatable prices.</p>
        <form className="flex flex-col gap-4" action="">
          
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          
        </form>
    </div>

  </div>;
}