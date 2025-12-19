import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { parseCardPayload } from "@/lib/cardPayload";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const payload = parseCardPayload(await req.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ error: "Missing toName, fromName, or message." }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id || null;

  const id = nanoid(10);

  const created = await prisma.birthdayCard.create({
    data: { id, ...payload, theme: payload.theme ?? undefined, createdBy: userId },
    select: { id: true },
  });

  return NextResponse.json({ id: created.id, url: `/birthday/${created.id}` });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  const card = await prisma.birthdayCard.findUnique({
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

  if (!card) {
    return NextResponse.json({ error: "Birthday card not found." }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const card = await prisma.birthdayCard.findUnique({
    where: { id },
    select: { createdBy: true },
  });

  if (!card) {
    return NextResponse.json({ error: "Birthday card not found." }, { status: 404 });
  }

  if (card.createdBy !== session.user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await prisma.birthdayCard.delete({ where: { id } });

  return NextResponse.json({ message: "Birthday card deleted successfully." });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  const payload = parseCardPayload(await req.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ error: "Missing toName, fromName, or message." }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const card = await prisma.birthdayCard.findUnique({
    where: { id },
    select: { createdBy: true },
  });

  if (!card) {
    return NextResponse.json({ error: "Birthday card not found." }, { status: 404 });
  }

  if (card.createdBy !== session.user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await prisma.birthdayCard.update({
    where: { id },
    data: { ...payload, theme: payload.theme ?? undefined },
  });

  return NextResponse.json({ message: "Birthday card updated successfully." });
}