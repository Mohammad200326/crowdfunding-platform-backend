import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from './types/password-reset.schema';
import type {
  ForgotPasswordDTO,
  ResetPasswordDTO,
  VerifyOtpDTO,
  LoginDTO,
  registerDonorDTO,
} from './dto/auth.dto';
import { LoginSchema } from './dto/auth.dto';
import { donorValidationSchema } from '../donor/utils/donor.validation.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
  ) {}

  // LOGIN
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDTO) {
    return this.authService.login(dto);
  }
  @Post('register/donor')
  async registerDonor(
    @Body(new ZodValidationPipe(donorValidationSchema))
    registerDonorDto: registerDonorDTO,
  ) {
    return await this.authService.registerDonor(registerDonorDto);
  }

  @Post('password/forgot')
  async forgot(
    @Body(new ZodValidationPipe(ForgotPasswordSchema))
    forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  @Post('password/verify-otp')
  async verifyOTP(
    @Body(new ZodValidationPipe(VerifyOtpSchema))
    verifyOTPSchema: VerifyOtpDTO,
  ) {
    return this.passwordResetService.verify(
      verifyOTPSchema.email,
      verifyOTPSchema.otp,
    );
  }

  @Post('password/reset')
  async reset(
    @Body(new ZodValidationPipe(ResetPasswordSchema))
    resetPasswordDTO: ResetPasswordDTO,
  ) {
    return this.passwordResetService.reset(
      resetPasswordDTO.resetToken,
      resetPasswordDTO.password,
    );
  }
}
