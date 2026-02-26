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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const database_service_1 = require("../database/database.service");
const file_service_1 = require("../file/file.service");
let CampaignService = class CampaignService {
    filesService;
    prismaService;
    constructor(filesService, prismaService) {
        this.filesService = filesService;
        this.prismaService = prismaService;
    }
    campaignIncludes = {
        creator: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                country: true,
            },
        },
        assets: true,
        _count: { select: { likes: true } },
    };
    donationsInclude = {
        donations: {
            where: { paymentStatus: client_1.PaymentStatus.completed },
            select: { stars: true },
        },
    };
    enrichCampaign(campaign, userId) {
        const { donations, likes, ...rest } = campaign;
        return {
            ...rest,
            raisedStars: donations.reduce((sum, d) => sum + d.stars, 0),
            numberOfContributions: donations.length,
            isLikedByMe: userId
                ? (likes ?? []).some((l) => l.userId === userId)
                : false,
        };
    }
    getInclude(userId) {
        return {
            ...this.campaignIncludes,
            ...this.donationsInclude,
            likes: userId
                ? { where: { userId }, select: { userId: true } }
                : false,
        };
    }
    async create(createCampaignDto, user, file) {
        const dataPayload = {
            ...createCampaignDto,
            creatorId: user.id,
        };
        if (file) {
            dataPayload.assets = {
                create: this.filesService.createFileAssetData(file, user.id, 'CAMPAIGN_THUMBNAIL'),
            };
        }
        const campaign = await this.prismaService.campaign.create({
            data: dataPayload,
            include: this.getInclude(user.id),
        });
        return this.enrichCampaign(campaign, user.id);
    }
    async updateStatus(id, status) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id },
        });
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign with ID ${id} not found`);
        }
        if (campaign.isDeleted) {
            throw new common_1.NotFoundException(`Campaign is deleted and cannot be updated`);
        }
        return this.prismaService.campaign.update({
            where: { id },
            data: { status },
            select: { id: true, status: true },
        });
    }
    async findAll(page, limit, userId, status) {
        const skip = (page - 1) * limit;
        const campaigns = await this.prismaService.campaign.findMany({
            where: {
                isDeleted: false,
                isActive: true,
                ...(status && { status }),
            },
            take: limit,
            skip: skip,
            include: this.getInclude(userId),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return campaigns.map((c) => this.enrichCampaign(c, userId));
    }
    async findByCategory(category, page, limit, userId, status) {
        const skip = (page - 1) * limit;
        const campaigns = await this.prismaService.campaign.findMany({
            where: {
                category: category,
                isDeleted: false,
                isActive: true,
                ...(status && { status }),
            },
            take: limit,
            skip: skip,
            include: this.getInclude(userId),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return campaigns.map((c) => this.enrichCampaign(c, userId));
    }
    async findByCreator(creatorId, userId, status) {
        const campaigns = await this.prismaService.campaign.findMany({
            where: {
                creatorId: creatorId,
                isDeleted: false,
                ...(status && { status }),
            },
            include: this.getInclude(userId),
            orderBy: { createdAt: 'desc' },
        });
        return campaigns.map((c) => this.enrichCampaign(c, userId));
    }
    async findOne(id, userId) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id },
            include: this.getInclude(userId),
        });
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign with ID ${id} not found`);
        }
        return this.enrichCampaign(campaign, userId);
    }
    async toggleLike(campaignId, userId) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id: campaignId },
            select: { id: true, isDeleted: true },
        });
        if (!campaign || campaign.isDeleted) {
            throw new common_1.NotFoundException(`Campaign with ID ${campaignId} not found`);
        }
        const prisma = this.prismaService;
        const existingLike = await prisma.campaignLike.findUnique({
            where: { userId_campaignId: { userId, campaignId } },
        });
        if (existingLike) {
            await prisma.campaignLike.delete({
                where: { userId_campaignId: { userId, campaignId } },
            });
            return { liked: false };
        }
        await prisma.campaignLike.create({
            data: { userId, campaignId },
        });
        return { liked: true };
    }
    async softDelete(id) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id },
        });
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign with ID ${id} not found`);
        }
        if (campaign.isDeleted) {
            throw new common_1.NotFoundException(`Campaign is already deleted`);
        }
        return this.prismaService.campaign.update({
            where: { id },
            data: {
                isDeleted: true,
                isActive: false,
            },
            select: { id: true, isDeleted: true },
        });
    }
    async update(id, updateCampaignDto, user, file) {
        const campaign = await this.prismaService.campaign.findUnique({
            where: { id },
        });
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign with ID ${id} not found`);
        }
        if (campaign.isDeleted) {
            throw new common_1.NotFoundException(`Campaign is deleted and cannot be updated`);
        }
        if (campaign.creatorId !== user.id) {
            throw new common_1.ForbiddenException(`You are not authorized to update this campaign`);
        }
        const dataPayload = {
            ...updateCampaignDto,
        };
        if (file) {
            const oldThumbnails = await this.prismaService.asset.findMany({
                where: {
                    campaignId: id,
                    kind: 'CAMPAIGN_THUMBNAIL',
                },
            });
            if (oldThumbnails.length > 0) {
                await Promise.all(oldThumbnails.map((asset) => this.filesService.deleteFileFromImageKit(asset.fileId)));
                await this.prismaService.asset.deleteMany({
                    where: {
                        campaignId: id,
                        kind: 'CAMPAIGN_THUMBNAIL',
                    },
                });
            }
            dataPayload.assets = {
                create: this.filesService.createFileAssetData(file, user.id, 'CAMPAIGN_THUMBNAIL'),
            };
        }
        return this.enrichCampaign(await this.prismaService.campaign.update({
            where: { id },
            data: dataPayload,
            include: this.getInclude(user.id),
        }), user.id);
    }
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        database_service_1.DatabaseService])
], CampaignService);
//# sourceMappingURL=campaign.service.js.map