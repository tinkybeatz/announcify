"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { signInAction, type AuthFormState } from "@/app/signin/actions";
import { SubmitButton } from "@/components/form/SubmitButton";

const initialState: AuthFormState = {};

export function SignInForm() {
  const [state, formAction] = useActionState(signInAction, initialState);
  const router = useRouter();
  const { update } = useSession();

  useEffect(() => {
    if (state.success) {
      update().then(() => {
        router.push("/user");
        router.refresh();
      });
    }
  }, [state, router, update]);

  return (
    <form action={formAction} className="w-full space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-lg">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-zinc-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
      </div>
      {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
      <div className="space-y-3">
        <SubmitButton label="Sign in" pendingLabel="Signing in..." />
        <p className="text-center text-sm text-zinc-600">
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-rose-500 hover:text-rose-600">
            Create one
          </Link>
        </p>
      </div>
    </form>
  );
}
