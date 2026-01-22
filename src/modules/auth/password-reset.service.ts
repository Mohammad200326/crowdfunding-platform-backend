import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserService } from '../user/user.service';
import { randomUUID } from 'crypto';
import { redis } from 'src/lib/redis';
import { AuthService } from './auth.service';

@Injectable()
export class PasswordResetService {
  private readonly RESET_TOKEN_TTL = 15 * 60;
  private readonly PURPOSE = 'forgot_password';

  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private authService: AuthService,
  ) {}

  async forgot(emailRaw: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.userService.findByEmail(emailRaw);
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

    await redis.set(key, user.id, 'EX', this.RESET_TOKEN_TTL);
    return { resetToken, expiresIn: this.RESET_TOKEN_TTL };
  }

  async reset(resetToken: string, newPassword: string) {
    const token = resetToken.trim();
    const key = this.resetTokenKey(token);
    const userId = await redis.get(key);

    if (!userId) {
      throw new BadRequestException('Reset token invalid or expired');
    }

    await redis.del(key);

    const passwordHash = await this.authService.hashPassword(newPassword);

    this.userService.update(userId, { passwordHash });

    return { message: 'Password reset successfully' };
  }

  private resetTokenKey(token: string) {
    return `pwdreset:token:${token}`;
  }
}
