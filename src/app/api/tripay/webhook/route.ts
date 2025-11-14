import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-callback-signature") || req.headers.get("X-Callback-Signature") || "";
  const privateKey = process.env.TRIPAY_PRIVATE_KEY as string;
  if (!privateKey) {
    return NextResponse.json({ error: "tripay_not_configured" }, { status: 500 });
  }
  const expected = crypto.createHmac("sha256", privateKey).update(raw).digest("hex");
  if (signature !== expected) {
    return NextResponse.json({ success: false, message: "invalid_signature" }, { status: 400 });
  }
  const payload = JSON.parse(raw);
  const status = payload?.status;
  const reference = payload?.merchant_ref;
  return NextResponse.json({ success: true, reference, status });
}
