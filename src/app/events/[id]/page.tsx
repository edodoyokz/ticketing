import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EventDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  let event: any = null;
  try {
    event = await prisma.event.findUnique({ where: { id }, include: { ticketTypes: true } });
  } catch {
    event = null;
  }
  if (!event) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Event tidak ditemukan</h1>
        <p className="mt-2 text-sm"><Link href="/events" className="underline">Kembali ke Events</Link></p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{event.title}</h1>
      <p className="mt-2 text-sm">{event.description ?? ""}</p>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {event.ticketTypes.map((tt: any) => (
          <Card key={tt.id}>
            <CardHeader>
              <h2 className="text-lg font-semibold">{tt.name}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Harga: Rp {tt.price}</p>
              <p className="text-sm">Stok: {tt.stock}</p>
              <Button className="mt-2" variant="secondary">
                <Link href="/queue">Masuk Antrian</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
