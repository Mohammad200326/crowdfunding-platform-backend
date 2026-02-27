import crypto from 'crypto';

export function generateOtp(length = 5) {
  const n = crypto.randomInt(0, 10 ** length);
  return n.toString().padStart(length, '0');
}

export function hashOtp(otp: string) {
  return crypto
    .createHmac('sha256', process.env.OTP_SECRET)
    .update(otp)
    .digest('hex');
}
