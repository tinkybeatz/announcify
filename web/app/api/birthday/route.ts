import { NextResponse } from "next/server";
import { parseCardPayload } from "@/lib/cardPayload";
import {
  createBirthdayCard,
  deleteBirthdayCard,
  getBirthdayCardForApi,
  getBirthdayCardOwner,
  updateBirthdayCard,
} from "@/lib/birthdayCards";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const payload = parseCardPayload(await req.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ error: "Missing toName, fromName, or message." }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id || null;

  const created = await createBirthdayCard(payload, userId);

  return NextResponse.json({ id: created.id, url: `/birthday/${created.id}` });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  const card = await getBirthdayCardForApi(id);

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

  const card = await getBirthdayCardOwner(id);

  if (!card) {
    return NextResponse.json({ error: "Birthday card not found." }, { status: 404 });
  }

  if (card.createdBy !== session.user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await deleteBirthdayCard(id);

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

  const card = await getBirthdayCardOwner(id);

  if (!card) {
    return NextResponse.json({ error: "Birthday card not found." }, { status: 404 });
  }

  if (card.createdBy !== session.user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await updateBirthdayCard(id, payload);

  return NextResponse.json({ message: "Birthday card updated successfully." });
}
