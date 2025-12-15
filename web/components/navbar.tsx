import Link from "next/link";

export function Navbar() {
  return (
    <div className="h-16 border-b border-zinc-300 items-center flex w-full p-3 justify-between">
      <Link
        href="/"
        className="flex border border-rose-500 h-full px-2 items-center rounded-md shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
      >
        Announcify
      </Link>
      <div className="flex gap-2 text-sm h-full">
        <Link
          href="/"
          className="flex border border-rose-500 h-full px-2 items-center rounded-md shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
        >
          Sign-in
        </Link>
        <Link
          href="/"
          className="flex bg-rose-500 h-full px-2 items-center text-white rounded-md shadow-md hover:bg-rose-600 hover:shadow-none font-medium"
        >
          Sign-up
        </Link>
      </div>
    </div>
  );
}
