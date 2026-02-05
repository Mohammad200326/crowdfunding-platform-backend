import { z } from 'zod';
import { CampaignUpdate, Prisma } from '@prisma/client';
export declare const CreateCampaignUpdateSchema: z.ZodObject<{
    campaignId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const UpdateCampaignUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCampaignUpdateDto = z.infer<typeof CreateCampaignUpdateSchema>;
export type UpdateCampaignUpdateDto = z.infer<typeof UpdateCampaignUpdateSchema>;
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
