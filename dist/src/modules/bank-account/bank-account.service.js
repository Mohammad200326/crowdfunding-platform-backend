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
exports.BankAccountService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const file_service_1 = require("../file/file.service");
const client_1 = require("@prisma/client");
let BankAccountService = class BankAccountService {
    prismaService;
    fileService;
    constructor(prismaService, fileService) {
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
    async create(createDto, userId, proofDocument) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, isDeleted: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'CAMPAIGN_CREATOR') {
            throw new common_1.ForbiddenException('Only campaign creators can add bank accounts');
        }
        const bankAccount = await this.prismaService.bankAccount.create({
            data: {
                userId,
                bankName: createDto.bankName,
                iban: createDto.iban,
                notes: createDto.notes || '',
            },
            include: {
                assets: true,
            },
        });
        if (proofDocument) {
            const assetData = this.fileService.createFileAssetData(proofDocument, userId, client_1.AssetKind.BANK_PROOF_DOCUMENT);
            await this.prismaService.asset.create({
                data: {
                    ...assetData,
                    bankAccountId: bankAccount.id,
                },
            });
        }
        return this.prismaService.bankAccount.findUniqueOrThrow({
            where: { id: bankAccount.id },
            include: { assets: true },
        });
    }
    async findOne(id, userId) {
        const bankAccount = await this.prismaService.bankAccount.findUnique({
            where: { id },
            include: {
                assets: true,
                withdrawals: true,
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!bankAccount) {
            return null;
        }
        if (bankAccount.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to access this bank account');
        }
        return bankAccount;
    }
    async findByUserId(userId) {
        return this.prismaService.bankAccount.findMany({
            where: { userId },
            include: {
                assets: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async update(id, updateDto, userId, proofDocument) {
        const existingAccount = await this.prismaService.bankAccount.findUnique({
            where: { id },
            select: { id: true, userId: true },
        });
        if (!existingAccount) {
            throw new common_1.NotFoundException('Bank account not found');
        }
        if (existingAccount.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this bank account');
        }
        await this.prismaService.bankAccount.update({
            where: { id },
            data: {
                ...(updateDto.bankName && { bankName: updateDto.bankName }),
                ...(updateDto.iban && { iban: updateDto.iban }),
                ...(updateDto.notes !== undefined && { notes: updateDto.notes }),
                ...(updateDto.isVerified !== undefined && {
                    isVerified: updateDto.isVerified,
                }),
            },
        });
        if (proofDocument) {
            const oldDocuments = await this.prismaService.asset.findMany({
                where: {
                    bankAccountId: id,
                    kind: client_1.AssetKind.BANK_PROOF_DOCUMENT,
                },
            });
            if (oldDocuments.length > 0) {
                const deletePromises = oldDocuments.map((doc) => this.fileService.deleteFileFromImageKit(doc.fileId));
                await Promise.all(deletePromises);
                await this.prismaService.asset.deleteMany({
                    where: {
                        bankAccountId: id,
                        kind: client_1.AssetKind.BANK_PROOF_DOCUMENT,
                    },
                });
            }
            const assetData = this.fileService.createFileAssetData(proofDocument, userId, client_1.AssetKind.BANK_PROOF_DOCUMENT);
            await this.prismaService.asset.create({
                data: {
                    ...assetData,
                    bankAccountId: id,
                },
            });
        }
        return this.prismaService.bankAccount.findUniqueOrThrow({
            where: { id },
            include: { assets: true },
        });
    }
    async remove(id, userId) {
        const existingAccount = await this.prismaService.bankAccount.findUnique({
            where: { id },
            include: {
                assets: true,
                withdrawals: true,
            },
        });
        if (!existingAccount) {
            throw new common_1.NotFoundException('Bank account not found');
        }
        if (existingAccount.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to delete this bank account');
        }
        if (existingAccount.withdrawals.length > 0) {
            throw new common_1.ForbiddenException('Cannot delete bank account with existing withdrawals. Please contact support.');
        }
        if (existingAccount.assets.length > 0) {
            const deletePromises = existingAccount.assets.map((asset) => this.fileService.deleteFileFromImageKit(asset.fileId));
            await Promise.all(deletePromises);
            await this.prismaService.asset.deleteMany({
                where: { bankAccountId: id },
            });
        }
        return this.prismaService.bankAccount.delete({
            where: { id },
        });
    }
    async removeAsset(bankAccountId, assetId, userId) {
        const existingAccount = await this.prismaService.bankAccount.findUnique({
            where: { id: bankAccountId },
            select: { id: true, userId: true },
        });
        if (!existingAccount) {
            throw new common_1.NotFoundException('Bank account not found');
        }
        if (existingAccount.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to modify this bank account');
        }
        const asset = await this.prismaService.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset || asset.bankAccountId !== bankAccountId) {
            throw new common_1.NotFoundException('Asset not found in this bank account');
        }
        await this.fileService.deleteFileFromImageKit(asset.fileId);
        await this.prismaService.asset.delete({
            where: { id: assetId },
        });
    }
};
exports.BankAccountService = BankAccountService;
exports.BankAccountService = BankAccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        file_service_1.FileService])
], BankAccountService);
//# sourceMappingURL=bank-account.service.js.map