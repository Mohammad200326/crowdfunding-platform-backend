import ImageKit from '@imagekit/nodejs';
import { StorageEngine } from 'multer';
import { AssetKind, Prisma } from '@prisma/client';
export declare class FileService {
    private imagekit;
    constructor(imagekit: ImageKit);
    imageKitMulterStorage(): StorageEngine;
    createFileAssetData(file: Express.Multer.File, userId: string, kind: AssetKind, donorIdentityId?: string): Prisma.AssetUncheckedCreateInput;
    deleteFileFromImageKit(fileId: string): import("@imagekit/nodejs").APIPromise<void>;
}
