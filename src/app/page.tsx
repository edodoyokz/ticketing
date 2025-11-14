import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Event Terbaru</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Mulai jelajahi event dan tipe tiket.</p>
            <div className="mt-4 flex gap-2">
              <Button>
                <Link href="/events">Lihat Event</Link>
              </Button>
              <Button variant="secondary">
                <Link href="/queue">Virtual Waiting Room</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
