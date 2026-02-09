import { CampaignCreatorService } from './campaign-creator.service';
import type { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
export declare class CampaignCreatorController {
    private readonly service;
    constructor(service: CampaignCreatorService);
    create(dto: CreateCampaignCreatorDto): Promise<{
        message: string;
        creator: {
            id: string;
            userId: string;
            type: import("@prisma/client").$Enums.CreatorType;
            institutionName: string;
            institutionCountry: string;
            institutionType: string;
            createdAt: Date;
        };
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
        };
    } & {
        type: import("@prisma/client").$Enums.CreatorType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        institutionName: string;
        institutionType: string;
        institutionCountry: string;
        institutionDateOfEstablishment: Date;
        institutionLegalStatus: string;
        institutionTaxIdentificationNumber: string;
        institutionRegistrationNumber: string;
        institutionRepresentativeName: string;
        institutionRepresentativePosition: string;
        institutionRepresentativeRegistrationNumber: string;
        institutionWebsite: string;
        institutionRepresentativeSocialMedia: string;
        stripeAccountId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        assets: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fileId: string;
            storageProviderName: import("@prisma/client").$Enums.StorageProviderName;
            fileType: string;
            fileSizeInKB: number;
            kind: import("@prisma/client").$Enums.AssetKind;
            ownerId: string;
            userId: string | null;
            campaignId: string | null;
            campaignUpdateId: string | null;
            creatorId: string | null;
            bankAccountId: string | null;
            donorIdentityId: string | null;
        }[];
    } & {
        type: import("@prisma/client").$Enums.CreatorType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        institutionName: string;
        institutionType: string;
        institutionCountry: string;
        institutionDateOfEstablishment: Date;
        institutionLegalStatus: string;
        institutionTaxIdentificationNumber: string;
        institutionRegistrationNumber: string;
        institutionRepresentativeName: string;
        institutionRepresentativePosition: string;
        institutionRepresentativeRegistrationNumber: string;
        institutionWebsite: string;
        institutionRepresentativeSocialMedia: string;
        stripeAccountId: string | null;
    }>;
    update(id: string, updateCampaignCreatorDto: UpdateCampaignCreatorDto): string;
    remove(id: string): string;
}
