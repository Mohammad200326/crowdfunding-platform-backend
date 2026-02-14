import { ApiBodyOptions } from '@nestjs/swagger';
import { CampaignCategory, CampaignStatus } from '@prisma/client';
export declare const createCampaignApiBody: ApiBodyOptions;
export declare const updateCampaignApiBody: ApiBodyOptions;
declare class CampaignAssetDto {
    id: string;
    url: string;
    kind: string;
}
declare class CreatorSummaryDto {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
}
export declare class CampaignResponseDto {
    id: string;
    title: string;
    description: string;
    category: CampaignCategory;
    goal: number;
    startDate: Date;
    endDate: Date;
    motivationMessage: string;
    status: CampaignStatus;
    isActive: boolean;
    likes: number;
    creator?: CreatorSummaryDto;
    isDeleted: boolean;
    createdAt: Date;
    assets?: CampaignAssetDto[];
}
export {};
