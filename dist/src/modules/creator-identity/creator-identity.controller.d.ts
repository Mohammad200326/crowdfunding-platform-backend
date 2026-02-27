import { CreatorIdentityService } from './creator-identity.service';
import type { CreateCreatorIdentityDTO, CreatorIdentityUpdateFiles, UpdateCreatorIdentityDTO, UpdateCreatorIdentityResponse } from './dto/creator-identity.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class CreatorIdentityController {
    private readonly creatorIdentityService;
    constructor(creatorIdentityService: CreatorIdentityService);
    create(dto: CreateCreatorIdentityDTO, user: UserResponseDTO['userData'], files: {
        idFront: Express.Multer.File[];
        idBack: Express.Multer.File[];
        selfieWithId: Express.Multer.File[];
    }): Promise<import("./dto/creator-identity.dto").CreateCreatorIdentityResponse>;
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
    update(creatorId: string, dto: UpdateCreatorIdentityDTO, files: CreatorIdentityUpdateFiles): Promise<UpdateCreatorIdentityResponse>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CreatorIdentityClient<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
        fullNameOnId: string;
        idNumber: string | null;
        reviewedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
