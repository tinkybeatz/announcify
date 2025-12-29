import { Prisma } from "@prisma/client";

export type ParsedCardPayload = {
  toName: string;
  fromName: string;
  message: string;
  gift: boolean;
  giftDescription: string | null;
  customCardSignature: string | null;
  customGiftSignature: string | null;
  isPublic: boolean;
  expiresAt: Date | null;
  theme: Prisma.JsonValue | null;
};

export function parseCardPayload(body: unknown): ParsedCardPayload | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;

  const toName = typeof raw.toName === "string" ? raw.toName.trim() : "";
  const fromName = typeof raw.fromName === "string" ? raw.fromName.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (!toName || !fromName || !message) return null;

  const gift =
    typeof raw.gift === "boolean" ? raw.gift : false;
  const giftDescriptionValue =
    typeof raw.giftDescription === "string" ? raw.giftDescription.trim() : null;
  const giftDescription =
    gift && giftDescriptionValue ? giftDescriptionValue : null;
  
  const customCardSignatureValue =
    typeof raw.customCardSignature === "string" ? raw.customCardSignature.trim() : null;
  const customCardSignature =
    customCardSignatureValue && customCardSignatureValue.length <= 50 
      ? customCardSignatureValue 
      : null;
  
  const customGiftSignatureValue =
    typeof raw.customGiftSignature === "string" ? raw.customGiftSignature.trim() : null;
  const customGiftSignature =
    customGiftSignatureValue && customGiftSignatureValue.length <= 50 
      ? customGiftSignatureValue 
      : null;
  
  const expiresRaw = raw.expiresAt;
  let expiresAt: Date | null = null;
  if (typeof expiresRaw === "string" && expiresRaw.trim()) {
    const parsed = new Date(expiresRaw);
    if (!Number.isNaN(parsed.getTime())) {
      expiresAt = parsed;
    }
  }

  const isPublic = typeof raw.isPublic === "boolean" ? raw.isPublic : true;
  const theme = (raw.theme ?? null) as Prisma.JsonValue | null;

  return {
    toName,
    fromName,
    message,
    gift,
    giftDescription,
    customCardSignature,
    customGiftSignature,
    isPublic,
    expiresAt,
    theme,
  };
}
