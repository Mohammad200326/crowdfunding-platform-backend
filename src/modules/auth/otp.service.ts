import { redis } from '../../lib/redis';
import { generateOtp, hashOtp } from './util/otp.util';

export class OtpService {
  private ttl = 300; // 5 دقائق

  async sendOtp(email: string, purpose: string) {
    const otp = generateOtp();
    const hash = hashOtp(otp);

    const key = `otp:${purpose}:${email.toLowerCase()}`;

    await redis.set(key, hash, 'EX', this.ttl);

    console.log('OTP:', otp);

    return { expiresIn: this.ttl };
  }

  async verifyOtp(email: string, purpose: string, otp: string) {
    const key = `otp:${purpose}:${email.toLowerCase()}`;

    const stored = await redis.get(key);

    if (!stored) throw new Error('OTP_EXPIRED');
    if (hashOtp(otp) !== stored) throw new Error('OTP_INVALID');

    await redis.del(key);
    return true;
  }
}
