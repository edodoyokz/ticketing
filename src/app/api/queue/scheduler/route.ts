import { NextResponse } from "next/server";
import { increaseAdmit } from "@/lib/queue";

export async function POST(req: Request) {
  const { eventId, batch } = await req.json();
  if (!eventId) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const count = typeof batch === "number" ? batch : Number(process.env.ADMISSION_BATCH || 50);
  const limit = await increaseAdmit(eventId, count);
  return NextResponse.json({ limit });
}
