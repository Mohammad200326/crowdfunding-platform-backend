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
exports.CampaignUpdateService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const file_service_1 = require("../file/file.service");
const client_1 = require("@prisma/client");
let CampaignUpdateService = class CampaignUpdateService {
    prismaService;
    fileService;
    constructor(prismaService, fileService) {
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
    async create(createDto, userId, files) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id: createDto.campaignId },
            select: { id: true, creatorId: true, isDeleted: true },
        });
        if (!campaign || campaign.isDeleted) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.creatorId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to create updates for this campaign');
        }
        const campaignUpdate = await this.prismaService.campaignUpdate.create({
            data: {
                campaignId: createDto.campaignId,
                title: createDto.title,
                description: createDto.description,
            },
            include: {
                assets: true,
            },
        });
        if (files && files.length > 0) {
            const assetPromises = files.map((file) => {
                const assetData = this.fileService.createFileAssetData(file, userId, client_1.AssetKind.CAMPAIGN_UPDATE_MEDIA);
                return this.prismaService.asset.create({
                    data: {
                        ...assetData,
                        campaignUpdateId: campaignUpdate.id,
                    },
                });
            });
            await Promise.all(assetPromises);
        }
        return this.prismaService.campaignUpdate.findUniqueOrThrow({
            where: { id: campaignUpdate.id },
            include: { assets: true },
        });
    }
    async findOne(id) {
        const update = await this.prismaService.campaignUpdate.findUnique({
            where: { id },
            include: {
                assets: true,
            },
        });
        return update;
    }
    async findByCampaign(campaignId, status) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id: campaignId },
            select: { id: true, isDeleted: true },
        });
        if (!campaign || campaign.isDeleted) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return this.prismaService.campaignUpdate.findMany({
            where: {
                campaignId,
                ...(status && { status }),
            },
            include: {
                assets: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findAll(status) {
        return this.prismaService.campaignUpdate.findMany({
            where: {
                ...(status && { status }),
            },
            include: {
                assets: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async update(id, updateDto, userId, files) {
        const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
            where: { id },
            include: {
                campaign: {
                    select: { creatorId: true },
                },
            },
        });
        if (!existingUpdate) {
            throw new common_1.NotFoundException('Campaign update not found');
        }
        if (existingUpdate.campaign.creatorId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this campaign update');
        }
        await this.prismaService.campaignUpdate.update({
            where: { id },
            data: {
                ...(updateDto.title && { title: updateDto.title }),
                ...(updateDto.description && { description: updateDto.description }),
            },
        });
        if (files && files.length > 0) {
            const assetPromises = files.map((file) => {
                const assetData = this.fileService.createFileAssetData(file, userId, client_1.AssetKind.CAMPAIGN_UPDATE_MEDIA);
                return this.prismaService.asset.create({
                    data: {
                        ...assetData,
                        campaignUpdateId: id,
                    },
                });
            });
            await Promise.all(assetPromises);
        }
        return this.prismaService.campaignUpdate.findUniqueOrThrow({
            where: { id },
            include: { assets: true },
        });
    }
    async remove(id, userId) {
        const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
            where: { id },
            include: {
                campaign: {
                    select: { creatorId: true },
                },
                assets: true,
            },
        });
        if (!existingUpdate) {
            throw new common_1.NotFoundException('Campaign update not found');
        }
        if (existingUpdate.campaign.creatorId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to delete this campaign update');
        }
        if (existingUpdate.assets.length > 0) {
            const deletePromises = existingUpdate.assets.map((asset) => this.fileService.deleteFileFromImageKit(asset.fileId));
            await Promise.all(deletePromises);
            await this.prismaService.asset.deleteMany({
                where: { campaignUpdateId: id },
            });
        }
        return this.prismaService.campaignUpdate.delete({
            where: { id },
        });
    }
    async removeAsset(updateId, assetId, userId) {
        const existingUpdate = await this.prismaService.campaignUpdate.findUnique({
            where: { id: updateId },
            include: {
                campaign: {
                    select: { creatorId: true },
                },
            },
        });
        if (!existingUpdate) {
            throw new common_1.NotFoundException('Campaign update not found');
        }
        if (existingUpdate.campaign.creatorId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to modify this campaign update');
        }
        const asset = await this.prismaService.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset || asset.campaignUpdateId !== updateId) {
            throw new common_1.NotFoundException('Asset not found in this campaign update');
        }
        await this.fileService.deleteFileFromImageKit(asset.fileId);
        await this.prismaService.asset.delete({
            where: { id: assetId },
        });
    }
};
exports.CampaignUpdateService = CampaignUpdateService;
exports.CampaignUpdateService = CampaignUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        file_service_1.FileService])
], CampaignUpdateService);
//# sourceMappingURL=campaign-update.service.js.map