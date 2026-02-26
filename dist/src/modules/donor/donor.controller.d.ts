import { DonorService } from './donor.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import type { UpdateDonorDTO } from './dto/donor.dto';
import type { PaginationQueryType } from 'src/types/util.types';
import type { DonorIdentityUpdateFiles } from '../donor-identity/dto/donor-identity.dto';
import { DonorResponseDTO } from './dto/donor.dto';
export declare class DonorController {
    private readonly donorService;
    constructor(donorService: DonorService);
    create(createDonorDto: CreateDonorDto): string;
    findAll(query: PaginationQueryType): Promise<import("src/types/util.types").PaginatedResult<Omit<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
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
    }, "password">>>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DonorClient<({
        user: {
            id: string;
            email: string;
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
    update(id: string, updateDonorDto: UpdateDonorDTO, files: DonorIdentityUpdateFiles): Promise<DonorResponseDTO>;
    remove(id: string): string;
}
