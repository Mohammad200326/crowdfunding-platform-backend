import { CreateDonorDto } from './dto/create-donor.dto';
import { DonorResponseDTO, UpdateDonorDTO } from './dto/donor.dto';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { DonorIdentityUpdateFiles } from '../donor-identity/dto/donor-identity.dto';
import { DonorIdentityService } from '../donor-identity/donor-identity.service';
export declare class DonorService {
    private readonly prismaService;
    private readonly donorIdentityService;
    constructor(prismaService: DatabaseService, donorIdentityService: DonorIdentityService);
    create(createDonorDto: CreateDonorDto): string;
    createDonorProfile(userId: string, donorProfileData: any, tx?: any): Promise<any>;
    findAll(query: PaginationQueryType): Promise<PaginatedResult<Omit<User, 'password'>>>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DonorClient<({
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
            phoneNumber: string | null;
            notes: string | null;
            isDeleted: boolean;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
        identity: ({
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
            id: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            fullNameOnId: string;
            idNumber: string | null;
            donorId: string;
            reviewedAt: Date | null;
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        areasOfInterest: string;
        preferredCampaignTypes: string;
        geographicScope: import("@prisma/client").$Enums.GeographicScope;
        targetAudience: string;
        preferredCampaignSize: number;
        preferredCampaignVisibility: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(userId: string, updateDonorDto: UpdateDonorDTO, files?: DonorIdentityUpdateFiles): Promise<DonorResponseDTO>;
    remove(id: number): string;
}
