import { NextResponse } from "next/server";
import crypto from "crypto";
import { limit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0] || "unknown";
  const allowed = await limit(`tripay:${ip}`, Number(process.env.RL_TRIPAY_MAX || 20), Number(process.env.RL_TRIPAY_WINDOW || 60));
  if (!allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const { amount, method, reference, customer_name, customer_email } = await req.json();
  if (!amount || !method || !reference) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const merchant = process.env.TRIPAY_MERCHANT_CODE as string;
  const apiKey = process.env.TRIPAY_API_KEY as string;
  const privateKey = process.env.TRIPAY_PRIVATE_KEY as string;
  const base = process.env.TRIPAY_BASE_URL || "https://payment.tripay.co.id/api";
  if (!merchant || !apiKey || !privateKey) {
    return NextResponse.json({ error: "tripay_not_configured" }, { status: 500 });
  }
  const payload = `${merchant}${reference}${amount}`;
  const signature = crypto.createHmac("sha256", privateKey).update(payload).digest("hex");
  const body = {
    method,
    merchant_ref: reference,
    amount,
    customer_name,
    customer_email,
    signature,
  };
  let res: Response;
  try {
    res = await fetch(`${base}/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return NextResponse.json({ error: "tripay_unreachable" }, { status: 502 });
  }
  let data: any;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return NextResponse.json(data, { status: res.status });
}
