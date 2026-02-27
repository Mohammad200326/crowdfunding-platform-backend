import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { CampaignCategory } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class CampaignService {
    private readonly filesService;
    private readonly prismaService;
    constructor(filesService: FileService, prismaService: DatabaseService);
    private readonly campaignIncludes;
    private readonly donationsInclude;
    private enrichCampaign;
    private getInclude;
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
    findAll(page: number, limit: number, userId?: string): Promise<(Omit<{
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
    findByCategory(category: CampaignCategory, page: number, limit: number, userId?: string): Promise<(Omit<{
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
    findByCreator(creatorId: string, userId?: string): Promise<(Omit<{
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
    findOne(id: string, userId?: string): Promise<Omit<{
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
    toggleLike(campaignId: string, userId: string): Promise<{
        liked: boolean;
    }>;
    softDelete(id: string): Promise<{
        id: string;
        isDeleted: boolean;
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto, user: UserResponseDTO['userData'], file?: Express.Multer.File): Promise<Omit<{
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
}
