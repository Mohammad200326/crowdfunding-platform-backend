import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordResetService } from './password-reset.service';
import { UserModule } from '../user/user.module';
import { OtpService } from './otp.service';
import { RedisModule } from 'src/lib/redis.module';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvVariables } from 'src/types/declartion-mergin';
import { ConfigService } from '@nestjs/config';
import { FileModule } from '../file/file.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    UserModule,
    RedisModule,
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService, OtpService, EmailService],
})
export class AuthModule {}
