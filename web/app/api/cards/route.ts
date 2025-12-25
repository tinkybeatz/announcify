import { NextResponse } from "next/server";
import { getCards } from "@/lib/cards";

export async function GET() {
    try {
        const cards = await getCards();
        return NextResponse.json({ total: cards.total });
    } catch (error) {
        console.error("Error fetching cards:", error);
        return NextResponse.json({ total: 0 }, { status: 500 });
    }
}
