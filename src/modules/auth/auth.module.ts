import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordResetService } from './password-reset.service';
import { UserModule } from '../user/user.module';
import { OtpService } from './otp.service';
import { RedisModule } from 'src/lib/redis.module';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    RedisModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService, OtpService],
})
export class AuthModule {}
