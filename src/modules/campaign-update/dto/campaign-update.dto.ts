import { z } from 'zod';
import { CampaignUpdate, Prisma } from '@prisma/client';

export const CreateCampaignUpdateSchema = z.object({
  campaignId: z.string().uuid('Campaign ID must be a valid UUID'),
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
});

export const UpdateCampaignUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title is too long')
    .optional(),
  description: z.string().min(1, 'Description is required').optional(),
});

// TypeScript types inferred from Zod schemas
export type CreateCampaignUpdateDto = z.infer<
  typeof CreateCampaignUpdateSchema
>;
export type UpdateCampaignUpdateDto = z.infer<
  typeof UpdateCampaignUpdateSchema
>;

// Response types using Prisma's type-safe approach
export type CampaignUpdateResponseDto = CampaignUpdate;

export type CampaignUpdateWithAssetsDto = Prisma.CampaignUpdateGetPayload<{
  include: {
    assets: true;
  };
}>;

export type CampaignUpdateWithCampaignDto = Prisma.CampaignUpdateGetPayload<{
  include: {
    assets: true;
    campaign: {
      select: {
        id: true;
        title: true;
        creatorId: true;
      };
    };
  };
}>;
