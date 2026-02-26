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
const FILLER = 'N/A';
let CampaignCreatorService = CampaignCreatorService_1 = class CampaignCreatorService {
    db;
    logger = new common_1.Logger(CampaignCreatorService_1.name);
    constructor(db) {
        this.db = db;
    }
    async createForUser(input, tx) {
        if (tx)
            return this._createForUser(tx, input);
        return this.db.$transaction((t) => this._createForUser(t, input));
    }
    async _createForUser(tx, input) {
        const { userId } = input;
        const user = await tx.user.findUnique({
            where: { id: userId, isDeleted: false },
            select: { id: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or is deactivated');
        }
        const existing = await tx.campaignCreator.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.ConflictException('Creator profile already exists');
        }
        if (input.assetIds?.length) {
            const assets = await tx.asset.findMany({
                where: { id: { in: input.assetIds }, ownerId: userId },
                select: { id: true },
            });
            if (assets.length !== input.assetIds.length) {
                throw new common_1.BadRequestException('Invalid assets provided');
            }
        }
        const docKindMap = {
            registrationCertificateId: client_1.AssetKind.INSTITUTION_REGISTRATION_CERTIFICATE,
            commercialLicenseId: client_1.AssetKind.INSTITUTION_COMMERCIAL_LICENSE,
            representativeIdPhotoId: client_1.AssetKind.INSTITUTION_REPRESENTATIVE_ID_PHOTO,
            commissionerImageId: client_1.AssetKind.INSTITUTION_COMMISSIONER_IMAGE,
            authorizationLetterId: client_1.AssetKind.INSTITUTION_AUTHORIZATION_LETTER,
        };
        const docEntries = input.type === 'INSTITUTION' && input.institutionDocuments
            ? Object.entries(input.institutionDocuments).filter(([, v]) => !!v)
            : [];
        const docIds = docEntries.map(([, id]) => id);
        if (docIds.length) {
            const assets = await tx.asset.findMany({
                where: { id: { in: docIds }, ownerId: userId },
                select: { id: true, kind: true },
            });
            if (assets.length !== docIds.length) {
                throw new common_1.BadRequestException('Invalid institution documents provided');
            }
            const kindById = new Map(assets.map((a) => [a.id, a.kind]));
            for (const [key, id] of docEntries) {
                const expected = docKindMap[key];
                if (kindById.get(id) !== expected) {
                    throw new common_1.BadRequestException(`${String(key)} must be of kind ${expected}`);
                }
            }
        }
        const creator = await tx.campaignCreator.create({
            data: {
                userId,
                type: input.type,
                institutionName: input.institutionName ?? null,
                institutionType: input.institutionType ?? null,
                institutionCountry: input.institutionCountry ?? null,
                institutionDateOfEstablishment: input.institutionDateOfEstablishment ?? null,
                institutionLegalStatus: input.institutionLegalStatus ?? null,
                institutionTaxIdentificationNumber: input.institutionTaxIdentificationNumber ?? null,
                institutionRegistrationNumber: input.institutionRegistrationNumber ?? null,
                institutionRepresentativeName: input.institutionRepresentativeName ?? null,
                institutionRepresentativePosition: input.institutionRepresentativePosition ?? null,
                institutionRepresentativeRegistrationNumber: input.institutionRepresentativeRegistrationNumber ?? null,
                institutionWebsite: input.institutionWebsite ?? null,
                institutionRepresentativeSocialMedia: input.institutionRepresentativeSocialMedia ?? null,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: { role: client_1.UserRole.CAMPAIGN_CREATOR },
        });
        const allIds = [...(input.assetIds ?? []), ...docIds];
        if (allIds.length) {
            await tx.asset.updateMany({
                where: { id: { in: allIds } },
                data: { creatorId: creator.id },
            });
        }
        this.logger.log(`Created ${input.type} creator for user ${userId}`);
        return creator;
    }
    async createWithTx(tx, dto) {
        const { userId, assetIds } = dto;
        const user = await tx.user.findUnique({
            where: { id: userId, isDeleted: false },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or is deactivated');
        }
        const existingCreator = await tx.campaignCreator.findUnique({
            where: { userId },
        });
        if (existingCreator) {
            throw new common_1.ConflictException('Creator profile already exists for this user');
        }
        if (assetIds?.length) {
            const assets = await tx.asset.findMany({
                where: { id: { in: assetIds }, ownerId: userId },
            });
            if (assets.length !== assetIds.length) {
                throw new common_1.BadRequestException('Invalid assets provided');
            }
        }
        const persistenceData = this.preparePersistenceData(dto, user);
        const creator = await tx.campaignCreator.create({
            data: persistenceData,
            include: { assets: true },
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
        this.logger.log(`Created ${dto.type} creator for user ${userId}`);
        return creator;
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
                            role: true,
                        },
                    },
                    assets: true,
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
            include: { user: true, assets: true },
        });
        if (!creator || creator.user.isDeleted) {
            throw new common_1.NotFoundException('Creator not found');
        }
        return creator;
    }
    async findByUserId(userId) {
        const creator = await this.db.campaignCreator.findUnique({
            where: { userId },
            include: { user: true, assets: true },
        });
        if (!creator || creator.user.isDeleted) {
            throw new common_1.NotFoundException('Creator not found');
        }
        return creator;
    }
    async update(id, dto) {
        const creator = await this.findOne(id);
        const userUpdateData = {};
        const creatorUpdateData = {};
        if (dto.firstName !== undefined)
            userUpdateData.firstName = dto.firstName;
        if (dto.lastName !== undefined)
            userUpdateData.lastName = dto.lastName;
        if (dto.phoneNumber !== undefined)
            userUpdateData.phoneNumber = dto.phoneNumber;
        if (dto.country !== undefined)
            userUpdateData.country = dto.country;
        if (dto.notes !== undefined)
            userUpdateData.notes = dto.notes;
        if (dto.institutionName !== undefined)
            creatorUpdateData.institutionName = dto.institutionName;
        if (dto.institutionCountry !== undefined)
            creatorUpdateData.institutionCountry = dto.institutionCountry;
        if (dto.institutionType !== undefined)
            creatorUpdateData.institutionType = dto.institutionType;
        if (dto.institutionLegalStatus !== undefined)
            creatorUpdateData.institutionLegalStatus = dto.institutionLegalStatus;
        if (dto.institutionTaxIdentificationNumber !== undefined)
            creatorUpdateData.institutionTaxIdentificationNumber =
                dto.institutionTaxIdentificationNumber;
        if (dto.institutionRegistrationNumber !== undefined)
            creatorUpdateData.institutionRegistrationNumber =
                dto.institutionRegistrationNumber;
        if (dto.institutionRepresentativeName !== undefined)
            creatorUpdateData.institutionRepresentativeName =
                dto.institutionRepresentativeName;
        if (dto.institutionRepresentativePosition !== undefined)
            creatorUpdateData.institutionRepresentativePosition =
                dto.institutionRepresentativePosition;
        if (dto.institutionRepresentativeRegistrationNumber !== undefined)
            creatorUpdateData.institutionRepresentativeRegistrationNumber =
                dto.institutionRepresentativeRegistrationNumber;
        if (dto.institutionWebsite !== undefined)
            creatorUpdateData.institutionWebsite = dto.institutionWebsite;
        if (dto.institutionRepresentativeSocialMedia !== undefined)
            creatorUpdateData.institutionRepresentativeSocialMedia =
                dto.institutionRepresentativeSocialMedia;
        if (dto.institutionDateOfEstablishment !== undefined)
            creatorUpdateData.institutionDateOfEstablishment = new Date(dto.institutionDateOfEstablishment);
        return this.db.$transaction(async (tx) => {
            if (Object.keys(userUpdateData).length > 0) {
                await tx.user.update({
                    where: { id: creator.userId },
                    data: userUpdateData,
                });
            }
            if (Object.keys(creatorUpdateData).length > 0) {
                await tx.campaignCreator.update({
                    where: { id },
                    data: creatorUpdateData,
                });
            }
            return tx.campaignCreator.findUnique({
                where: { id },
                include: { user: true, assets: true },
            });
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
            throw new common_1.ConflictException('Cannot deactivate creator with active campaigns. Please close them first.');
        }
        await this.db.user.update({
            where: { id: creator.userId },
            data: { isDeleted: true },
        });
        return { message: 'Creator account deactivated successfully' };
    }
    preparePersistenceData(dto, user) {
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
            institutionName: dto.institutionName || FILLER,
            institutionCountry: dto.institutionCountry || FILLER,
            institutionType: dto.institutionType || FILLER,
            institutionDateOfEstablishment: dto.institutionDateOfEstablishment || new Date(),
            institutionLegalStatus: dto.institutionLegalStatus || FILLER,
            institutionTaxIdentificationNumber: dto.institutionTaxIdentificationNumber || FILLER,
            institutionRegistrationNumber: dto.institutionRegistrationNumber || FILLER,
            institutionRepresentativeName: dto.institutionRepresentativeName || FILLER,
            institutionRepresentativePosition: dto.institutionRepresentativePosition || FILLER,
            institutionRepresentativeRegistrationNumber: dto.institutionRepresentativeRegistrationNumber || FILLER,
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