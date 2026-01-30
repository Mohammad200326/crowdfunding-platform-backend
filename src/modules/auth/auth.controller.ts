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
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ExpiresInResponseDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyForgotOtpDto,
  RegisterDonorDto,
  RegisterDonorResponseDto,
} from './dto/auth.swagger.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
  ) {}

  @Post('register/donor')
  @ApiOperation({ summary: 'Register new donor' })
  @ApiBody({ type: RegisterDonorDto })
  @ApiOkResponse({ type: RegisterDonorResponseDto })
  async registerDonor(
    @Body(new ZodValidationPipe(donorValidationSchema))
    registerDonorDto: registerDonorDTO,
  ) {
    return await this.authService.registerDonor(registerDonorDto);
  }

  // LOGIN
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('password/forgot')
  @ApiOperation({ summary: 'Send OTP for forgot password' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({ type: ExpiresInResponseDto })
  async forgot(
    @Body(new ZodValidationPipe(ForgotPasswordSchema))
    forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  @Post('password/verify-otp')
  @ApiOperation({ summary: 'Verify OTP and return reset token' })
  @ApiBody({ type: VerifyForgotOtpDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        resetToken: { type: 'string', format: 'uuid' },
      },
      required: ['resetToken'],
    },
  })
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
  @ApiOperation({ summary: 'Reset password using reset token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: { ok: { type: 'boolean', example: true } },
      required: ['ok'],
    },
  })
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
