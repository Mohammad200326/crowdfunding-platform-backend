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
  @ApiPropertyOptional({ example: 'Institution', nullable: true })
  institutionName?: string | null;

  @ApiPropertyOptional({ example: 'NGO', nullable: true })
  institutionType?: string | null;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  institutionCountry?: string | null;

  @ApiPropertyOptional({
    example: '2015-01-01',
    format: 'date',
    nullable: true,
  })
  institutionDateOfEstablishment?: string | null;

  @ApiPropertyOptional({ example: 'Registered NGO', nullable: true })
  institutionLegalStatus?: string | null;

  @ApiPropertyOptional({ example: 'TAX-123456', nullable: true })
  institutionTaxIdentificationNumber?: string | null;

  @ApiPropertyOptional({ example: 'REG-987654', nullable: true })
  institutionRegistrationNumber?: string | null;

  @ApiPropertyOptional({ example: 'Lina Hassan', nullable: true })
  institutionRepresentativeName?: string | null;

  @ApiPropertyOptional({ example: 'Director', nullable: true })
  institutionRepresentativePosition?: string | null;

  @ApiPropertyOptional({ example: 'REP-001', nullable: true })
  institutionRepresentativeRegistrationNumber?: string | null;

  @ApiPropertyOptional({ example: 'https://example.org', nullable: true })
  institutionWebsite?: string | null;

  @ApiPropertyOptional({ example: '@example_org', nullable: true })
  institutionRepresentativeSocialMedia?: string | null;
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

  @ApiPropertyOptional({ example: '+970599111223', nullable: true })
  phoneNumber?: string | null;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ example: 'Campaign creator account', nullable: true })
  notes?: string | null;

  @ApiPropertyOptional({
    example: '1998-06-12',
    format: 'date',
    nullable: true,
  })
  dateOfBirth?: string | null;

  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  // ✅ جديد
  @ApiPropertyOptional({
    type: [String],
    description: 'Optional general asset ids to be attached to the creator',
    example: ['uuid1', 'uuid2'],
  })
  assetIds?: string[];

  @ApiPropertyOptional({
    type: () => InstitutionDocumentsDto,
    nullable: true,
    description:
      'Optional institution documents (asset IDs) to attach to creator',
  })
  @Type(() => InstitutionDocumentsDto)
  institutionDocuments?: InstitutionDocumentsDto | null;

  @ApiPropertyOptional({
    type: () => CampaignCreatorProfileDto,
    nullable: true,
    description: 'Optional creator profile data (can be partial).',
  })
  @Type(() => CampaignCreatorProfileDto)
  creatorProfile?: CampaignCreatorProfileDto | null;
}

/**
 * ===== Response DTOs
 */

export class CampaignCreatorProfileResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  @ApiProperty({ example: 'uuid' })
  userId: string;

  @ApiPropertyOptional({ example: 'Institution', nullable: true })
  institutionName?: string | null;

  @ApiPropertyOptional({ example: 'NGO', nullable: true })
  institutionType?: string | null;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  institutionCountry?: string | null;

  @ApiPropertyOptional({
    example: '2015-01-01T00:00:00.000Z',
    format: 'date-time',
    nullable: true,
  })
  institutionDateOfEstablishment?: string | null;

  @ApiPropertyOptional({ example: 'Registered NGO', nullable: true })
  institutionLegalStatus?: string | null;

  @ApiPropertyOptional({ example: 'TAX-123456', nullable: true })
  institutionTaxIdentificationNumber?: string | null;

  @ApiPropertyOptional({ example: 'REG-987654', nullable: true })
  institutionRegistrationNumber?: string | null;

  @ApiPropertyOptional({ example: 'Lina Hassan', nullable: true })
  institutionRepresentativeName?: string | null;

  @ApiPropertyOptional({ example: 'Director', nullable: true })
  institutionRepresentativePosition?: string | null;

  @ApiPropertyOptional({ example: 'REP-001', nullable: true })
  institutionRepresentativeRegistrationNumber?: string | null;

  @ApiPropertyOptional({ example: 'https://example.org', nullable: true })
  institutionWebsite?: string | null;

  @ApiPropertyOptional({ example: '@example_org', nullable: true })
  institutionRepresentativeSocialMedia?: string | null;

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

export class InstitutionDocumentsDto {
  @ApiPropertyOptional({
    example: 'uuid',
    description: 'INSTITUTION_REGISTRATION_CERTIFICATE asset id',
  })
  registrationCertificateId?: string;

  @ApiPropertyOptional({
    example: 'uuid',
    description: 'INSTITUTION_COMMERCIAL_LICENSE asset id',
  })
  commercialLicenseId?: string;

  @ApiPropertyOptional({
    example: 'uuid',
    description: 'INSTITUTION_REPRESENTATIVE_ID_PHOTO asset id',
  })
  representativeIdPhotoId?: string;

  @ApiPropertyOptional({
    example: 'uuid',
    description: 'INSTITUTION_COMMISSIONER_IMAGE asset id',
  })
  commissionerImageId?: string;

  @ApiPropertyOptional({
    example: 'uuid',
    description: 'INSTITUTION_AUTHORIZATION_LETTER asset id',
  })
  authorizationLetterId?: string;
}

export class RegisterCampaignCreatorFormDto {
  @ApiProperty({ example: 'Ahmad' })
  firstName: string;

  @ApiProperty({ example: 'Saleh' })
  lastName: string;

  @ApiProperty({ example: 'creator@example.com' })
  email: string;

  @ApiProperty({ example: '123456789', minLength: 8 })
  password: string;

  @ApiPropertyOptional({ example: '+970599111223', nullable: true })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  country?: string;

  @ApiPropertyOptional({ example: 'Campaign creator account', nullable: true })
  notes?: string;

  @ApiPropertyOptional({
    example: '1998-06-12',
    format: 'date',
    nullable: true,
  })
  dateOfBirth?: string;

  @ApiProperty({ enum: CreatorType, example: CreatorType.INSTITUTION })
  type: CreatorType;

  // ===== Institution profile (flat) — optional because DB nullable now =====
  @ApiPropertyOptional({ example: 'Institution', nullable: true })
  institutionName?: string;

  @ApiPropertyOptional({ example: 'NGO', nullable: true })
  institutionType?: string;

  @ApiPropertyOptional({ example: 'Palestine', nullable: true })
  institutionCountry?: string;

  @ApiPropertyOptional({
    example: '2015-01-01',
    format: 'date',
    nullable: true,
  })
  institutionDateOfEstablishment?: string;

  @ApiPropertyOptional({ example: 'Registered NGO', nullable: true })
  institutionLegalStatus?: string;

  @ApiPropertyOptional({ example: 'TAX-123456', nullable: true })
  institutionTaxIdentificationNumber?: string;

  @ApiPropertyOptional({ example: 'REG-987654', nullable: true })
  institutionRegistrationNumber?: string;

  @ApiPropertyOptional({ example: 'Lina Hassan', nullable: true })
  institutionRepresentativeName?: string;

  @ApiPropertyOptional({ example: 'Director', nullable: true })
  institutionRepresentativePosition?: string;

  @ApiPropertyOptional({ example: 'REP-001', nullable: true })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiPropertyOptional({ example: 'https://example.org', nullable: true })
  institutionWebsite?: string;

  @ApiPropertyOptional({ example: '@example_org', nullable: true })
  institutionRepresentativeSocialMedia?: string;

  // ===== Files (optional) =====
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  registrationCertificate?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  commercialLicense?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  representativeIdPhoto?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  commissionerImage?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  authorizationLetter?: any;
}
