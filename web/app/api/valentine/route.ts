import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseCardPayload } from "@/lib/cardPayload";

export async function POST(req: Request) {
  const payload = parseCardPayload(await req.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ error: "Missing toName, fromName, or message." }, { status: 400 });
  }

  const id = nanoid(10);

  const created = await prisma.valentineCard.create({
    data: { id, ...payload, theme: payload.theme ?? Prisma.DbNull },
    select: { id: true },
  });

  return NextResponse.json({ id: created.id, url: `/valentine/${created.id}` });
}
