import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';
import { CampaignCategory, CampaignStatus } from '@prisma/client';

export const createCampaignApiBody: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 2, maxLength: 100 },
      description: { type: 'string', minLength: 2, maxLength: 1000 },
      category: {
        type: 'string',
        enum: [
          'WATER',
          'HEALTH',
          'ENVIROMENT',
          'FOOD',
          'EDUCATION',
          'SHELTER',
          'ANIMALS',
        ],
      },
      goal: { type: 'number', minimum: 1 },
      startDate: { type: 'string', format: 'date-time' },
      endDate: { type: 'string', format: 'date-time' },
      motivationMessage: { type: 'string', minLength: 2, maxLength: 1000 },
      notes: { type: 'string', maxLength: 1000 },
      likes: { type: 'number', minimum: 0 },
      file: {
        type: 'string',
        format: 'binary',
        description: 'Campaign image or file (optional)',
      },
    },
    required: [
      'title',
      'description',
      'category',
      'goal',
      'startDate',
      'endDate',
      'motivationMessage',
      'notes',
      'likes',
    ],
  },
};

export const updateCampaignApiBody: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 2, maxLength: 100 },
      description: { type: 'string', minLength: 2, maxLength: 1000 },
      category: {
        type: 'string',
        enum: [
          'WATER',
          'HEALTH',
          'ENVIROMENT',
          'FOOD',
          'EDUCATION',
          'SHELTER',
          'ANIMALS',
        ],
      },
      goal: { type: 'number', minimum: 1 },
      startDate: { type: 'string', format: 'date-time' },
      endDate: { type: 'string', format: 'date-time' },
      motivationMessage: { type: 'string', minLength: 2, maxLength: 1000 },
      notes: { type: 'string', maxLength: 1000 },
      likes: { type: 'number', minimum: 0 },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'rejected'],
      },
      isVerified: { type: 'boolean' },
      verificationStatus: {
        type: 'string',
        enum: ['pending', 'confirmed', 'rejected'],
      },
      isActive: { type: 'boolean' },
      file: {
        type: 'string',
        format: 'binary',
        description: 'New campaign thumbnail (optional)',
      },
    },
    required: [],
  },
};

class CampaignAssetDto {
  @ApiProperty({ example: '123-uuid' })
  id: string;
  @ApiProperty({ example: 'https://img.url...' })
  url: string;
  @ApiProperty({ example: 'CAMPAIGN_THUMBNAIL' })
  kind: string;
}
// A small DTO to show Creator info
class CreatorSummaryDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Ahmad' })
  firstName!: string;

  @ApiProperty({ example: 'Ali' })
  lastName!: string;

  @ApiProperty({ example: 'Palestine', required: false })
  country!: string;
}
// The Main Campaign Response
export class CampaignResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Clean Water' })
  title!: string;

  @ApiProperty({ example: 'We need to build a well...' })
  description!: string;

  @ApiProperty({ enum: CampaignCategory, example: CampaignCategory.WATER })
  category!: CampaignCategory;

  @ApiProperty({ example: 5000, description: 'Target goal in currency unit' })
  goal!: number;

  @ApiProperty({ example: '2025-02-01T00:00:00.000Z' })
  startDate!: Date;

  @ApiProperty({ example: '2025-06-01T00:00:00.000Z' })
  endDate!: Date;

  @ApiProperty({ example: 'Every drop counts!' })
  motivationMessage!: string;

  @ApiProperty({ enum: CampaignStatus, example: CampaignStatus.pending })
  status!: CampaignStatus;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 100, description: 'Number of likes' })
  likes!: number;

  @ApiProperty({ type: CreatorSummaryDto })
  creator?: CreatorSummaryDto;

  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @ApiProperty()
  createdAt!: Date;

  // return assets (images)
  @ApiProperty({ type: [CampaignAssetDto] })
  assets?: CampaignAssetDto[];
}
