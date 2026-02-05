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
exports.CampaignCreatorService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const client_1 = require("@prisma/client");
let CampaignCreatorService = class CampaignCreatorService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(dto) {
        const user = await this.databaseService.user.findUnique({
            where: { id: dto.userId },
        });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const existing = await this.databaseService.campaignCreator.findUnique({
            where: { userId: dto.userId },
        });
        if (existing)
            throw new common_1.ConflictException('Creator profile already exists for this user');
        const isIndividual = dto.type === client_1.CreatorType.INDIVIDUAL;
        const filler = 'N/A';
        const creator = await this.databaseService.campaignCreator.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                institutionName: dto.institutionName,
                institutionCountry: dto.institutionCountry,
                institutionType: isIndividual
                    ? 'Individual'
                    : dto.institutionType || filler,
                institutionDateOfEstablishment: dto.institutionDateOfEstablishment
                    ? new Date(dto.institutionDateOfEstablishment)
                    : new Date(),
                institutionLegalStatus: isIndividual
                    ? filler
                    : dto.institutionLegalStatus || filler,
                institutionTaxIdentificationNumber: isIndividual
                    ? filler
                    : dto.institutionTaxIdentificationNumber || filler,
                institutionRegistrationNumber: isIndividual
                    ? filler
                    : dto.institutionRegistrationNumber || filler,
                institutionRepresentativeName: isIndividual
                    ? `${user.firstName} ${user.lastName}`
                    : dto.institutionRepresentativeName || filler,
                institutionRepresentativePosition: isIndividual
                    ? 'Owner'
                    : dto.institutionRepresentativePosition || filler,
                institutionRepresentativeRegistrationNumber: isIndividual
                    ? filler
                    : dto.institutionRepresentativeRegistrationNumber || filler,
                institutionWebsite: isIndividual
                    ? filler
                    : dto.institutionWebsite || filler,
                institutionRepresentativeSocialMedia: isIndividual
                    ? filler
                    : dto.institutionRepresentativeSocialMedia || filler,
            },
        });
        return {
            message: 'Campaign creator profile created successfully',
            creator: {
                id: creator.id,
                userId: creator.userId,
                type: creator.type,
                institutionName: creator.institutionName,
                institutionCountry: creator.institutionCountry,
                institutionType: creator.institutionType,
                createdAt: creator.createdAt,
            },
        };
    }
    async findAll() {
        return this.databaseService.campaignCreator.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                        country: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const creator = await this.databaseService.campaignCreator.findUnique({
            where: { id },
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
        if (!creator) {
            throw new common_1.BadRequestException('Campaign creator not found');
        }
        return creator;
    }
    update(id, updateCampaignCreatorDto) {
        return `This action updates a #${id} campaignCreator`;
    }
    remove(id) {
        return `This action removes a #${id} campaignCreator`;
    }
};
exports.CampaignCreatorService = CampaignCreatorService;
exports.CampaignCreatorService = CampaignCreatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CampaignCreatorService);
//# sourceMappingURL=campaign-creator.service.js.map