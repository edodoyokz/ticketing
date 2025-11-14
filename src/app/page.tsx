import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/db";

export default async function Home() {
  let events: Array<{ id: string; title: string; description: string | null }> = [];
  try {
    events = await prisma.event.findMany({ orderBy: { startsAt: "asc" }, take: 3 });
  } catch {
    events = [];
  }
  return (
    <main>
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold">Ticketing untuk event modern</h1>
              <p className="mt-2 text-sm">Pembayaran Tripay, Virtual Waiting Room, dan Gate Scanner.</p>
              <div className="mt-4 flex gap-2">
                <Button>
                  <Link href="/events">Lihat Event</Link>
                </Button>
                <Button variant="secondary">
                  <Link href="/queue">Masuk Waiting Room</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Siap produksi</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Integrasi pembayaran, antrian, dan verifikasi tiket siap dipakai.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="text-xl font-semibold">Fitur</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Pembayaran Tripay</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Dukungan transaksi dan webhook verifikasi otomatis.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Virtual Waiting Room</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Antrian adil dengan batas admit yang dapat diatur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Gate Scanner</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Verifikasi tiket cepat saat entry gate.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="text-xl font-semibold">Event Terbaru</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.length === 0 ? (
              <p className="text-sm">Belum ada event.</p>
            ) : (
              events.map((ev) => (
                <Card key={ev.id}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{ev.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{ev.description ?? ""}</p>
                    <Button variant="secondary" className="mt-2">
                      <Link href={`/events/${ev.id}`}>Detail</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
