import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const themesDir = path.join(process.cwd(), "app/birthday/[id]/themes");
    const files = fs.readdirSync(themesDir);
    
    return NextResponse.json({ count: files.length });
  } catch (error) {
    console.error("Error reading themes directory:", error);
    return NextResponse.json({ count: 0, error: "Failed to read themes directory" }, { status: 500 });
  }
}
