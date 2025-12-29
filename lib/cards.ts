import "server-only";

import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type { ParsedCardPayload } from "./cardPayload";

// ============================================
// Birthday Card Operations
// ============================================

export async function createBirthdayCard(
  payload: ParsedCardPayload,
  userId: string | null,
) {
  const id = nanoid(10);

  const created = await prisma.birthdayCard.create({
    data: { id, ...payload, theme: payload.theme ?? undefined, createdBy: userId },
    select: { id: true },
  });

  return created;
}

export async function getBirthdayCardForApi(id: string) {
  return await prisma.birthdayCard.findUnique({
    where: { id },
    select: {
      id: true,
      toName: true,
      fromName: true,
      message: true,
      theme: true,
      gift: true,
      createdAt: true,
    },
  });
}

export async function getBirthdayCardOwner(id: string) {
  return await prisma.birthdayCard.findUnique({
    where: { id },
    select: { createdBy: true },
  });
}

export async function deleteBirthdayCard(id: string) {
  await prisma.birthdayCard.delete({ where: { id } });
}

export async function updateBirthdayCard(id: string, payload: ParsedCardPayload) {
  await prisma.birthdayCard.update({
    where: { id },
    data: { ...payload, theme: payload.theme ?? undefined },
  });
}

export async function getBirthdayCards() {
  return await prisma.birthdayCard.findMany({
    select: {
      id: true,
      toName: true,
      fromName: true,
      createdAt: true,
      gift: true,
      giftDescription: true,
      customCardSignature: true,
      customGiftSignature: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserBirthdayCards(userId: string) {
  return await prisma.birthdayCard.findMany({
    where: { createdBy: userId },
    select: {
      id: true,
      toName: true,
      fromName: true,
      createdAt: true,
      gift: true,
      giftDescription: true,
      customCardSignature: true,
      customGiftSignature: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// ============================================
// Valentine Card Operations
// ============================================

export async function createValentineCard(
  payload: ParsedCardPayload,
  userId: string | null,
) {
  const id = nanoid(10);

  const created = await prisma.valentineCard.create({
    data: { id, ...payload, theme: payload.theme ?? Prisma.DbNull, createdBy: userId },
    select: { id: true },
  });

  return created;
}

export async function getValentineCards() {
  return await prisma.valentineCard.findMany({
    select: {
      id: true,
      toName: true,
      fromName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserValentineCards(userId: string) {
  return await prisma.valentineCard.findMany({
    where: { createdBy: userId },
    select: {
      id: true,
      toName: true,
      fromName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// ============================================
// Combined Card Operations
// ============================================

export async function getCards() {
  const [birthdayCards, valentineCards] = await Promise.all([
    getBirthdayCards(),
    getValentineCards(),
  ]);

  return {
    birthdayCards,
    valentineCards,
    total: birthdayCards.length + valentineCards.length,
  };
}

export async function getAllUserCards(userId: string) {
  const [birthdayCards, valentineCards] = await Promise.all([
    getUserBirthdayCards(userId),
    getUserValentineCards(userId),
  ]);

  return {
    birthdayCards,
    valentineCards,
    total: birthdayCards.length + valentineCards.length,
  };
}
