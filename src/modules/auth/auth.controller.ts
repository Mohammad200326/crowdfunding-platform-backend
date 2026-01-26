import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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
} from './dto/auth.dto';
import { LoginSchema } from './dto/auth.dto';

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

  @Post()
  create(@Body() createAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('password/forgot')
  async forgot(
    @Body(new ZodValidationPipe(ForgotPasswordSchema))
    forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    return this.passwordResetService.forgot(forgotPasswordDTO.email);
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
