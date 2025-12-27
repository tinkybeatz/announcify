import { Navbar } from "@/components/navbar/navbar";
import { CreateValentineForm } from "./CreateValentineForm";

export default function CreateValentinePage() {
  return (
    <main className="flex min-h-screen h-screen flex-col bg-zinc-100 pt-16 items-center justify-center">
      <Navbar />
      <CreateValentineForm />
    </main>
  );
}
