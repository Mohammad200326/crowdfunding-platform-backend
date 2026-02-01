import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignCreatorRequestDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Existing User ID',
  })
  userId!: string;

  @ApiProperty({ example: 'INSTITUTION', enum: ['INDIVIDUAL', 'INSTITUTION'] })
  type!: 'INDIVIDUAL' | 'INSTITUTION';

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

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

  @ApiProperty({ example: 'Name Surname', required: false })
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

// FIX: Renamed from CreatorProfileResponseDto to CampaignCreatorResponseDto
export class CampaignCreatorResponseDto {
  @ApiProperty({ example: 'creator-uuid-123' })
  id!: string;
  @ApiProperty({ example: 'user-uuid-123' })
  userId!: string;
  @ApiProperty({ example: 'INSTITUTION' })
  type!: string;
  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;
  @ApiProperty({ example: '2025-01-30T10:00:00.000Z' })
  createdAt!: string;
}

export class CreateCreatorResponseWrapper {
  @ApiProperty({ example: 'Campaign creator profile created successfully' })
  message!: string;

  @ApiProperty({ type: CampaignCreatorResponseDto })
  creator!: CampaignCreatorResponseDto;
}
