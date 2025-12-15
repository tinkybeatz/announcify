export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PresentUnwrap from "./PresentUnwrap";

type BirthdayData = {
  to: string;
  from: string;
  message: string;
  presentEnabled?: boolean;
  presentText?: string;
};

function isBirthdayData(x: unknown): x is BirthdayData {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.to === "string" &&
    typeof o.from === "string" &&
    typeof o.message === "string"
  );
}

export default async function AnnouncementPage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  const ann = await prisma.announcement.findUnique({ where: { id } });
  if (!ann) return notFound();

  if (ann.type === "birthday_simple") {
    const d = isBirthdayData(ann.data)
      ? ann.data
      : { to: "friend", from: "someone", message: "" };

    return <PresentUnwrap data={d} />
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Announcement</h1>
      <pre>{JSON.stringify(ann, null, 2)}</pre>
    </main>
  );
}
