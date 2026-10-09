
"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { Form, Input, Label, TextField, Button } from "@heroui/react";
import { useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
      <div className="w-full max-w-[458px] rounded-2xl border border-[#dce3ef] bg-white px-8 py-9 shadow-sm sm:px-8">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-[25px] font-bold tracking-tight text-[#111827]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#64748b]">
            Sign in to get real-time price alerts &amp; tech deals
          </p>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          onPress={handleGoogleSignIn}
          className="flex h-[47px] w-full items-center justify-center gap-3 rounded-xl border border-[#cbd5e1] bg-white text-sm font-semibold text-[#111827] hover:bg-gray-50"
        >
          <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.03 13.22l7.98 6.19C12.9 13.72 18.02 9.5 24 9.5Z" transform="translate(0 4) scale(.92)"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.64 5.93c4.46-4.11 7.12-10.16 7.12-17.58Z"/>
            <path fill="#FBBC05" d="M10.64 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.64-5.93c-2.12 1.42-4.84 2.27-8.26 2.27-5.98 0-11.1-4.22-12.99-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/>
          </svg>
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#dce3ef]" />
          <span className="text-xs text-[#94a3b8]">or</span>
          <div className="h-px flex-1 bg-[#dce3ef]" />
        </div>

        {/* Sign In Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField name="email" type="email" isRequired className="w-full">
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
            className="mt-1 flex h-[46px] w-full items-center justify-center rounded-xl bg-[#5038ff] text-sm font-semibold text-white transition hover:bg-[#4225ed] disabled:opacity-60"
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

