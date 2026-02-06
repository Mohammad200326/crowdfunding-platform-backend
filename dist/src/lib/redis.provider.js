"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisProvider = exports.REDIS = void 0;
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
exports.REDIS = Symbol('REDIS');
exports.redisProvider = {
    provide: exports.REDIS,
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        const url = config.getOrThrow('REDIS_URL');
        const fixedUrl = url.startsWith('redis://')
            ? url.replace('redis://', 'rediss://')
            : url;
        const client = new ioredis_1.default(fixedUrl, {
            tls: {},
            connectTimeout: 10_000,
            maxRetriesPerRequest: 2,
            retryStrategy(times) {
                if (times >= 5)
                    return null;
                return Math.min(times * 500, 3000);
            },
        });
        client.on('ready', () => console.log('[Redis] ready ✅'));
        client.on('error', (e) => console.error('[Redis] error ❌', e?.message ?? e));
        return client;
    },
};
//# sourceMappingURL=redis.provider.js.map