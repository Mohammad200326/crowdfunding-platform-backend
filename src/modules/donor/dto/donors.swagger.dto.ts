import { ApiProperty } from '@nestjs/swagger';
import {
  DonorProfileResponseDto,
  RegisterDonorUserResponseDto,
} from 'src/modules/auth/dto/auth.swagger.dto';

export class FindAllDonorsResponseDto {
  @ApiProperty({ type: [RegisterDonorUserResponseDto] })
  data!: RegisterDonorUserResponseDto[];
}

// Update Donor Form DTO for Swagger
export class UpdateDonorFormDto {
  @ApiProperty({ example: 'Ahmed', required: false })
  firstName?: string;

  @ApiProperty({ example: 'Mahmoud', required: false })
  lastName?: string;

  @ApiProperty({ example: 'ahmed@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '1990-05-15', required: false })
  dateOfBirth?: string;

  @ApiProperty({ example: '+970599123456', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'Palestine', required: false })
  country?: string;

  @ApiProperty({ example: 'Notes about the donor', required: false })
  notes?: string;

  @ApiProperty({ example: 'Education and Health', required: false })
  'donorProfile[areasOfInterest]'?: string;

  @ApiProperty({ example: 'Charitable and Social', required: false })
  'donorProfile[preferredCampaignTypes]'?: string;

  @ApiProperty({ example: 'local', required: false })
  'donorProfile[geographicScope]'?: string;

  @ApiProperty({ example: 'Children and needy families', required: false })
  'donorProfile[targetAudience]'?: string;

  @ApiProperty({ example: 10000, required: false })
  'donorProfile[preferredCampaignSize]'?: number;

  @ApiProperty({ example: 'Public', required: false })
  'donorProfile[preferredCampaignVisibility]'?: string;

  @ApiProperty({ example: 'Full Name on ID', required: false })
  fullNameOnId?: string;

  @ApiProperty({ example: '123456789', required: false })
  idNumber?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  idFront?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  idBack?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  selfieWithId?: any;
}

// Asset Response DTO
export class AssetResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'imagekit' })
  storageProviderName!: string;

  @ApiProperty({ example: 'https://ik.imagekit.io/xxx/image.jpg' })
  fileImmutableUrl!: string;

  @ApiProperty({ example: 'DONOR_ID_FRONT' })
  kind!: string;
}

// Donor Identity Response DTO
export class DonorIdentityResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  donorId!: string;

  @ApiProperty({ example: 'Ahmed Mahmoud' })
  fullNameOnId!: string;

  @ApiProperty({ example: '123456789', nullable: true })
  idNumber!: string | null;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  updatedAt!: string;

  @ApiProperty({ type: [AssetResponseDto] })
  assets!: AssetResponseDto[];
}

// User Response (without password) DTO
export class UserWithoutPasswordDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Ahmed' })
  firstName!: string;

  @ApiProperty({ example: 'Mahmoud' })
  lastName!: string;

  @ApiProperty({ example: 'ahmed@example.com' })
  email!: string;

  @ApiProperty({ example: '1990-05-15T00:00:00.000Z' })
  dateOfBirth!: string;

  @ApiProperty({ example: 'DONOR' })
  role!: string;

  @ApiProperty({ example: 'Palestine' })
  country!: string;

  @ApiProperty({ example: '+970599123456' })
  phoneNumber!: string;

  @ApiProperty({ example: 'Notes about the donor' })
  notes!: string;

  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @ApiProperty({ example: false })
  isVerified!: boolean;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  updatedAt!: string;

  @ApiProperty({ example: 'pending' })
  verificationStatus!: string;
}

// Update Donor Response DTO
export class UpdateDonorResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId!: string;

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

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  updatedAt!: string;

  @ApiProperty({ type: DonorIdentityResponseDto, nullable: true })
  identity!: DonorIdentityResponseDto | null;

  @ApiProperty({ type: UserWithoutPasswordDto })
  user!: UserWithoutPasswordDto;
}

export class DonorFindOneResponseDto {
  @ApiProperty({ example: '5078c7d2-530a-40fd-adda-e2a762892ce3' })
  id!: string;

  @ApiProperty({ example: 'Ahmed' })
  firstName!: string;

  @ApiProperty({ example: 'Mahmoud' })
  lastName!: string;

  @ApiProperty({ example: 'ahmesedaaaa.mahmoud@example.com' })
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

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-26T09:29:20.773Z' })
  updatedAt!: string;

  @ApiProperty({ example: 'confirmed' })
  verificationStatus!: string;

  @ApiProperty({ type: DonorProfileResponseDto })
  donorProfile!: DonorProfileResponseDto;
}
