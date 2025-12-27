import { Navbar } from "@/components/navbar/navbar";
import { CreateBirthdayForm } from "./CreateBirthdayForm";

export default function CreateBirthdayPage() {
  return (
    // <main className="flex min-h-screen h-screen flex-col bg-zinc-100 pt-16 items-center justify-center">
    //   <Navbar />
    //   <CreateBirthdayForm />
    // </main>

    <div className="flex flex-col items-center justify-center h-screen bg-main-white">
      <Navbar />
      <div className="flex flex-col gap-6 h-full w-3/4 pt-28">
        <div className="flex flex-col gap-1 items-start justify-start">
          <h1 className="text-4xl font-bold font-accent">
            Create a birthday card
          </h1>
          <p className="font-main font-light text-main-black/75">
            Celebrate special moments with personalized birthday cards. Make
            every occasion unforgettable with Announcify.
          </p>
          <CreateBirthdayForm />
        </div>
      </div>
    </div>
  );
}
