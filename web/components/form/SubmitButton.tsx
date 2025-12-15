"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  pendingLabel?: string;
  className?: string;
};

export function SubmitButton({ label, pendingLabel, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex w-full items-center justify-center rounded-md border border-rose-500 bg-rose-500 px-4 py-2 text-base font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ""}`}
    >
      {pending ? pendingLabel ?? `${label}...` : label}
    </button>
  );
}
