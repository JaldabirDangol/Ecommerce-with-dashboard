// components/client/loginform.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { loginHandler } from "@/actions/login";
import { useEffect } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const initialState = { error: undefined, message: "", success: false };
  const [state, formAction] = useActionState(loginHandler, initialState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success(state.message);
  }, [state.error, state.success, state.message]);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 shadow-lg"
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      {/* Forgot password */}
      <button
        type="button"
        className="self-end text-sm font-medium text-blue-600 hover:underline"
      >
        Forgot password?
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
      >
        Login
      </button>

      {/* Signup link */}
      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>

      {/* Divider */}
      <div className="my-2 flex items-center gap-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-sm text-gray-400">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google login */}
      <button
        type="button"
        onClick={() => signIn("google")}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
        <Image
          src="/googlelogo.png"
          width={20}
          height={20}
          alt="Google logo"
        />
        Sign in with Google
      </button>
    </form>
  );
};
