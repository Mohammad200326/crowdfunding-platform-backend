import { CampaignService } from './campaign.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import type { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { CampaignCategory, CampaignStatus } from '@prisma/client';
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    }>;
    findAll(page: number, limit: number, status?: CampaignStatus, dateFrom?: string, dateTo?: string, user?: UserResponseDTO['userData']): Promise<(Omit<{
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    })[]>;
    findByCategory(category: CampaignCategory, page: number, limit: number, status?: CampaignStatus, user?: UserResponseDTO['userData']): Promise<(Omit<{
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    })[]>;
    findByCreator(creatorId: string, status?: CampaignStatus, user?: UserResponseDTO['userData']): Promise<(Omit<{
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    })[]>;
    findOne(id: string, user?: UserResponseDTO['userData']): Promise<Omit<{
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    }>;
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
            creatorIdentityId: string | null;
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
        likes: {
            createdAt: Date;
            userId: string;
            campaignId: string;
        }[];
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
    }, "donations" | "likes"> & {
        raisedStars: number;
        numberOfContributions: number;
        isLikedByMe: boolean;
    }>;
    toggleLike(id: string, user: UserResponseDTO['userData']): Promise<{
        liked: boolean;
    }>;
    updateStatus(id: string, body: {
        status: CampaignStatus;
    }): Promise<{
        id: string;
        status: CampaignStatus;
    }>;
    remove(id: string): Promise<{
        id: string;
        isDeleted: boolean;
    }>;
}
