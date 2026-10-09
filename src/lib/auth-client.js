
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://concept-7-p1.vercel.app"),
});

export const { signIn, signUp, signOut, useSession } = authClient;
