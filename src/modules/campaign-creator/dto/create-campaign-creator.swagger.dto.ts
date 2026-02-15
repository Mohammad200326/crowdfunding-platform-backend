import { ApiProperty } from '@nestjs/swagger';

export class BaseCreatorDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Existing User ID',
  })
  userId!: string;

  @ApiProperty({
    example: ['asset-uuid-1', 'asset-uuid-2'],
    description: 'Array of uploaded document IDs (IDs, Licenses)',
    required: false,
    type: [String],
  })
  assetIds?: string[];
}

export class CreateIndividualCreatorDto extends BaseCreatorDto {
  @ApiProperty({
    example: 'INDIVIDUAL',
    enum: ['INDIVIDUAL'],
    description:
      'Type of creator. Individual creators do not need institution details.',
  })
  type!: 'INDIVIDUAL';
}

export class CreateInstitutionCreatorDto extends BaseCreatorDto {
  @ApiProperty({
    example: 'INSTITUTION',
    enum: ['INSTITUTION'],
    description: 'Type of creator.',
  })
  type!: 'INSTITUTION';

  @ApiProperty({ example: 'Hope Foundation' })
  institutionName!: string;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

  @ApiProperty({ example: 'Non-Profit Organization' })
  institutionType!: string;

  @ApiProperty({ example: '2020-01-15' })
  institutionDateOfEstablishment!: string;

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

  @ApiProperty({ example: 'https://www.example.org', required: false })
  institutionWebsite?: string;

  @ApiProperty({ example: '@johndoe', required: false })
  institutionRepresentativeSocialMedia?: string;
}

export class CampaignCreatorResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ enum: ['INDIVIDUAL', 'INSTITUTION'] })
  type!: 'INDIVIDUAL' | 'INSTITUTION';

  @ApiProperty()
  institutionName!: string;

  @ApiProperty()
  institutionCountry!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class UpdateCampaignCreatorSwaggerDto {
  @ApiProperty({
    required: false,
    example: 'Palestine Hope Foundation',
    description: 'Institution name',
  })
  institutionName?: string;

  @ApiProperty({
    required: false,
    example: 'Palestine',
    description: 'Country',
  })
  institutionCountry?: string;

  @ApiProperty({
    required: false,
    example: 'Non-Profit Organization',
    description: 'Type of institution',
  })
  institutionType?: string;

  @ApiProperty({
    required: false,
    example: '2020-01-15',
    description: 'Date of establishment (YYYY-MM-DD)',
  })
  institutionDateOfEstablishment?: string;

  @ApiProperty({
    required: false,
    example: 'Registered NGO',
    description: 'Legal status',
  })
  institutionLegalStatus?: string;

  @ApiProperty({
    required: false,
    example: 'TAX-PS-123456',
    description: 'Tax identification number',
  })
  institutionTaxIdentificationNumber?: string;

  @ApiProperty({
    required: false,
    example: 'REG-NGO-789012',
    description: 'Registration number',
  })
  institutionRegistrationNumber?: string;

  @ApiProperty({
    required: false,
    example: 'Ahmad Hassan',
    description: 'Representative name',
  })
  institutionRepresentativeName?: string;

  @ApiProperty({
    required: false,
    example: 'Executive Director',
    description: 'Representative position',
  })
  institutionRepresentativePosition?: string;

  @ApiProperty({
    required: false,
    example: 'ID-555-2020',
    description: 'Representative registration number',
  })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiProperty({
    required: false,
    example: 'https://www.palestinehope.org',
    description: 'Institution website (can be empty string)',
  })
  institutionWebsite?: string;

  @ApiProperty({
    required: false,
    example: '@ahmadhassan',
    description: 'Social media handle',
  })
  institutionRepresentativeSocialMedia?: string;
}
