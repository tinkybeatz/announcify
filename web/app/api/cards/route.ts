import { NextResponse } from "next/server";
import { getCards } from "@/lib/cards";

export async function GET() {
    try {
        const cards = await getCards();
        return NextResponse.json({ totalBirthday: cards.birthdayCards.length, totalValentines: cards.valentineCards.length, total: cards.total });
    } catch (error) {
        console.error("Error fetching cards:", error);
        return NextResponse.json({ totalBirthday: 0, totalValentines: 0, total: 0 }, { status: 500 });
    }
}
