import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  // Minimal validation (expand later)
  const type = body?.type;
  const data = body?.data;
  const theme = body?.theme ?? null;

  if (!type || !data) {
    return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
  }

  const id = nanoid(10);

  const created = await prisma.announcement.create({
    data: { id, type, data, theme },
    select: { id: true },
  });

  return NextResponse.json({ id: created.id });
}