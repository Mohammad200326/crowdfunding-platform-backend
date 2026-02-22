import { CampaignService } from './campaign.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import type { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { CampaignCategory } from '@prisma/client';
export declare class CampaignController {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    create(createCampaignDto: CreateCampaignDto, user: UserResponseDTO['userData'], file?: Express.Multer.File): Promise<Omit<{
        donations: {
            stars: number;
        }[];
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
        _count: {
            likes: number;
        };
        creator: {
            id: string;
            firstName: string;
            lastName: string;
            country: string | null;
        };
    } & {
        id: string;
        notes: string | null;
        isDeleted: boolean;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        description: string;
        creatorId: string;
        isActive: boolean;
        title: string;
        longDescription: string | null;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
    }, "donations"> & {
        raisedStars: number;
    }>;
    findAll(page: number, limit: number): Promise<(Omit<{
        donations: {
            stars: number;
        }[];
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
        _count: {
            likes: number;
        };
        creator: {
            id: string;
            firstName: string;
            lastName: string;
            country: string | null;
        };
    } & {
        id: string;
        notes: string | null;
        isDeleted: boolean;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        description: string;
        creatorId: string;
        isActive: boolean;
        title: string;
        longDescription: string | null;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
    }, "donations"> & {
        raisedStars: number;
    })[]>;
    findByCategory(category: CampaignCategory, page: number, limit: number): Promise<(Omit<{
        donations: {
            stars: number;
        }[];
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
        _count: {
            likes: number;
        };
        creator: {
            id: string;
            firstName: string;
            lastName: string;
            country: string | null;
        };
    } & {
        id: string;
        notes: string | null;
        isDeleted: boolean;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        description: string;
        creatorId: string;
        isActive: boolean;
        title: string;
        longDescription: string | null;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
    }, "donations"> & {
        raisedStars: number;
    })[]>;
    findByCreator(creatorId: string): Promise<(Omit<{
        donations: {
            stars: number;
        }[];
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
        _count: {
            likes: number;
        };
        creator: {
            id: string;
            firstName: string;
            lastName: string;
            country: string | null;
        };
    } & {
        id: string;
        notes: string | null;
        isDeleted: boolean;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        description: string;
        creatorId: string;
        isActive: boolean;
        title: string;
        longDescription: string | null;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
    }, "donations"> & {
        raisedStars: number;
    })[]>;
    update(id: string, updatePayload: UpdateCampaignDto, user: UserResponseDTO['userData'], file?: Express.Multer.File): Promise<Omit<{
        donations: {
            stars: number;
        }[];
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
        _count: {
            likes: number;
        };
        creator: {
            id: string;
            firstName: string;
            lastName: string;
            country: string | null;
        };
    } & {
        id: string;
        notes: string | null;
        isDeleted: boolean;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        description: string;
        creatorId: string;
        isActive: boolean;
        title: string;
        longDescription: string | null;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
    }, "donations"> & {
        raisedStars: number;
    }>;
    toggleLike(id: string, user: UserResponseDTO['userData']): Promise<{
        liked: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        isDeleted: boolean;
    }>;
}
