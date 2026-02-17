"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto_1 = __importDefault(require("crypto"));
const ioredis_1 = __importDefault(require("ioredis"));
function mustGetEnv(name) {
    const v = process.env[name];
    if (!v)
        throw new Error(`Missing env var: ${name}`);
    return v;
}
const redis = new ioredis_1.default(mustGetEnv('REDIS_URL'));
function generateOtp(length = 6) {
    const n = crypto_1.default.randomInt(0, 10 ** length);
    return n.toString().padStart(length, '0');
}
function hashOtp(otp) {
    return crypto_1.default
        .createHmac('sha256', mustGetEnv('OTP_SECRET'))
        .update(otp)
        .digest('hex');
}
async function main() {
    const email = 'test@example.com';
    const purpose = 'VERIFY_EMAIL';
    const ttlSec = 60;
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const key = `otp:${purpose}:${email.toLowerCase()}`;
    console.log('\n--- OTP DEBUG START ---');
    console.log('key:', key);
    console.log('otp (for debug only):', otp);
    console.log('hash:', otpHash);
    await redis.set(key, otpHash, 'EX', ttlSec);
    console.log('stored ✅');
    console.log('ttl:', await redis.ttl(key), 'sec');
    const stored = await redis.get(key);
    console.log('storedHash:', stored);
    const incomingHash = hashOtp(otp);
    console.log('incomingHash:', incomingHash);
    if (!stored) {
        console.log('verify ❌ OTP_EXPIRED');
    }
    else if (incomingHash !== stored) {
        console.log('verify ❌ OTP_INVALID');
    }
    else {
        console.log('verify ✅ OK - deleting key');
        await redis.del(key);
    }
    console.log('after del ttl:', await redis.ttl(key));
    console.log('--- OTP DEBUG END ---\n');
    await redis.quit();
}
main().catch(async (e) => {
    console.error('ERROR:', e);
    try {
        await redis.quit();
    }
    catch {
        console.log('');
    }
    process.exit(1);
});
//# sourceMappingURL=otp-debug.js.map