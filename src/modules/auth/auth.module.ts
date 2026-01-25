import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordResetService } from './password-reset.service';
import { UserModule } from '../user/user.module';
import { OtpService } from './otp.service';
import { RedisModule } from 'src/lib/redis.module';
import { EmailService } from './email.service';

@Module({
  imports: [UserModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService, OtpService, EmailService],
})
export class AuthModule {}
