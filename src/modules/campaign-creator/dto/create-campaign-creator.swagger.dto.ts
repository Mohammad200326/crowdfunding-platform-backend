import { ApiProperty } from '@nestjs/swagger';

//  Base
class BaseCreatorDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID (must exist in the system)',
  })
  userId!: string;

  @ApiProperty({
    example: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
    description: 'Optional uploaded asset/document IDs to link to this creator',
    required: false,
    type: [String],
  })
  assetIds?: string[];
}

//  Create
export class CreateIndividualCreatorDto extends BaseCreatorDto {
  @ApiProperty({
    example: 'INDIVIDUAL',
    enum: ['INDIVIDUAL'],
    description:
      'Creator type. For INDIVIDUAL, all institution fields are auto-filled from user data.',
  })
  type!: 'INDIVIDUAL';
}

export class CreateInstitutionCreatorDto extends BaseCreatorDto {
  @ApiProperty({
    example: 'INSTITUTION',
    enum: ['INSTITUTION'],
    description:
      'Creator type. For INSTITUTION, provide institution details below. All fields are optional - missing fields will be filled with N/A.',
  })
  type!: 'INSTITUTION';

  @ApiProperty({ example: 'Palestine Hope Foundation', required: false })
  institutionName?: string;

  @ApiProperty({ example: 'Palestine', required: false })
  institutionCountry?: string;

  @ApiProperty({ example: 'Non-Profit Organization', required: false })
  institutionType?: string;

  @ApiProperty({ example: '2020-01-15', format: 'date', required: false })
  institutionDateOfEstablishment?: string;

  @ApiProperty({ example: 'Registered NGO', required: false })
  institutionLegalStatus?: string;

  @ApiProperty({ example: 'TAX-PS-123456', required: false })
  institutionTaxIdentificationNumber?: string;

  @ApiProperty({ example: 'REG-NGO-789012', required: false })
  institutionRegistrationNumber?: string;

  @ApiProperty({ example: 'Ahmad Hassan', required: false })
  institutionRepresentativeName?: string;

  @ApiProperty({ example: 'Executive Director', required: false })
  institutionRepresentativePosition?: string;

  @ApiProperty({ example: 'ID-555-2020', required: false })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiProperty({
    example: 'https://www.palestinehope.org',
    format: 'uri',
    required: false,
  })
  institutionWebsite?: string;

  @ApiProperty({ example: '@ahmadhassan', required: false })
  institutionRepresentativeSocialMedia?: string;
}

//  Update
export class UpdateCampaignCreatorSwaggerDto {
  //  User Fields
  @ApiProperty({
    example: 'Ahmad',
    description: 'First name',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    example: 'Hassan',
    description: 'Last name',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: '+970591234567',
    description: 'Phone number',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    example: 'Palestine',
    description: 'Country',
    required: false,
  })
  country?: string;

  @ApiProperty({
    example: 'Some notes about the creator',
    description: 'Additional notes',
    required: false,
  })
  notes?: string;

  //  Institution Fields
  @ApiProperty({
    example: 'Palestine Hope Foundation Updated',
    description: 'Institution name',
    required: false,
  })
  institutionName?: string;

  @ApiProperty({
    example: 'Palestine',
    description: 'Institution country',
    required: false,
  })
  institutionCountry?: string;

  @ApiProperty({
    example: 'Non-Profit Organization',
    description: 'Institution type',
    required: false,
  })
  institutionType?: string;

  @ApiProperty({
    example: '2020-01-15',
    description: 'Date of establishment (YYYY-MM-DD)',
    required: false,
  })
  institutionDateOfEstablishment?: string;

  @ApiProperty({ example: 'Registered NGO', required: false })
  institutionLegalStatus?: string;

  @ApiProperty({ example: 'TAX-PS-123456', required: false })
  institutionTaxIdentificationNumber?: string;

  @ApiProperty({ example: 'REG-NGO-789012', required: false })
  institutionRegistrationNumber?: string;

  @ApiProperty({ example: 'Ahmad Hassan', required: false })
  institutionRepresentativeName?: string;

  @ApiProperty({ example: 'Executive Director', required: false })
  institutionRepresentativePosition?: string;

  @ApiProperty({ example: 'ID-555-2020', required: false })
  institutionRepresentativeRegistrationNumber?: string;

  @ApiProperty({
    example: 'https://www.palestinehope.org',
    description: 'Website URL or empty string to clear',
    required: false,
  })
  institutionWebsite?: string;

  @ApiProperty({ example: '@ahmadhassan', required: false })
  institutionRepresentativeSocialMedia?: string;
}

//  Response
export class CampaignCreatorResponseDto {
  @ApiProperty({ example: '44ed15dc-60b4-4342-b3d6-093818563446' })
  id!: string;

  @ApiProperty({ example: '1970c273-360d-4080-86fb-29eb8bf66c9b' })
  userId!: string;

  @ApiProperty({ enum: ['INDIVIDUAL', 'INSTITUTION'], example: 'INSTITUTION' })
  type!: 'INDIVIDUAL' | 'INSTITUTION';

  @ApiProperty({ example: 'Palestine Hope Foundation' })
  institutionName!: string;

  @ApiProperty({ example: 'Palestine' })
  institutionCountry!: string;

  @ApiProperty({ example: 'Non-Profit Organization' })
  institutionType!: string;

  @ApiProperty({ example: '2020-01-15T00:00:00.000Z' })
  institutionDateOfEstablishment!: Date;

  @ApiProperty({ example: 'Registered NGO' })
  institutionLegalStatus!: string;

  @ApiProperty({ example: 'TAX-PS-123456' })
  institutionTaxIdentificationNumber!: string;

  @ApiProperty({ example: 'REG-NGO-789012' })
  institutionRegistrationNumber!: string;

  @ApiProperty({ example: 'Ahmad Hassan' })
  institutionRepresentativeName!: string;

  @ApiProperty({ example: 'Executive Director' })
  institutionRepresentativePosition!: string;

  @ApiProperty({ example: 'ID-555-2020' })
  institutionRepresentativeRegistrationNumber!: string;

  @ApiProperty({ example: 'https://www.palestinehope.org' })
  institutionWebsite!: string;

  @ApiProperty({ example: '@ahmadhassan' })
  institutionRepresentativeSocialMedia!: string;

  @ApiProperty({ example: '2026-02-11T15:45:16.307Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-02-15T13:08:34.343Z' })
  updatedAt!: Date;
}
