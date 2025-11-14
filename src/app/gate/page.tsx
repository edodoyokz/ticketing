"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GatePage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Entry Gate Scanner</h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input className="flex-1 rounded-[var(--radius-sm)] border border-border bg-input px-3 py-2 text-sm" placeholder="Tempel kode QR" value={code} onChange={(e) => setCode(e.target.value)} />
            <Button onClick={async () => {
              const res = await fetch("/api/gate/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: code }) });
              const data = await res.json();
              setResult(data?.valid ? "valid" : "invalid");
            }}>Verifikasi</Button>
          </div>
          {result && <p className="mt-4 text-sm">Hasil: {result}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
