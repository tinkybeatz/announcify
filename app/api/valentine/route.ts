import { NextResponse } from "next/server";
import { parseCardPayload } from "@/lib/cardPayload";
import { createValentineCard } from "@/lib/cards";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const payload = parseCardPayload(await req.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ error: "Missing toName, fromName, or message." }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id || null;

  const created = await createValentineCard(payload, userId);

  return NextResponse.json({ id: created.id, url: `/valentine/${created.id}` });
}
