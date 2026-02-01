import { ApiProperty } from '@nestjs/swagger';
import { CreatorType, UserRole, VerificationStatus } from '@prisma/client';
import { Type } from 'class-transformer';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class DonorProfileDto {
  @ApiProperty({ example: 'Education and Health' })
  areasOfInterest!: string;

  @ApiProperty({ example: 'Charitable and Social' })
  preferredCampaignTypes!: string;

  @ApiProperty({ example: 'local' })
  geographicScope!: string;

  @ApiProperty({ example: 'Children and needy families' })
  targetAudience!: string;

  @ApiProperty({ example: 10000 })
  preferredCampaignSize!: number;

  @ApiProperty({ example: 'Public' })
  preferredCampaignVisibility!: string;
}

export class RegisterDonorDto {
  @ApiProperty({ example: 'Ahmed' })
  firstName!: string;

  @ApiProperty({ example: 'Mahmoud' })
  lastName!: string;

  @ApiProperty({ example: 'mahmoud@example.com' })
  email!: string;

  @ApiProperty({ example: '123456789', minLength: 8 })
  password!: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Date of birth in YYYY-MM-DD format',
  })
  dateOfBirth!: string;

  @ApiProperty({ example: '+970599123456', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'Palestine', required: false })
  country?: string;

  @ApiPropertyOptional({
    example: 'New donor interested in supporting charitable projects',
    required: false,
  })
  notes?: string;

  @ApiProperty({ type: DonorProfileDto, required: false })
  donorProfile?: DonorProfileDto;
}

export class DonorProfileResponseDto {
  @ApiProperty({ example: '537a8d3e-4cf3-4a57-9d9e-b379f682aa1e' })
  id!: string;

  @ApiProperty({ example: 'f2c0df9f-8756-49e3-85ea-695e651ca575' })
  userId!: string;

  @ApiProperty({ example: '1990-05-15T00:00:00.000Z' })
  dateOfBirth!: string;

  @ApiProperty({ example: 'Education and Health' })
  areasOfInterest!: string;

  @ApiProperty({ example: 'Charitable and Social' })
  preferredCampaignTypes!: string;

  @ApiProperty({ example: 'local' })
  geographicScope!: string;

  @ApiProperty({ example: 'Children and needy families' })
  targetAudience!: string;

  @ApiProperty({ example: 10000 })
  preferredCampaignSize!: number;

  @ApiProperty({ example: 'Public' })
  preferredCampaignVisibility!: string;

  @ApiProperty({ example: '2026-01-30T10:52:48.968Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-30T10:52:48.968Z' })
  updatedAt!: string;
}

export class RegisterDonorUserResponseDto {
  @ApiProperty({ example: 'f2c0df9f-8756-49e3-85ea-695e651ca575' })
  id!: string;

  @ApiProperty({ example: 'Ahmed' })
  firstName!: string;

  @ApiProperty({ example: 'Mahmoud' })
  lastName!: string;

  @ApiProperty({ example: 'aas.mahmoud@example.com' })
  email!: string;

  @ApiProperty({ example: 'DONOR' })
  role!: string;

  @ApiProperty({ example: 'Palestine' })
  country!: string;

  @ApiProperty({ example: '+970599123456' })
  phoneNumber!: string;

  @ApiProperty({
    example: 'New donor interested in supporting charitable projects',
  })
  notes!: string;

  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: '2026-01-30T10:52:48.968Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-30T10:52:48.968Z' })
  updatedAt!: string;

  @ApiProperty({ example: 'confirmed' })
  verificationStatus!: string;

  @ApiProperty({ type: DonorProfileResponseDto })
  donorProfile!: DonorProfileResponseDto;
}

export class RegisterDonorResponseDto {
  @ApiProperty({ type: RegisterDonorUserResponseDto })
  user!: RegisterDonorUserResponseDto;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMmMwZGY5Zi04NzU2LTQ5ZTMtODVlYS02OTVlNjUxY2E1NzUiLCJyb2xlIjoiRE9OT1IiLCJpYXQiOjE3Njk3NzAzNjgsImV4cCI6MTc3MjM2MjM2OH0.WmjTa0eO0oNtvkwJlV2ty6hInWgrNL7cgLwLV0EPBmk',
  })
  token!: string;
}

// ...existing code...

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

export class LoginRequestDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email!: string;

  @ApiProperty({ example: 'StrongPassword123' })
  password!: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'be1c995a-0c07-4222-a846-6f449905c70b' })
  id!: string;

  @ApiProperty({ example: 'Ahmad' })
  firstName!: string;

  @ApiProperty({ example: 'Al-Hassan' })
  lastName!: string;

  @ApiProperty({ example: 'ahmad.institution@example.com' })
  email!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.CAMPAIGN_CREATOR,
  })
  role!: UserRole;

  @ApiProperty({ example: 'Palestine' })
  country!: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: LoginUserDto })
  user!: LoginUserDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token!: string;
}

export class CampaignCreatorProfileDto {
  @ApiProperty({ example: 'NGO' })
  institutionType: string;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry: string;

  // NOTE: request comes as string, Zod will coerce to Date
  @ApiProperty({ example: '2015-01-01', format: 'date' })
  institutionDateOfEstablishment: string;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus: string;

  @ApiProperty({ example: 'TAX-123456' })
  institutionTaxIdentificationNumber: string;

  @ApiProperty({ example: 'REG-987654' })
  institutionRegistrationNumber: string;

  @ApiProperty({ example: 'Lina Hassan' })
  institutionRepresentativeName: string;

  @ApiProperty({ example: 'Director' })
  institutionRepresentativePosition: string;

  @ApiProperty({ example: 'REP-001' })
  institutionRepresentativeRegistrationNumber: string;

  @ApiProperty({ example: 'https://example.org' })
  institutionWebsite: string;

  @ApiProperty({ example: '@example_org' })
  institutionRepresentativeSocialMedia: string;
}

export class RegisterCampaignCreatorDto {
  @ApiProperty({ example: 'Ahmad' })
  firstName: string;

  @ApiProperty({ example: 'Saleh' })
  lastName: string;

  @ApiProperty({ example: 'creator@example.com' })
  email: string;

  @ApiProperty({ example: '123456789', minLength: 8 })
  password: string;

  @ApiProperty({ example: '+970599111223' })
  phoneNumber: string;

  @ApiProperty({ example: 'Palestine' })
  country: string;

  @ApiPropertyOptional({ example: 'Campaign creator account', nullable: true })
  notes?: string | null;

  // NOTE: request is string (Swagger); Zod coerces it to Date
  @ApiPropertyOptional({ example: '1998-06-12', format: 'date' })
  dateOfBirth?: string;

  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  @ApiPropertyOptional({
    type: () => CampaignCreatorProfileDto,
    nullable: true,
    description:
      'Optional. If provided, a CampaignCreator profile will be created in the same transaction.',
  })
  @Type(() => CampaignCreatorProfileDto)
  creatorProfile?: CampaignCreatorProfileDto | null;
}

/**
 * ===== Response DTOs
 */

export class CampaignCreatorProfileResponseDto {
  @ApiProperty({ example: '22d19b2a-2c3a-494d-98ce-98b5328a7c26' })
  id: string;

  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  @ApiProperty({ example: '1a0a3cd3-3341-43ff-aa4a-32552c8d2346' })
  userId: string;

  @ApiProperty({ example: 'NGO' })
  institutionType: string;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry: string;

  // DB usually returns ISO date-time string
  @ApiProperty({ example: '2015-01-01T00:00:00.000Z', format: 'date-time' })
  institutionDateOfEstablishment: string;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus: string;

  @ApiProperty({ example: 'TAX-123456' })
  institutionTaxIdentificationNumber: string;

  @ApiProperty({ example: 'REG-987654' })
  institutionRegistrationNumber: string;

  @ApiProperty({ example: 'Lina Hassan' })
  institutionRepresentativeName: string;

  @ApiProperty({ example: 'Director' })
  institutionRepresentativePosition: string;

  @ApiProperty({ example: 'REP-001' })
  institutionRepresentativeRegistrationNumber: string;

  @ApiProperty({ example: 'https://example.org' })
  institutionWebsite: string;

  @ApiProperty({ example: '@example_org' })
  institutionRepresentativeSocialMedia: string;

  @ApiProperty({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' })
  createdAt: string;

  @ApiProperty({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' })
  updatedAt: string;
}

export class CampaignCreatorUserDataResponseDto {
  @ApiProperty({ example: '1a0a3cd3-3341-43ff-aa4a-32552c8d2346' })
  id: string;

  @ApiProperty({ example: 'Ahmad' })
  firstName: string;

  @ApiProperty({ example: 'Saleh' })
  lastName: string;

  @ApiProperty({ example: 'creator@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CAMPAIGN_CREATOR })
  role: UserRole;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ example: '+970599111223', nullable: true })
  phoneNumber?: string | null;

  @ApiPropertyOptional({ example: 'Campaign creator account', nullable: true })
  notes?: string | null;

  @ApiPropertyOptional({
    example: '1998-06-12',
    format: 'date',
    nullable: true,
  })
  dateOfBirth?: string | null;

  @ApiProperty({ example: false })
  isDeleted: boolean;

  @ApiProperty({ example: false })
  isVerified: boolean;

  // إذا عندك enum في Prisma اسمه VerificationStatus استخدمه، وإلا خليها string
  @ApiProperty({
    enum: VerificationStatus,
    example: VerificationStatus.pending,
  })
  verificationStatus: VerificationStatus;

  @ApiProperty({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' })
  createdAt: string;

  @ApiProperty({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' })
  updatedAt: string;

  // أنت بترجّع type يدويًا في الـ response
  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  @ApiPropertyOptional({
    type: () => CampaignCreatorProfileResponseDto,
    nullable: true,
  })
  creatorProfile?: CampaignCreatorProfileResponseDto | null;
}

export class RegisterCampaignCreatorResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
  })
  token: string;

  @ApiProperty({ type: () => CampaignCreatorUserDataResponseDto })
  userData: CampaignCreatorUserDataResponseDto;
}
