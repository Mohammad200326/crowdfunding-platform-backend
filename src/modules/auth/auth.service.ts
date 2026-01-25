import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}
  create(createAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async forgotPassword(email: string) {
    const { otp, expiresIn } = await this.otpService.sendOtp(
      email,
      'forgot_password',
    );

    await this.emailService.sendOtp(email, otp);

    return { expiresIn };
  }

  hashPassword(password: string) {
    return argon.hash(password);
  }

  verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }
}
