import { DonorIdentityService } from './donor-identity.service';
import type { CreateDonorIdentityDTO, DonorIdentityUpdateFiles, UpdateDonorIdentityDTO, UpdateDonorIdentityResponse } from './dto/donor-identity.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class DonorIdentityController {
    private readonly donorIdentityService;
    constructor(donorIdentityService: DonorIdentityService);
    create(dto: CreateDonorIdentityDTO, user: UserResponseDTO['userData'], files: {
        idFront: Express.Multer.File[];
        idBack: Express.Multer.File[];
        selfieWithId: Express.Multer.File[];
    }): Promise<import("./dto/donor-identity.dto").CreateDonorIdentityResponse>;
    getByDonorId(donorId: string): Promise<{
        donorIdentity: {
            assets: {
                url: string;
                id: string;
                createdAt: Date;
                fileType: string;
                fileSizeInKB: number;
                kind: import("@prisma/client").$Enums.AssetKind;
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
        };
    }>;
    update(donorId: string, dto: UpdateDonorIdentityDTO, files: DonorIdentityUpdateFiles): Promise<UpdateDonorIdentityResponse>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__DonorIdentityClient<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullNameOnId: string;
        idNumber: string | null;
        donorId: string;
        reviewedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
