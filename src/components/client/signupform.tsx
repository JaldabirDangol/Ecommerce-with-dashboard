"use client";
import Link from "next/link";
import { signupHandler } from "@/actions/signup";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export const SignupForm = () => {
  const initialState = { error: undefined, success: false, message: "" };
  const [state, formAction] = useActionState(signupHandler, initialState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success(state.message);
  }, [state.error, state.success, state.message]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 my-6 w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-4">Create Account</h2>

      <label htmlFor="username" className="text-gray-200 font-medium">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="email" className="text-gray-200 font-medium">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="password" className="text-gray-200 font-medium">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full transition-colors"
      >
        Signup
      </button>

      <p className="text-center text-gray-300 mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};
