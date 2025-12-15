"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export type SignupFormState = {
  error?: string;
};

const signupSchema = z.object({
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export async function signupAction(
  _prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const parsed = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Please provide a valid first name, last name, email, and password." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return { error: "That email is already registered. Try signing in." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: `${parsed.data.firstName.trim()} ${parsed.data.lastName.trim()}`.trim(),
      firstName: parsed.data.firstName.trim(),
      lastName: parsed.data.lastName.trim(),
      email,
      passwordHash,
    },
  });

  try {
    await signIn("credentials", {
      redirectTo: "/user",
      email,
      password: parsed.data.password,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but we could not sign you in automatically." };
    }
    throw error;
  }
}
