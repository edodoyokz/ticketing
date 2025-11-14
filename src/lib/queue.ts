import Redis from "ioredis";

type QueueStatus = { admit: boolean; etaSeconds: number; position: number };

let memoryQueue: string[] = [];

function getRedis() {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    return new Redis(url);
  } catch {
    return null;
  }
}

export async function enqueue(eventId: string, userId: string) {
  const redis = getRedis();
  const key = `queue:${eventId}`;
  const member = `${Date.now()}:${userId}`;
  if (redis) {
    await redis.zadd(key, Date.now(), member);
    const rank = await redis.zrank(key, member);
    return { position: (rank ?? 0) + 1 };
  }
  memoryQueue.push(member);
  return { position: memoryQueue.length };
}

async function getAdmitLimit(redis: Redis | null, keyBase: string) {
  if (redis) {
    const raw = await redis.get(`${keyBase}:admit_limit`);
    return raw ? Number(raw) : 50;
  }
  return 50;
}

export async function status(eventId: string, userId: string): Promise<QueueStatus> {
  const redis = getRedis();
  const key = `queue:${eventId}`;
  if (redis) {
    const members = await redis.zrange(key, 0, -1);
    const idx = members.findIndex((m) => m.endsWith(`:${userId}`));
    const position = idx >= 0 ? idx + 1 : 0;
    const limit = await getAdmitLimit(redis, key);
    const admit = position > 0 && position <= limit;
    const etaSeconds = Math.max(0, position * 5);
    return { admit, etaSeconds, position };
  }
  const idx = memoryQueue.findIndex((m) => m.endsWith(`:${userId}`));
  const position = idx >= 0 ? idx + 1 : 0;
  const admit = position > 0 && position <= 50;
  const etaSeconds = Math.max(0, position * 5);
  return { admit, etaSeconds, position };
}

export async function increaseAdmit(eventId: string, count: number) {
  const redis = getRedis();
  const key = `queue:${eventId}`;
  if (redis) {
    const currentRaw = await redis.get(`${key}:admit_limit`);
    const current = currentRaw ? Number(currentRaw) : 50;
    const next = Math.max(0, current + count);
    await redis.set(`${key}:admit_limit`, String(next));
    return next;
  }
  return 50;
}
