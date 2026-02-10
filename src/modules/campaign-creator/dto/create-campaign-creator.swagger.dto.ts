import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignCreatorRequestDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Existing User ID',
  })
  userId!: string;

  @ApiProperty({
    example: 'INSTITUTION',
    enum: ['INDIVIDUAL', 'INSTITUTION'],
    description: 'Type of creator: INDIVIDUAL or INSTITUTION',
  })
  type!: 'INDIVIDUAL' | 'INSTITUTION';

  @ApiProperty({
    example: ['asset-uuid-1', 'asset-uuid-2'],
    description:
      'Array of asset IDs (uploaded documents like licenses, ID photos, certificates)',
    required: false,
    type: [String],
  })
  assetIds?: string[];

  @ApiProperty({
    example: 'Hope Foundation',
    description: 'Name of the institution (required for INSTITUTION type)',
    required: false,
  })
  institutionName?: string;

  @ApiProperty({
    example: 'Palestine',
    description:
      'Country where institution is located (required for INSTITUTION type)',
    required: false,
  })
  institutionCountry?: string;

  @ApiProperty({
    example: 'Non-Profit Organization',
    description: 'Type of institution (required for INSTITUTION type)',
    required: false,
  })
  institutionType?: string;

  @ApiProperty({
    example: '2020-01-15',
    format: 'date',
    description:
      'Date when institution was established (required for INSTITUTION type)',
    required: false,
  })
  institutionDateOfEstablishment?: string;

  @ApiProperty({
    example: 'Registered NGO',
    description: 'Legal status of institution (required for INSTITUTION type)',
    required: false,
  })
  institutionLegalStatus?: string;

  @ApiProperty({
    example: 'TAX-123456',
    description: 'Tax identification number (required for INSTITUTION type)',
    required: false,
  })
  institutionTaxIdentificationNumber?: string;

  @ApiProperty({
    example: 'REG-789012',
    description: 'Registration number (required for INSTITUTION type)',
    required: false,
  })
  institutionRegistrationNumber?: string;

  @ApiProperty({
    example: 'John Doe',
    description:
      'Name of institutional representative (required for INSTITUTION type)',
    required: false,
  })
  institutionRepresentativeName?: string;

  @ApiProperty({
    example: 'Director',
    description: 'Position of representative (required for INSTITUTION type)',
    required: false,
  })
  institutionRepresentativePosition?: string;

  @ApiProperty({
    example: 'ID-555',
    description:
      'Registration number of representative (required for INSTITUTION type)',
    required: false,
  })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiProperty({
    example: 'https://www.example.org',
    description: 'Official institution website',
    required: false,
  })
  institutionWebsite?: string;

  @ApiProperty({
    example: '@johndoe',
    description: "Representative's social media handle",
    required: false,
  })
  institutionRepresentativeSocialMedia?: string;
}

// Type-safe nested types for response
class UserInfo {
  @ApiProperty({ example: 'user-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'John' })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'CAMPAIGN_CREATOR' })
  role!: string;

  @ApiProperty({ example: 'Palestine', required: false })
  country?: string;

  @ApiProperty({ example: '+970123456789', required: false })
  phoneNumber?: string;
}

class AssetInfo {
  @ApiProperty({ example: 'asset-uuid-1' })
  id!: string;

  @ApiProperty({ example: 'https://example.com/license.pdf' })
  url!: string;

  @ApiProperty({ example: 'application/pdf' })
  fileType!: string;

  @ApiProperty({ example: 'INSTITUTION_COMMERCIAL_LICENSE' })
  kind!: string;

  @ApiProperty({ example: '2025-01-30T10:00:00.000Z' })
  createdAt!: Date;
}

export class CampaignCreatorResponseDto {
  @ApiProperty({ example: 'creator-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'user-uuid-123' })
  userId!: string;

  @ApiProperty({ example: 'INSTITUTION', enum: ['INDIVIDUAL', 'INSTITUTION'] })
  type!: 'INDIVIDUAL' | 'INSTITUTION';

  @ApiProperty({ example: 'Hope Foundation' })
  institutionName!: string;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

  @ApiProperty({ example: 'Non-Profit Organization' })
  institutionType!: string;

  @ApiProperty({ example: '2020-01-15T00:00:00.000Z' })
  institutionDateOfEstablishment!: Date;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus!: string;

  @ApiProperty({ example: 'TAX-123456' })
  institutionTaxIdentificationNumber!: string;

  @ApiProperty({ example: 'REG-789012' })
  institutionRegistrationNumber!: string;

  @ApiProperty({ example: 'John Doe' })
  institutionRepresentativeName!: string;

  @ApiProperty({ example: 'Director' })
  institutionRepresentativePosition!: string;

  @ApiProperty({ example: 'ID-555' })
  institutionRepresentativeRegistrationNumber!: string;

  @ApiProperty({ example: 'https://www.example.org' })
  institutionWebsite!: string;

  @ApiProperty({ example: '@johndoe' })
  institutionRepresentativeSocialMedia!: string;

  @ApiProperty({ example: '2025-01-30T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-01-30T10:00:00.000Z' })
  updatedAt!: Date;

  @ApiProperty({
    description: 'Associated user information',
    type: UserInfo,
  })
  user?: UserInfo;

  @ApiProperty({
    description: 'Linked assets (documents, certificates, IDs)',
    type: [AssetInfo],
  })
  assets?: AssetInfo[];
}

export class CreateCreatorResponseWrapper {
  @ApiProperty({ example: 'Campaign creator profile created successfully' })
  message!: string;

  @ApiProperty({ type: CampaignCreatorResponseDto })
  creator!: CampaignCreatorResponseDto;
}

export class UpdateCampaignCreatorRequestDto {
  @ApiProperty({ example: 'Hope Foundation', required: false })
  institutionName?: string;

  @ApiProperty({ example: 'Palestine', required: false })
  institutionCountry?: string;

  @ApiProperty({ example: 'Non-Profit Organization', required: false })
  institutionType?: string;

  @ApiProperty({ example: '2020-01-15', format: 'date', required: false })
  institutionDateOfEstablishment?: string;

  @ApiProperty({ example: 'Registered NGO', required: false })
  institutionLegalStatus?: string;

  @ApiProperty({ example: 'TAX-123456', required: false })
  institutionTaxIdentificationNumber?: string;

  @ApiProperty({ example: 'REG-789012', required: false })
  institutionRegistrationNumber?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  institutionRepresentativeName?: string;

  @ApiProperty({ example: 'Director', required: false })
  institutionRepresentativePosition?: string;

  @ApiProperty({ example: 'ID-555', required: false })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiProperty({ example: 'https://www.example.org', required: false })
  institutionWebsite?: string;

  @ApiProperty({ example: '@johndoe', required: false })
  institutionRepresentativeSocialMedia?: string;
}
