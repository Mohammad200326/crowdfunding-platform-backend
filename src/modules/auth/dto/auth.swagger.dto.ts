import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email!: string;
}

export class VerifyForgotOtpDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email!: string;

  @ApiProperty({ example: '63324', description: '5 digits OTP' })
  otp!: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  resetToken!: string;

  @ApiProperty({ example: 'NewStrongPass123', minLength: 8 })
  password!: string;
}

export class ExpiresInResponseDto {
  @ApiProperty({ example: 900, description: 'Seconds until OTP expires' })
  expiresIn!: number;
}
