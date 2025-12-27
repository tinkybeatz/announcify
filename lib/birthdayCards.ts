import "server-only";

import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import type { ParsedCardPayload } from "@/lib/cardPayload";

export async function createBirthdayCard(
  payload: ParsedCardPayload,
  userId: string | null,
) {
  const id = nanoid(10);

  const created = await prisma.birthdayCard.create({
    data: { id, ...payload, theme: payload.theme ?? undefined, createdBy: userId },
    select: { id: true },
  });

  return created;
}

export async function getBirthdayCardForApi(id: string) {
  return await prisma.birthdayCard.findUnique({
    where: { id },
    select: {
      id: true,
      toName: true,
      fromName: true,
      message: true,
      theme: true,
      presentEnabled: true,
      createdAt: true,
    },
  });
}

export async function getBirthdayCardOwner(id: string) {
  return await prisma.birthdayCard.findUnique({
    where: { id },
    select: { createdBy: true },
  });
}

export async function deleteBirthdayCard(id: string) {
  await prisma.birthdayCard.delete({ where: { id } });
}

export async function updateBirthdayCard(id: string, payload: ParsedCardPayload) {
  await prisma.birthdayCard.update({
    where: { id },
    data: { ...payload, theme: payload.theme ?? undefined },
  });
}
