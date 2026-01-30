import { ApiProperty } from '@nestjs/swagger';
import { CreatorType, UserRole } from '@prisma/client';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class DonorProfileDto {
  @ApiProperty({
    example: '1990-05-15',
    description: 'Date of birth in YYYY-MM-DD format',
  })
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

  @ApiProperty({ example: '+970599123456' })
  phoneNumber!: string;

  @ApiProperty({ example: 'Palestine' })
  country!: string;

  @ApiPropertyOptional({
    example: 'New donor interested in supporting charitable projects',
  })
  notes?: string;

  @ApiProperty({ type: DonorProfileDto })
  donorProfile!: DonorProfileDto;
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

export class CreatorProfileDto {
  @ApiProperty({
    enum: CreatorType,
    example: CreatorType.INSTITUTION,
  })
  type!: CreatorType;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

  @ApiProperty({ example: 'Non-Profit Organization' })
  institutionType!: string;

  @ApiProperty({
    example: '2015-03-20',
    description: 'ISO date string',
  })
  institutionDateOfEstablishment!: string;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus!: string;

  @ApiProperty({ example: 'TAX-PL-987654' })
  institutionTaxIdentificationNumber!: string;

  @ApiProperty({ example: 'REG-2015-1122' })
  institutionRegistrationNumber!: string;

  @ApiProperty({ example: 'Mohammad Saleh' })
  institutionRepresentativeName!: string;

  @ApiProperty({ example: 'Executive Director' })
  institutionRepresentativePosition!: string;

  @ApiProperty({ example: 'REP-445566' })
  institutionRepresentativeRegistrationNumber!: string;

  @ApiProperty({ example: 'https://example-ngo.org' })
  institutionWebsite!: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/mohammad-saleh',
  })
  institutionRepresentativeSocialMedia!: string;
}

export class RegisterCampaignCreatorDto {
  @ApiProperty({ example: 'Ahmad' })
  firstName!: string;

  @ApiProperty({ example: 'Al-Hassan' })
  lastName!: string;

  @ApiProperty({ example: 'ahmad.institution@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongPassword123', minLength: 6 })
  password!: string;

  @ApiProperty({ example: '+970598123456' })
  phoneNumber!: string;

  @ApiProperty({ example: 'Palestine' })
  country!: string;

  @ApiProperty({
    example:
      'Non-profit organization focused on education and community development',
    required: false,
  })
  notes?: string;

  @ApiProperty({ type: CreatorProfileDto })
  creatorProfile!: CreatorProfileDto;
}

export class CampaignCreatorProfileResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    enum: CreatorType,
    example: CreatorType.INSTITUTION,
  })
  type!: CreatorType;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

  @ApiProperty({ example: 'Non-Profit Organization' })
  institutionType!: string;

  @ApiProperty({
    example: '2015-03-20T00:00:00.000Z',
    description: 'ISO Date string',
  })
  institutionDateOfEstablishment!: string;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus!: string;

  @ApiProperty({ example: 'TAX-PL-987654' })
  institutionTaxIdentificationNumber!: string;

  @ApiProperty({ example: 'REG-2015-1122' })
  institutionRegistrationNumber!: string;

  @ApiProperty({ example: 'Mohammad Saleh' })
  institutionRepresentativeName!: string;

  @ApiProperty({ example: 'Executive Director' })
  institutionRepresentativePosition!: string;

  @ApiProperty({ example: 'REP-445566' })
  institutionRepresentativeRegistrationNumber!: string;

  @ApiProperty({ example: 'https://example-ngo.org' })
  institutionWebsite!: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/mohammad-saleh',
  })
  institutionRepresentativeSocialMedia!: string;

  @ApiProperty({
    example: '2026-01-30T22:10:26.761Z',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2026-01-30T22:10:26.761Z',
  })
  updatedAt!: string;
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
