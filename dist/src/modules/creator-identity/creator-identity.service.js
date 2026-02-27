"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorIdentityService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const client_1 = require("@prisma/client");
const file_service_1 = require("../file/file.service");
let CreatorIdentityService = class CreatorIdentityService {
    databaseService;
    fileService;
    constructor(databaseService, fileService) {
        this.databaseService = databaseService;
        this.fileService = fileService;
    }
    async create(dto, user, files) {
        const creator = await this.databaseService.campaignCreator.findUnique({
            where: { userId: user.id },
            select: { id: true, type: true },
        });
        if (!creator)
            throw new common_1.NotFoundException('Campaign creator not found');
        if (creator.type !== 'INDIVIDUAL') {
            throw new common_1.ConflictException('Identity verification is only for individual campaign creators');
        }
        const exists = await this.databaseService.creatorIdentity.findUnique({
            where: { creatorId: creator.id },
            select: { id: true },
        });
        if (exists)
            throw new common_1.ConflictException('Creator identity already exists');
        const front = files?.idFront?.[0];
        const back = files?.idBack?.[0];
        const selfie = files?.selfieWithId?.[0];
        if (!front || !back || !selfie) {
            throw new common_1.ConflictException('All identity files are required');
        }
        const result = await this.databaseService.$transaction(async (tx) => {
            const creatorIdentity = await tx.creatorIdentity.create({
                data: {
                    creatorId: creator.id,
                    fullNameOnId: dto.fullNameOnId,
                    idNumber: dto.idNumber ?? null,
                },
                select: { id: true, creatorId: true, createdAt: true },
            });
            const assets = [];
            assets.push(this.fileService.createFileAssetData(front, user.id, client_1.AssetKind.CREATOR_ID_FRONT, undefined, creatorIdentity.id));
            assets.push(this.fileService.createFileAssetData(back, user.id, client_1.AssetKind.CREATOR_ID_BACK, undefined, creatorIdentity.id));
            assets.push(this.fileService.createFileAssetData(selfie, user.id, client_1.AssetKind.CREATOR_ID_SELFIE_WITH_ID, undefined, creatorIdentity.id));
            await tx.asset.createMany({ data: assets });
            return creatorIdentity;
        });
        return {
            message: 'Creator identity created successfully',
            creatorIdentity: result,
        };
    }
    async getByCreatorId(creatorId) {
        const creatorIdentity = await this.databaseService.creatorIdentity.findUnique({
            where: { creatorId },
            include: {
                assets: {
                    where: {
                        kind: {
                            in: [
                                client_1.AssetKind.CREATOR_ID_FRONT,
                                client_1.AssetKind.CREATOR_ID_BACK,
                                client_1.AssetKind.CREATOR_ID_SELFIE_WITH_ID,
                            ],
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        kind: true,
                        url: true,
                        fileType: true,
                        fileSizeInKB: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!creatorIdentity)
            throw new common_1.NotFoundException('Creator identity not found');
        return { creatorIdentity };
    }
    async updateByCreatorId(creatorId, dto, files) {
        const existing = await this.databaseService.creatorIdentity.findUnique({
            where: { creatorId },
            select: {
                id: true,
                creatorId: true,
                creator: { select: { userId: true } },
            },
        });
        if (!existing) {
            const creator = await this.databaseService.campaignCreator.findUnique({
                where: { id: creatorId },
                select: { userId: true },
            });
            if (!creator)
                throw new common_1.NotFoundException('Campaign creator not found');
            const front = files?.idFront?.[0];
            const back = files?.idBack?.[0];
            const selfie = files?.selfieWithId?.[0];
            if (!front || !back || !selfie) {
                throw new common_1.NotFoundException('idFront, idBack, and selfieWithId files are all required to create a new identity');
            }
            const result = await this.databaseService.$transaction(async (tx) => {
                const creatorIdentity = await tx.creatorIdentity.create({
                    data: {
                        creatorId,
                        fullNameOnId: dto.fullNameOnId ?? '',
                        idNumber: dto.idNumber ?? null,
                    },
                    select: {
                        id: true,
                        creatorId: true,
                        fullNameOnId: true,
                        idNumber: true,
                        updatedAt: true,
                    },
                });
                const ownerId = creator.userId;
                const assetsToCreate = [];
                if (front) {
                    assetsToCreate.push(this.fileService.createFileAssetData(front, ownerId, client_1.AssetKind.CREATOR_ID_FRONT, undefined, creatorIdentity.id));
                }
                if (back) {
                    assetsToCreate.push(this.fileService.createFileAssetData(back, ownerId, client_1.AssetKind.CREATOR_ID_BACK, undefined, creatorIdentity.id));
                }
                if (selfie) {
                    assetsToCreate.push(this.fileService.createFileAssetData(selfie, ownerId, client_1.AssetKind.CREATOR_ID_SELFIE_WITH_ID, undefined, creatorIdentity.id));
                }
                if (assetsToCreate.length) {
                    await tx.asset.createMany({ data: assetsToCreate });
                }
                return creatorIdentity;
            });
            return {
                message: 'Creator identity created successfully',
                creatorIdentity: result,
            };
        }
        const front = files?.idFront?.[0];
        const back = files?.idBack?.[0];
        const selfie = files?.selfieWithId?.[0];
        const kindsToReplace = [];
        if (front)
            kindsToReplace.push(client_1.AssetKind.CREATOR_ID_FRONT);
        if (back)
            kindsToReplace.push(client_1.AssetKind.CREATOR_ID_BACK);
        if (selfie)
            kindsToReplace.push(client_1.AssetKind.CREATOR_ID_SELFIE_WITH_ID);
        const result = await this.databaseService.$transaction(async (tx) => {
            const updatedIdentity = await tx.creatorIdentity.update({
                where: { id: existing.id },
                data: {
                    ...(dto.fullNameOnId !== undefined
                        ? { fullNameOnId: dto.fullNameOnId }
                        : {}),
                    ...(dto.idNumber !== undefined ? { idNumber: dto.idNumber } : {}),
                },
                select: {
                    id: true,
                    creatorId: true,
                    fullNameOnId: true,
                    idNumber: true,
                    updatedAt: true,
                },
            });
            if (kindsToReplace.length) {
                await tx.asset.deleteMany({
                    where: {
                        creatorIdentityId: existing.id,
                        kind: { in: kindsToReplace },
                    },
                });
                const ownerId = existing.creator.userId;
                const assetsToCreate = [];
                if (front) {
                    assetsToCreate.push(this.fileService.createFileAssetData(front, ownerId, client_1.AssetKind.CREATOR_ID_FRONT, undefined, existing.id));
                }
                if (back) {
                    assetsToCreate.push(this.fileService.createFileAssetData(back, ownerId, client_1.AssetKind.CREATOR_ID_BACK, undefined, existing.id));
                }
                if (selfie) {
                    assetsToCreate.push(this.fileService.createFileAssetData(selfie, ownerId, client_1.AssetKind.CREATOR_ID_SELFIE_WITH_ID, undefined, existing.id));
                }
                if (assetsToCreate.length) {
                    await tx.asset.createMany({ data: assetsToCreate });
                }
            }
            return updatedIdentity;
        });
        return {
            message: 'Creator identity updated successfully',
            creatorIdentity: result,
        };
    }
    remove(creatorId) {
        return this.databaseService.creatorIdentity.delete({
            where: {
                id: creatorId,
            },
        });
    }
};
exports.CreatorIdentityService = CreatorIdentityService;
exports.CreatorIdentityService = CreatorIdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        file_service_1.FileService])
], CreatorIdentityService);
//# sourceMappingURL=creator-identity.service.js.map