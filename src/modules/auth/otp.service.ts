import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS } from 'src/lib/redis.provider';
import { generateOtp, hashOtp } from './util/otp.util';

@Injectable()
export class OtpService {
  constructor(@Inject(REDIS) private readonly redis: Redis) {}
  private ttl = 300; // 5 دقائق

  async sendOtp(email: string, purpose: string) {
    const otp = generateOtp();
    const hash = hashOtp(otp);

    const key = `otp:${purpose}:${email.toLowerCase()}`;

    await this.redis.set(key, hash, 'EX', this.ttl);

    console.log('OTP:', otp); // dev فقط

    return { otp, expiresIn: this.ttl };
  }

  async verifyOtp(email: string, purpose: string, otp: string) {
    const key = `otp:${purpose}:${email.toLowerCase()}`;

    const stored = await this.redis.get(key);

    if (!stored) throw new Error('OTP_EXPIRED');
    if (hashOtp(otp) !== stored) throw new Error('OTP_INVALID');

    await this.redis.del(key);
    return true;
  }
}
