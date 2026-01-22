import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OtpService } from './otp.service';

@Injectable()
export class PasswordResetService {
  private readonly RESET_TOKEN_TTL = 15 * 60;
  private readonly PURPOSE = 'forgot_password';

  constructor(
    private userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  async forgot(emailRaw: string) {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.user.findUnique({ where: { email } }); 
    if (user) {
      await this.otpService.sendOtp(email, this.PURPOSE);
    }
    return { message: 'If the email exists, an OTP has been sent.' };
  }

  
    /** 2) تحقق OTP وأرجع resetToken */
    async verify(emailRaw: string, otp: string) {
      const email = emailRaw.trim().toLowerCase();
  
      // تحقق أن المستخدم موجود (حتى لو OTP صحيح)
      const user = await this.db.user.findUnique({ where: { email } });
      if (!user) {
        // نفس سياسة الأمان: ممكن تخليه BadRequest عام
        throw new BadRequestException('Invalid OTP or email');
      }
  
      try {
        await this.otpService.verifyOtp(email, this.PURPOSE, otp);
      } catch (e: any) {
        // حوّل أخطاء OTP لخطاء HTTP مفهوم
        const code = e?.message ?? 'OTP_INVALID';
        if (code === 'OTP_EXPIRED') throw new BadRequestException('OTP expired');
        throw new BadRequestException('OTP invalid');
      }
  
      // أنشئ resetToken وخزنه في Redis
      const resetToken = randomUUID();
      const key = this.resetTokenKey(resetToken);
  
      await redis.set(key, user.id, 'EX', this.RESET_TOKEN_TTL);
  
      return { resetToken, expiresIn: this.RESET_TOKEN_TTL };
    }
  
    /** 3) تغيير كلمة المرور باستخدام resetToken */
    async reset(resetToken: string, newPassword: string) {
      const token = resetToken.trim();
  
      const key = this.resetTokenKey(token);
      const userId = await redis.get(key);
  
      if (!userId) {
        throw new BadRequestException('Reset token invalid or expired');
      }
  
      // one-time token
      await redis.del(key);
  
      const passwordHash = await bcrypt.hash(newPassword, 12);
  
      await this.db.user.update({
        where: { id: userId },
        data: { passwordHash }, // عدّلها حسب اسم العمود عندك
      });
  
      return { message: 'Password reset successfully' };
    }
  
    private resetTokenKey(token: string) {
      return `pwdreset:token:${token}`;
    }
  }
  