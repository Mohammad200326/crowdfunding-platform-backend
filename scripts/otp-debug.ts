import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import Redis from 'ioredis';

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const redis = new Redis(mustGetEnv('REDIS_URL'));

function generateOtp(length = 6) {
  const n = crypto.randomInt(0, 10 ** length);
  return n.toString().padStart(length, '0');
}

function hashOtp(otp: string) {
  return crypto
    .createHmac('sha256', mustGetEnv('OTP_SECRET'))
    .update(otp)
    .digest('hex');
}

async function main() {
  const email = 'test@example.com';
  const purpose = 'VERIFY_EMAIL';
  const ttlSec = 60; // خليها 60 للتجربة

  const otp = generateOtp();
  const otpHash = hashOtp(otp);

  const key = `otp:${purpose}:${email.toLowerCase()}`;

  console.log('\n--- OTP DEBUG START ---');
  console.log('key:', key);
  console.log('otp (for debug only):', otp);
  console.log('hash:', otpHash);

  // 1) store with TTL
  await redis.set(key, otpHash, 'EX', ttlSec);
  console.log('stored ✅');
  console.log('ttl:', await redis.ttl(key), 'sec');

  // 2) read back
  const stored = await redis.get(key);
  console.log('storedHash:', stored);

  // 3) verify with correct otp
  const incomingHash = hashOtp(otp);
  console.log('incomingHash:', incomingHash);

  if (!stored) {
    console.log('verify ❌ OTP_EXPIRED');
  } else if (incomingHash !== stored) {
    console.log('verify ❌ OTP_INVALID');
  } else {
    console.log('verify ✅ OK - deleting key');
    await redis.del(key);
  }

  // 4) confirm delete
  console.log('after del ttl:', await redis.ttl(key));
  console.log('--- OTP DEBUG END ---\n');

  await redis.quit();
}

main().catch(async (e) => {
  console.error('ERROR:', e);
  try {
    await redis.quit();
  } catch {
    console.log('');
  }
  process.exit(1);
});
