import Redis from "ioredis";

function getRedis() {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try { return new Redis(url); } catch { return null; }
}

export async function limit(key: string, max: number, windowSec: number) {
  const redis = getRedis();
  const now = Math.floor(Date.now() / 1000);
  const bucketKey = `rl:${key}:${Math.floor(now / windowSec)}`;
  if (redis) {
    const v = await redis.incr(bucketKey);
    if (v === 1) await redis.expire(bucketKey, windowSec);
    return v <= max;
  }
  return true;
}
