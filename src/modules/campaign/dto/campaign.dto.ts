import { Campaign, Prisma } from '@prisma/client';

export type CreateCampaignDto = Omit<
  Campaign,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'status'
  | 'isVerified'
  | 'verificationStatus'
  | 'isActive'
  | 'isDeleted'
>;

export type UpdateCampaignDto = Partial<
  CreateCampaignDto & {
    status: Campaign['status'];
    isVerified: Campaign['isVerified'];
    verificationStatus: Campaign['verificationStatus'];
    isActive: Campaign['isActive'];
    isDeleted: Campaign['isDeleted'];
  }
>;

export type CampaignResponseDTO = Prisma.CampaignGetPayload<{
  include: { assets: true; creator: true; updates: true; donations: true };
}>;
