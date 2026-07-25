
import { redis } from "../db/redisconnect.db.js";
import type { ICacheRepository } from "../interfaces/repositories/cache.repository.interface.js";

class RedisCacheRepository implements ICacheRepository
{
    async set ( key: string, value: string, ttlSeconds: number ): Promise<void>
    {
        await redis.set( key, value, "EX", ttlSeconds );
    }
    async get ( key: string ): Promise<string | null>
    {
        return await redis.get( key );
    }
    async delete ( key: string ): Promise<void>
    {
        await redis.del( key );
    }
}

export const cacheRepository = new RedisCacheRepository();