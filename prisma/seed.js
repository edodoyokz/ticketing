const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const starts = new Date(now.getTime() + 86400000);
  const ends = new Date(starts.getTime() + 7200000);
  const event = await prisma.event.upsert({
    where: { id: "seed-event-1" },
    update: {},
    create: {
      id: "seed-event-1",
      title: "Konser Musim Panas",
      description: "Konser musik dengan lineup terbaik.",
      startsAt: starts,
      endsAt: ends,
    },
  });
  const tt1 = await prisma.ticketType.upsert({
    where: { id: "seed-tt-regular" },
    update: {},
    create: {
      id: "seed-tt-regular",
      eventId: event.id,
      name: "Regular",
      price: 150000,
      stock: 500,
    },
  });
  const tt2 = await prisma.ticketType.upsert({
    where: { id: "seed-tt-vip" },
    update: {},
    create: {
      id: "seed-tt-vip",
      eventId: event.id,
      name: "VIP",
      price: 500000,
      stock: 50,
    },
  });
  console.log("Seed selesai:", { event: event.id, ticketTypes: [tt1.id, tt2.id] });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
