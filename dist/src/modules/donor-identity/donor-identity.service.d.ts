import { DatabaseService } from '../database/database.service';
import { CreateDonorIdentityDTO, CreateDonorIdentityResponse, DonorIdentityUpdateFiles, UpdateDonorIdentityDTO, UpdateDonorIdentityResponse } from './dto/donor-identity.dto';
import { Prisma } from '@prisma/client';
import { FileService } from '../file/file.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class DonorIdentityService {
    private databaseService;
    private fileService;
    constructor(databaseService: DatabaseService, fileService: FileService);
    create(dto: CreateDonorIdentityDTO, user: UserResponseDTO['userData'], files: {
        idFront: Express.Multer.File[];
        idBack: Express.Multer.File[];
        selfieWithId: Express.Multer.File[];
    }): Promise<CreateDonorIdentityResponse>;
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
    updateByDonorId(donorId: string, dto: UpdateDonorIdentityDTO, files?: DonorIdentityUpdateFiles): Promise<UpdateDonorIdentityResponse>;
    remove(donorId: string): Prisma.Prisma__DonorIdentityClient<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullNameOnId: string;
        idNumber: string | null;
        donorId: string;
        reviewedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
