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
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or is deactivated');
        }
        const existingCreator = await this.db.campaignCreator.findUnique({
            where: { userId },
        });
        if (existingCreator) {
            throw new common_1.ConflictException('Creator profile already exists for this user');
        }
        if (assetIds && assetIds.length > 0) {
            const assets = await this.db.asset.findMany({
                where: { id: { in: assetIds }, ownerId: userId },
            });
            if (assets.length !== assetIds.length) {
                throw new common_1.BadRequestException('Invalid assets provided');
            }
        }
        const persistenceData = this.preparePersistenceData(dto, user);
        return this.db.$transaction(async (tx) => {
            const creator = await tx.campaignCreator.create({
                data: persistenceData,
                include: { user: true },
            });
            await tx.user.update({
                where: { id: userId },
                data: { role: client_1.UserRole.CAMPAIGN_CREATOR },
            });
            if (assetIds?.length) {
                await tx.asset.updateMany({
                    where: { id: { in: assetIds } },
                    data: { creatorId: creator.id },
                });
            }
            return creator;
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const whereClause = {
            user: { isDeleted: false },
        };
        const [creators, total] = await Promise.all([
            this.db.campaignCreator.findMany({
                skip,
                take: limit,
                where: whereClause,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            country: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.db.campaignCreator.count({ where: whereClause }),
        ]);
        return {
            data: creators,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id) {
        const creator = await this.db.campaignCreator.findUnique({
            where: { id },
            include: {
                user: true,
                assets: true,
            },
        });
        if (!creator || creator.user.isDeleted) {
            throw new common_1.NotFoundException('Creator not found');
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
        if (dto.institutionDateOfEstablishment !== undefined) {
            updateData.institutionDateOfEstablishment = new Date(dto.institutionDateOfEstablishment);
        }
        return this.db.campaignCreator.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        const creator = await this.findOne(id);
        const activeCampaigns = await this.db.campaign.count({
            where: {
                creatorId: creator.userId,
                isActive: true,
                isDeleted: false,
            },
        });
        if (activeCampaigns > 0) {
            throw new common_1.ConflictException('Cannot deactivate creator with active campaigns. Please close/finish campaigns first.');
        }
        await this.db.user.update({
            where: { id: creator.userId },
            data: { isDeleted: true },
        });
        return { message: 'Creator account deactivated successfully' };
    }
    preparePersistenceData(dto, user) {
        const FILLER = 'N/A';
        if (dto.type === 'INDIVIDUAL') {
            return {
                user: { connect: { id: dto.userId } },
                type: 'INDIVIDUAL',
                institutionName: `${user.firstName} ${user.lastName}`,
                institutionCountry: user.country || FILLER,
                institutionType: 'Individual',
                institutionDateOfEstablishment: new Date(),
                institutionLegalStatus: FILLER,
                institutionTaxIdentificationNumber: FILLER,
                institutionRegistrationNumber: FILLER,
                institutionRepresentativeName: `${user.firstName} ${user.lastName}`,
                institutionRepresentativePosition: 'Owner',
                institutionRepresentativeRegistrationNumber: FILLER,
                institutionWebsite: FILLER,
                institutionRepresentativeSocialMedia: FILLER,
            };
        }
        return {
            user: { connect: { id: dto.userId } },
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
            institutionWebsite: dto.institutionWebsite || FILLER,
            institutionRepresentativeSocialMedia: dto.institutionRepresentativeSocialMedia || FILLER,
        };
    }
};
exports.CampaignCreatorService = CampaignCreatorService;
exports.CampaignCreatorService = CampaignCreatorService = CampaignCreatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CampaignCreatorService);
//# sourceMappingURL=campaign-creator.service.js.map