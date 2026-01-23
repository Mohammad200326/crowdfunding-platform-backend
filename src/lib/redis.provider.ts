import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS = Symbol('REDIS');

export const redisProvider: Provider = {
  provide: REDIS,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const url = config.getOrThrow<string>('REDIS_URL');

    const fixedUrl = url.startsWith('redis://')
      ? url.replace('redis://', 'rediss://')
      : url;

    const client = new Redis(fixedUrl, {
      tls: {},
      connectTimeout: 10_000,
      maxRetriesPerRequest: 2,
      retryStrategy(times) {
        if (times >= 5) return null;
        return Math.min(times * 500, 3000);
      },
    });

    client.on('ready', () => console.log('[Redis] ready ✅'));
    client.on('error', (e) =>
      console.error('[Redis] error ❌', e?.message ?? e),
    );

    return client;
  },
};
