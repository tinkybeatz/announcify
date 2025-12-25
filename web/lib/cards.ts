import { prisma } from "./prisma";

export async function getBirthdayCards() {
    return await prisma.birthdayCard.findMany({
        select: {
            id: true,
            toName: true,
            fromName: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
};

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
};