import { NextResponse } from "next/server";
import { getTotalUsers } from "@/lib/users";

export async function GET() {
    try {
        const totalUsers = await getTotalUsers();
        return NextResponse.json({ totalUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ totalUsers: 0 }, { status: 500 });
    }
}