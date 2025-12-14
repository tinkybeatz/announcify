export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

export default async function AnnouncementPage({ params }: { params: { id: string } }) {
  const ann = await prisma.announcement.findUnique({ where: { id: params.id } });
  if (!ann) return notFound();

  if (ann.type === "birthday_simple") {
    const d = isBirthdayData(ann.data)
      ? ann.data
      : { to: "friend", from: "someone", message: "" };

    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>🎂 Happy Birthday {d.to}!</h1>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 16 }}>{d.message}</p>
        <p style={{ opacity: 0.8 }}>— {d.from}</p>

        {d.presentEnabled && d.presentText ? (
          <div style={{ marginTop: 20, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
            <strong>🎁 Present:</strong> {d.presentText}
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Announcement</h1>
      <pre>{JSON.stringify(ann, null, 2)}</pre>
    </main>
  );
}