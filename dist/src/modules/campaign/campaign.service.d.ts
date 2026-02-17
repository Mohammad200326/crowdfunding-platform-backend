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
    create(createCampaignDto: CreateCampaignDto, user: UserResponseDTO['userData'], file?: Express.Multer.File): Promise<{
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    }>;
    findAll(page: number, limit: number): Promise<({
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    })[]>;
    findByCategory(category: CampaignCategory, page: number, limit: number): Promise<({
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    })[]>;
    findByCreator(creatorId: string): Promise<({
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    })[]>;
    findOne(id: string): Promise<{
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    }>;
    softDelete(id: string): Promise<{
        id: string;
        isDeleted: boolean;
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto, user: Express.Request['user'], file?: Express.Multer.File): Promise<{
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
        title: string;
        status: import("@prisma/client").$Enums.CampaignStatus;
        isActive: boolean;
        category: import("@prisma/client").$Enums.CampaignCategory;
        goal: number;
        startDate: Date;
        endDate: Date;
        motivationMessage: string;
    }>;
}
