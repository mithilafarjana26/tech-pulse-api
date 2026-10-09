
"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: resData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
      } else {
        console.log(resData);
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setErrorMessage("Google sign in failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-4 py-8">
      <div className="w-full max-w-[458px] rounded-2xl border border-[#dce3ef] bg-white px-6 py-9 shadow-sm sm:px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-[25px] font-bold tracking-tight text-[#111827]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#64748b]">
            Sign in to get real-time price alerts &amp; tech deals
          </p>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          onPress={handleGoogleSignIn}
          className="flex h-[47px] w-full items-center justify-center gap-3 rounded-xl border border-[#cbd5e1] bg-white text-sm font-semibold text-[#111827] hover:bg-gray-50"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#FBBC05"
              d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
            />
            <path
              fill="#EA4335"
              d="M24 12c3 0 5.7 1 7.8 3l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#dce3ef]" />
          <span className="text-xs text-[#94a3b8]">or</span>
          <div className="h-px flex-1 bg-[#dce3ef]" />
        </div>

        {/* Email and Password Form */}
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">

          <TextField
            name="email"
            type="email"
            isRequired
            className="w-full"
          >
            <Label className="mb-1.5 block text-[13px] font-medium text-[#172554]">
              Email address
            </Label>
            <Input
              placeholder="you@example.com"
              className="h-[43px] w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 text-sm text-[#111827] outline-none placeholder:text-[#94a3b8] focus:border-[#5038ff]"
            />
          </TextField>

          <TextField
            name="password"
            type="password"
            isRequired
            className="w-full"
          >
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="text-[13px] font-medium text-[#172554]">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-[13px] text-[#4935ff] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              placeholder="Enter your password"
              className="h-[43px] w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 text-sm text-[#111827] outline-none placeholder:text-[#94a3b8] focus:border-[#5038ff]"
            />
          </TextField>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={loading}
            className="mt-1 flex h-[46px] w-full items-center justify-center rounded-xl bg-[#5038ff] text-sm font-semibold text-white hover:bg-[#4225ed] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </Button>
        </Form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-xs text-[#64748b]">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#4935ff] hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;

