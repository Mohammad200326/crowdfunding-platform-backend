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
var CampaignCreatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCreatorService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const client_1 = require("@prisma/client");
let CampaignCreatorService = CampaignCreatorService_1 = class CampaignCreatorService {
    db;
    logger = new common_1.Logger(CampaignCreatorService_1.name);
    constructor(db) {
        this.db = db;
    }
    async create(dto) {
        const { userId, assetIds } = dto;
        const user = await this.db.user.findUnique({
            where: { id: userId, isDeleted: false },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                country: true,
                role: true,
                isDeleted: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or has been deleted');
        }
        const existingCreator = await this.db.campaignCreator.findUnique({
            where: { userId },
        });
        if (existingCreator) {
            throw new common_1.ConflictException('Creator profile already exists for this user');
        }
        if (assetIds && assetIds.length > 0) {
            const assets = await this.db.asset.findMany({
                where: {
                    id: { in: assetIds },
                    ownerId: userId,
                },
            });
            if (assets.length !== assetIds.length) {
                throw new common_1.BadRequestException('Some assets not found or do not belong to this user');
            }
        }
        const persistenceData = this.preparePersistenceData(dto, user);
        return this.db.$transaction(async (tx) => {
            const creator = await tx.campaignCreator.create({
                data: persistenceData,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            country: true,
                            phoneNumber: true,
                        },
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: { role: client_1.UserRole.CAMPAIGN_CREATOR },
            });
            if (assetIds && assetIds.length > 0) {
                await tx.asset.updateMany({
                    where: { id: { in: assetIds } },
                    data: { creatorId: creator.id },
                });
            }
            this.logger.log(`Created ${dto.type} creator profile for user ${userId}`);
            return {
                message: 'Campaign creator profile created successfully',
                creator,
            };
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [creators, total] = await Promise.all([
            this.db.campaignCreator.findMany({
                skip,
                take: limit,
                where: {
                    user: {
                        isDeleted: false,
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            country: true,
                            phoneNumber: true,
                            isVerified: true,
                            verificationStatus: true,
                        },
                    },
                    assets: {
                        select: {
                            id: true,
                            url: true,
                            fileType: true,
                            kind: true,
                            createdAt: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.db.campaignCreator.count({
                where: {
                    user: {
                        isDeleted: false,
                    },
                },
            }),
        ]);
        return {
            data: creators,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const creator = await this.db.campaignCreator.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                        country: true,
                        phoneNumber: true,
                        dateOfBirth: true,
                        isDeleted: true,
                        isVerified: true,
                        verificationStatus: true,
                    },
                },
                assets: {
                    select: {
                        id: true,
                        url: true,
                        fileType: true,
                        kind: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!creator) {
            throw new common_1.NotFoundException(`Campaign creator profile with ID "${id}" not found`);
        }
        if (creator.user.isDeleted) {
            throw new common_1.NotFoundException(`Campaign creator profile with ID "${id}" has been deleted`);
        }
        return creator;
    }
    async findByUserId(userId) {
        const creator = await this.db.campaignCreator.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                        country: true,
                        phoneNumber: true,
                        isDeleted: true,
                    },
                },
                assets: {
                    select: {
                        id: true,
                        url: true,
                        fileType: true,
                        kind: true,
                    },
                },
            },
        });
        if (!creator) {
            throw new common_1.NotFoundException(`Campaign creator for user "${userId}" not found`);
        }
        if (creator.user.isDeleted) {
            throw new common_1.NotFoundException(`Campaign creator for user "${userId}" has been deleted`);
        }
        return creator;
    }
    async update(id, dto) {
        await this.findOne(id);
        const updateData = {};
        if (dto.institutionName !== undefined) {
            updateData.institutionName = dto.institutionName;
        }
        if (dto.institutionCountry !== undefined) {
            updateData.institutionCountry = dto.institutionCountry;
        }
        if (dto.institutionType !== undefined) {
            updateData.institutionType = dto.institutionType;
        }
        if (dto.institutionDateOfEstablishment !== undefined) {
            updateData.institutionDateOfEstablishment = new Date(dto.institutionDateOfEstablishment);
        }
        if (dto.institutionLegalStatus !== undefined) {
            updateData.institutionLegalStatus = dto.institutionLegalStatus;
        }
        if (dto.institutionTaxIdentificationNumber !== undefined) {
            updateData.institutionTaxIdentificationNumber =
                dto.institutionTaxIdentificationNumber;
        }
        if (dto.institutionRegistrationNumber !== undefined) {
            updateData.institutionRegistrationNumber =
                dto.institutionRegistrationNumber;
        }
        if (dto.institutionRepresentativeName !== undefined) {
            updateData.institutionRepresentativeName =
                dto.institutionRepresentativeName;
        }
        if (dto.institutionRepresentativePosition !== undefined) {
            updateData.institutionRepresentativePosition =
                dto.institutionRepresentativePosition;
        }
        if (dto.institutionRepresentativeRegistrationNumber !== undefined) {
            updateData.institutionRepresentativeRegistrationNumber =
                dto.institutionRepresentativeRegistrationNumber;
        }
        if (dto.institutionWebsite !== undefined) {
            updateData.institutionWebsite = dto.institutionWebsite;
        }
        if (dto.institutionRepresentativeSocialMedia !== undefined) {
            updateData.institutionRepresentativeSocialMedia =
                dto.institutionRepresentativeSocialMedia;
        }
        const updatedCreator = await this.db.campaignCreator.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                    },
                },
                assets: true,
            },
        });
        this.logger.log(`Updated creator profile ${id}`);
        return {
            message: 'Campaign creator profile updated successfully',
            creator: updatedCreator,
        };
    }
    async remove(id) {
        const creator = await this.findOne(id);
        const activeCampaignsCount = await this.db.campaign.count({
            where: {
                creatorId: creator.userId,
                isActive: true,
                isDeleted: false,
            },
        });
        if (activeCampaignsCount > 0) {
            throw new common_1.ConflictException(`Cannot delete creator profile with ${activeCampaignsCount} active campaign(s). ` +
                'Please deactivate all campaigns first.');
        }
        return this.db.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: creator.userId },
                data: {
                    isDeleted: true,
                },
            });
            this.logger.log(`Deleted creator profile ${id} (user ${creator.userId})`);
            return {
                message: 'Campaign creator profile deleted successfully',
                deletedId: id,
            };
        });
    }
    preparePersistenceData(dto, user) {
        const filler = 'N/A';
        const isIndividual = dto.type === 'INDIVIDUAL';
        if (isIndividual) {
            return {
                user: {
                    connect: { id: dto.userId },
                },
                type: 'INDIVIDUAL',
                institutionName: `${user.firstName} ${user.lastName}`,
                institutionCountry: user.country || filler,
                institutionType: 'Individual',
                institutionDateOfEstablishment: new Date(),
                institutionLegalStatus: filler,
                institutionTaxIdentificationNumber: filler,
                institutionRegistrationNumber: filler,
                institutionRepresentativeName: `${user.firstName} ${user.lastName}`,
                institutionRepresentativePosition: 'Owner',
                institutionRepresentativeRegistrationNumber: filler,
                institutionWebsite: filler,
                institutionRepresentativeSocialMedia: filler,
            };
        }
        if (dto.type !== 'INSTITUTION') {
            throw new common_1.BadRequestException('Invalid creator type');
        }
        return {
            user: {
                connect: { id: dto.userId },
            },
            type: 'INSTITUTION',
            institutionName: dto.institutionName,
            institutionCountry: dto.institutionCountry,
            institutionType: dto.institutionType,
            institutionDateOfEstablishment: dto.institutionDateOfEstablishment,
            institutionLegalStatus: dto.institutionLegalStatus,
            institutionTaxIdentificationNumber: dto.institutionTaxIdentificationNumber,
            institutionRegistrationNumber: dto.institutionRegistrationNumber,
            institutionRepresentativeName: dto.institutionRepresentativeName,
            institutionRepresentativePosition: dto.institutionRepresentativePosition,
            institutionRepresentativeRegistrationNumber: dto.institutionRepresentativeRegistrationNumber,
            institutionWebsite: dto.institutionWebsite || filler,
            institutionRepresentativeSocialMedia: dto.institutionRepresentativeSocialMedia || filler,
        };
    }
};
exports.CampaignCreatorService = CampaignCreatorService;
exports.CampaignCreatorService = CampaignCreatorService = CampaignCreatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CampaignCreatorService);
//# sourceMappingURL=campaign-creator.service.js.map