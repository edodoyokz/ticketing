import { NextResponse } from "next/server";
import { enqueue, status } from "@/lib/queue";
import { limit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0] || "unknown";
  const allowed = await limit(`queue:${ip}`, Number(process.env.RL_QUEUE_MAX || 50), Number(process.env.RL_QUEUE_WINDOW || 60));
  if (!allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const { eventId, userId } = await req.json();
  if (!eventId || !userId) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const pos = await enqueue(eventId, userId);
  const st = await status(eventId, userId);
  return NextResponse.json({ ...st, position: pos.position });
}
