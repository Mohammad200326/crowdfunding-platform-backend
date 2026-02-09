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
  | 'creatorId'
  | 'likes'
  | 'notes'
> &
  Partial<Pick<Campaign, 'notes'>>;

export type UpdateCampaignDto = Partial<
  CreateCampaignDto & {
    status: Campaign['status'];
    isVerified: Campaign['isVerified'];
    verificationStatus: Campaign['verificationStatus'];
    isActive: Campaign['isActive'];
  }
>;

export type CampaignResponseDTO = Prisma.CampaignGetPayload<{
  include: {
    assets: true;
    creator: { omit: { password: true } };
    updates: true;
    donations: true;
  };
}>;
