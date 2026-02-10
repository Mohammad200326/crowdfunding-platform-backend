import { DatabaseService } from '../database/database.service';
import { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
export declare class CampaignCreatorService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    create(dto: CreateCampaignCreatorDto): Promise<{
        message: string;
        creator: {
            user: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                role: import("@prisma/client").$Enums.UserRole;
                country: string | null;
                phoneNumber: string | null;
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
        };
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                role: import("@prisma/client").$Enums.UserRole;
                country: string | null;
                phoneNumber: string | null;
                isVerified: boolean;
                verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            };
            assets: {
                url: string;
                id: string;
                createdAt: Date;
                fileType: string;
                kind: import("@prisma/client").$Enums.AssetKind;
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
            phoneNumber: string | null;
            isDeleted: boolean;
            isVerified: boolean;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
        assets: {
            url: string;
            id: string;
            createdAt: Date;
            fileType: string;
            kind: import("@prisma/client").$Enums.AssetKind;
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
    findByUserId(userId: string): Promise<{
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
            phoneNumber: string | null;
            isDeleted: boolean;
        };
        assets: {
            url: string;
            id: string;
            fileType: string;
            kind: import("@prisma/client").$Enums.AssetKind;
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
    update(id: string, dto: UpdateCampaignCreatorDto): Promise<{
        message: string;
        creator: {
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
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        deletedId: string;
    }>;
    private preparePersistenceData;
}
