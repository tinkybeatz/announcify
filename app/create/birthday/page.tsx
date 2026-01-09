import { Navbar } from "@/components/navbar/Navbar";
import { CreateBirthdayForm } from "./CreateBirthdayForm";
import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";
import { NavbarBlue } from "@/components/navbar/NavbarBlue";

export default function CreateBirthdayPage() {
  return (
    // <main className="flex min-h-screen h-screen flex-col bg-zinc-100 pt-16 items-center justify-center">
    //   <Navbar />
    //   <CreateBirthdayForm />
    // </main>

    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50">
      <NavbarBlue />
      <div className="flex flex-col gap-6 h-full w-3/4 pt-8 z-10">
        <div className="flex flex-col gap-1 items-center justify-start">
          <h1 className="text-4xl font-extrabold font-raleway">
            Create a birthday card
          </h1>
          <p className="font-rethink font-light text-main-black/75">
            Celebrate special moments with personalized birthday cards. Make
            every occasion unforgettable with Announcify.
          </p>
          <CreateBirthdayForm />
        </div>
      </div>
    </div>
  );
}
