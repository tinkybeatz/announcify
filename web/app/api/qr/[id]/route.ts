import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url);
  const origin = url.origin;
  const target = `${origin}/a/${params.id}`;

  const png = await QRCode.toBuffer(target, { type: "png", margin: 1, width: 512 });

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}