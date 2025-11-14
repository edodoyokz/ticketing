"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function QueuePage() {
  const [position, setPosition] = useState<number | null>(null);
  useEffect(() => {
    setPosition(Math.floor(Math.random() * 1000) + 1);
    const t = setInterval(async () => {
      const res = await fetch("/api/queue/admission");
      const data = await res.json();
      if (data?.admit) {
        window.location.href = "/events";
      }
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Virtual Waiting Room</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Posisi Anda dalam antrian</p>
          <div className="mt-2 text-3xl font-bold">{position ?? "..."}</div>
          <p className="mt-4 text-sm">Halaman ini akan mengizinkan Anda masuk saat kapasitas mencukupi.</p>
        </CardContent>
      </Card>
    </main>
  );
}
