import "server-only";

import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ParsedCardPayload } from "@/lib/cardPayload";

export async function createValentineCard(
  payload: ParsedCardPayload,
  userId: string | null,
) {
  const id = nanoid(10);

  const created = await prisma.valentineCard.create({
    data: { id, ...payload, theme: payload.theme ?? Prisma.DbNull, createdBy: userId },
    select: { id: true },
  });

  return created;
}
