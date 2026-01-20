import Redis from 'ioredis';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const redis = new Redis(process.env.REDIS_URL);
