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
exports.DonorIdentityService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const client_1 = require("@prisma/client");
const file_service_1 = require("../file/file.service");
let DonorIdentityService = class DonorIdentityService {
    databaseService;
    fileService;
    constructor(databaseService, fileService) {
        this.databaseService = databaseService;
        this.fileService = fileService;
    }
    async create(dto, user, files) {
        const donor = await this.databaseService.donor.findUnique({
            where: { userId: user.id },
            select: { id: true },
        });
        if (!donor)
            throw new common_1.NotFoundException('Donor not found');
        const exists = await this.databaseService.donorIdentity.findUnique({
            where: { donorId: donor.id },
            select: { id: true },
        });
        if (exists)
            throw new common_1.ConflictException('Donor identity already exists');
        const front = files?.idFront?.[0];
        const back = files?.idBack?.[0];
        const selfie = files?.selfieWithId?.[0];
        if (!front || !back || !selfie) {
            throw new common_1.ConflictException('All identity files are required');
        }
        const result = await this.databaseService.$transaction(async (tx) => {
            const donorIdentity = await tx.donorIdentity.create({
                data: {
                    donorId: donor.id,
                    fullNameOnId: dto.fullNameOnId,
                    idNumber: dto.idNumber ?? null,
                },
                select: { id: true, donorId: true, createdAt: true },
            });
            const assets = [];
            assets.push(this.fileService.createFileAssetData(front, user.id, client_1.AssetKind.DONOR_ID_FRONT, donorIdentity.id));
            assets.push(this.fileService.createFileAssetData(back, user.id, client_1.AssetKind.DONOR_ID_BACK, donorIdentity.id));
            assets.push(this.fileService.createFileAssetData(selfie, user.id, client_1.AssetKind.DONOR_ID_SELFIE_WITH_ID, donorIdentity.id));
            await tx.asset.createMany({ data: assets });
            return donorIdentity;
        });
        return {
            message: 'Donor identity created successfully',
            donorIdentity: result,
        };
    }
    async getByDonorId(donorId) {
        const donorIdentity = await this.databaseService.donorIdentity.findUnique({
            where: { donorId },
            include: {
                assets: {
                    where: {
                        kind: {
                            in: [
                                client_1.AssetKind.DONOR_ID_FRONT,
                                client_1.AssetKind.DONOR_ID_BACK,
                                client_1.AssetKind.DONOR_ID_SELFIE_WITH_ID,
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
        if (!donorIdentity)
            throw new common_1.NotFoundException('Donor identity not found');
        return { donorIdentity };
    }
    async updateByDonorId(donorId, dto, files) {
        const existing = await this.databaseService.donorIdentity.findUnique({
            where: { donorId },
            select: {
                id: true,
                donorId: true,
                donor: { select: { userId: true } },
            },
        });
        if (!existing) {
            const donor = await this.databaseService.donor.findUnique({
                where: { id: donorId },
                select: { userId: true },
            });
            if (!donor)
                throw new common_1.NotFoundException('Donor not found');
            const front = files?.idFront?.[0];
            const back = files?.idBack?.[0];
            const selfie = files?.selfieWithId?.[0];
            if (!front || !back || !selfie) {
                throw new common_1.NotFoundException('idFront, idBack, and selfieWithId files are all required to create a new identity');
            }
            const result = await this.databaseService.$transaction(async (tx) => {
                const donorIdentity = await tx.donorIdentity.create({
                    data: {
                        donorId,
                        fullNameOnId: dto.fullNameOnId ?? '',
                        idNumber: dto.idNumber ?? null,
                    },
                    select: {
                        id: true,
                        donorId: true,
                        fullNameOnId: true,
                        idNumber: true,
                        updatedAt: true,
                    },
                });
                const ownerId = donor.userId;
                const assetsToCreate = [];
                if (front) {
                    assetsToCreate.push(this.fileService.createFileAssetData(front, ownerId, client_1.AssetKind.DONOR_ID_FRONT, donorIdentity.id));
                }
                if (back) {
                    assetsToCreate.push(this.fileService.createFileAssetData(back, ownerId, client_1.AssetKind.DONOR_ID_BACK, donorIdentity.id));
                }
                if (selfie) {
                    assetsToCreate.push(this.fileService.createFileAssetData(selfie, ownerId, client_1.AssetKind.DONOR_ID_SELFIE_WITH_ID, donorIdentity.id));
                }
                if (assetsToCreate.length) {
                    await tx.asset.createMany({ data: assetsToCreate });
                }
                return donorIdentity;
            });
            return {
                message: 'Donor identity created successfully',
                donorIdentity: result,
            };
        }
        const front = files?.idFront?.[0];
        const back = files?.idBack?.[0];
        const selfie = files?.selfieWithId?.[0];
        const kindsToReplace = [];
        if (front)
            kindsToReplace.push(client_1.AssetKind.DONOR_ID_FRONT);
        if (back)
            kindsToReplace.push(client_1.AssetKind.DONOR_ID_BACK);
        if (selfie)
            kindsToReplace.push(client_1.AssetKind.DONOR_ID_SELFIE_WITH_ID);
        const result = await this.databaseService.$transaction(async (tx) => {
            const updatedIdentity = await tx.donorIdentity.update({
                where: { id: existing.id },
                data: {
                    ...(dto.fullNameOnId !== undefined
                        ? { fullNameOnId: dto.fullNameOnId }
                        : {}),
                    ...(dto.idNumber !== undefined ? { idNumber: dto.idNumber } : {}),
                },
                select: {
                    id: true,
                    donorId: true,
                    fullNameOnId: true,
                    idNumber: true,
                    updatedAt: true,
                },
            });
            if (kindsToReplace.length) {
                await tx.asset.deleteMany({
                    where: {
                        donorIdentityId: existing.id,
                        kind: { in: kindsToReplace },
                    },
                });
                const ownerId = existing.donor.userId;
                const assetsToCreate = [];
                if (front) {
                    assetsToCreate.push(this.fileService.createFileAssetData(front, ownerId, client_1.AssetKind.DONOR_ID_FRONT, existing.id));
                }
                if (back) {
                    assetsToCreate.push(this.fileService.createFileAssetData(back, ownerId, client_1.AssetKind.DONOR_ID_BACK, existing.id));
                }
                if (selfie) {
                    assetsToCreate.push(this.fileService.createFileAssetData(selfie, ownerId, client_1.AssetKind.DONOR_ID_SELFIE_WITH_ID, existing.id));
                }
                if (assetsToCreate.length) {
                    await tx.asset.createMany({ data: assetsToCreate });
                }
            }
            return updatedIdentity;
        });
        return {
            message: 'Donor identity updated successfully',
            donorIdentity: result,
        };
    }
    remove(donorId) {
        return this.databaseService.donorIdentity.delete({
            where: {
                id: donorId,
            },
        });
    }
};
exports.DonorIdentityService = DonorIdentityService;
exports.DonorIdentityService = DonorIdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        file_service_1.FileService])
], DonorIdentityService);
//# sourceMappingURL=donor-identity.service.js.map