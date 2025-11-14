import { NextResponse } from "next/server";

export async function GET() {
  const admit = Math.random() > 0.7;
  const etaSeconds = Math.floor(Math.random() * 120) + 30;
  return NextResponse.json({ admit, etaSeconds });
}
