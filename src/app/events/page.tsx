import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const fallbackEvents = [
  { id: "demo-1", title: "Konser Pembuka", description: "Simulasi event untuk demo." },
  { id: "demo-2", title: "Festival Budaya", description: "Gunakan sebagai contoh data di staging." },
];

export default async function EventsPage() {
  const events = fallbackEvents;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Event</h1>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 ? (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Belum ada event</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Tambahkan event di admin, atau gunakan seeding nanti.</p>
            </CardContent>
          </Card>
        ) : (
          events.map((ev) => (
            <Card key={ev.id}>
              <CardHeader>
                <h2 className="text-lg font-semibold">{ev.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{ev.description ?? ""}</p>
                <Link className="text-sm underline mt-2 inline-block" href={`/events/${ev.id}`}>Detail</Link>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
