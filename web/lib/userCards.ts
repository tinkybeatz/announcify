import { prisma } from "@/lib/prisma";

export async function getUserBirthdayCards(userId: string) {
  return await prisma.birthdayCard.findMany({
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
