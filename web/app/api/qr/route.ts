import QRCode from "qrcode";

function normalizePath(input: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  let targetPath = normalizePath(url.searchParams.get("path"));

  if (!targetPath) {
    const referer = req.headers.get("referer");
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        targetPath = refererUrl.pathname + refererUrl.search;
      } catch {
        // ignore invalid referer
      }
    }
  }

  if (!targetPath) {
    return new Response(JSON.stringify({ error: "Missing path query parameter." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const target = `${url.origin}${targetPath}`;
  const png = await QRCode.toBuffer(target, { type: "png", margin: 1, width: 512 });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
