import { DatabaseService } from '../database/database.service';
import { CreateCreatorIdentityDTO, CreateCreatorIdentityResponse, CreatorIdentityUpdateFiles, UpdateCreatorIdentityDTO, UpdateCreatorIdentityResponse } from './dto/creator-identity.dto';
import { Prisma } from '@prisma/client';
import { FileService } from '../file/file.service';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class CreatorIdentityService {
    private databaseService;
    private fileService;
    constructor(databaseService: DatabaseService, fileService: FileService);
    create(dto: CreateCreatorIdentityDTO, user: UserResponseDTO['userData'], files: {
        idFront: Express.Multer.File[];
        idBack: Express.Multer.File[];
        selfieWithId: Express.Multer.File[];
    }): Promise<CreateCreatorIdentityResponse>;
    getByCreatorId(creatorId: string): Promise<{
        creatorIdentity: {
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
            creatorId: string;
            fullNameOnId: string;
            idNumber: string | null;
            reviewedAt: Date | null;
        };
    }>;
    updateByCreatorId(creatorId: string, dto: UpdateCreatorIdentityDTO, files?: CreatorIdentityUpdateFiles): Promise<UpdateCreatorIdentityResponse>;
    remove(creatorId: string): Prisma.Prisma__CreatorIdentityClient<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
        fullNameOnId: string;
        idNumber: string | null;
        reviewedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
