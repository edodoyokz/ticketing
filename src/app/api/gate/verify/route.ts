import { NextResponse } from "next/server";
import { verifyTicket } from "@/lib/ticket";

export async function POST(req: Request) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  try {
    const payload = await verifyTicket(token);
    return NextResponse.json({ valid: true, payload });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
