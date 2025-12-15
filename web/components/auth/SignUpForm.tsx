"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signupAction, type SignupFormState } from "@/app/signup/actions";
import { SubmitButton } from "@/components/form/SubmitButton";

const initialState: SignupFormState = {};

export function SignUpForm() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="w-full space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-lg">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-zinc-700">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>
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
          autoComplete="new-password"
          required
          className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
        <p className="mt-1 text-xs text-zinc-500">Use 8 or more characters with a mix of letters and numbers.</p>
      </div>
      {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
      <div className="space-y-3">
        <SubmitButton label="Create account" pendingLabel="Creating account..." />
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-rose-500 hover:text-rose-600">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
