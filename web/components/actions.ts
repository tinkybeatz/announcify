"use server";

import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/", "layout");
}
