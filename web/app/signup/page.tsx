import { Navbar } from "@/components/navbar";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Join announcify</p>
          <h1 className="mt-4 text-3xl font-semibold text-zinc-900">Create your account</h1>
          <p className="mt-2 text-base text-zinc-600">Save drafts, revisit cards, and unlock protection for your links.</p>
        </div>
        <div className="mt-8 w-full max-w-md">
          <SignUpForm />
        </div>
      </section>
    </main>
  );
}
