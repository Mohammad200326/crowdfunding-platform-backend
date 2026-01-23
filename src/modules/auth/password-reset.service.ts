import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserService } from '../user/user.service';
import { randomUUID } from 'crypto';
import { AuthService } from './auth.service';
import Redis from 'ioredis';
import { REDIS } from 'src/lib/redis.provider';

@Injectable()
export class PasswordResetService {
  private readonly RESET_TOKEN_TTL = 15 * 60;
  private readonly PURPOSE = 'forgot_password';

  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private authService: AuthService,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async forgot(emailRaw: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);
    if (user) {
      await this.otpService.sendOtp(email, this.PURPOSE);
    }
    return { message: 'If the email exists, an OTP has been sent.' };
  }

  async verify(emailRaw: string, otp: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid OTP or email');
    }

    try {
      await this.otpService.verifyOtp(email, this.PURPOSE, otp);
    } catch (e: unknown) {
      const code = e instanceof Error ? e?.message : 'OTP_INVALID';
      if (code === 'OTP_EXPIRED') throw new BadRequestException('OTP expired');
      throw new BadRequestException('OTP invalid');
    }

    const resetToken = randomUUID();
    const key = this.resetTokenKey(resetToken);

    await this.redis.set(key, user.id, 'EX', this.RESET_TOKEN_TTL);
    return { resetToken, expiresIn: this.RESET_TOKEN_TTL };
  }

  async reset(resetToken: string, newPassword: string) {
    const token = resetToken.trim();

    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const key = this.resetTokenKey(token);
    const userId = await this.redis.get(key);

    if (!userId) {
      throw new BadRequestException('Reset token invalid or expired');
    }

    await this.redis.del(key);

    const passwordHash = await this.authService.hashPassword(newPassword);

    await this.userService.update(userId, { password: passwordHash });

    return { message: 'Password reset successfully' };
  }

  private resetTokenKey(token: string) {
    return `pwdreset:token:${token}`;
  }
}
