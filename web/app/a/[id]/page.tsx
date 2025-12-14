import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AnnouncementPage({ params }: { params: { id: string } }) {
  const ann = await prisma.announcement.findUnique({ where: { id: params.id } });
  if (!ann) return notFound();

  // Example: birthday_simple template
  if (ann.type === "birthday_simple") {
    const d = ann.data;
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

  // Fallback
  return (
    <main style={{ padding: 24 }}>
      <h1>Announcement</h1>
      <pre>{JSON.stringify(ann, null, 2)}</pre>
    </main>
  );
}