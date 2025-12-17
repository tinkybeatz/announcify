import { Navbar } from "@/components/navbar";
import { CreateBirthdayForm } from "./CreateBirthdayForm";

export default function CreateBirthdayPage() {
  return (
    <main className="flex min-h-screen h-screen flex-col bg-zinc-100 pt-16 items-center justify-center">
      <Navbar />
      <CreateBirthdayForm />
    </main>
  );
}
