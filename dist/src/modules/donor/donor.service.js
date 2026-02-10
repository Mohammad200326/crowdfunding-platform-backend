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
exports.DonorService = void 0;
const common_1 = require("@nestjs/common");
const object_util_1 = require("../../utils/object.util");
const database_service_1 = require("../database/database.service");
const donor_identity_service_1 = require("../donor-identity/donor-identity.service");
let DonorService = class DonorService {
    prismaService;
    donorIdentityService;
    constructor(prismaService, donorIdentityService) {
        this.prismaService = prismaService;
        this.donorIdentityService = donorIdentityService;
    }
    create(createDonorDto) {
        return 'This action adds a new donor';
    }
    async createDonorProfile(userId, donorProfileData, tx) {
        const prisma = tx || this.prismaService;
        const hasCustomData = donorProfileData && Object.keys(donorProfileData).length > 0;
        const defaultProfile = {
            areasOfInterest: '',
            preferredCampaignTypes: '',
            geographicScope: 'local',
            targetAudience: '',
            preferredCampaignSize: 0,
            preferredCampaignVisibility: '',
        };
        const profile = await prisma.donor.create({
            data: {
                ...defaultProfile,
                ...donorProfileData,
                userId,
            },
        });
        return {
            ...profile,
            hasCustomData,
        };
    }
    findAll(query) {
        return this.prismaService.$transaction(async (prisma) => {
            const pagination = this.prismaService.handleQueryPagination(query);
            const donors = await prisma.user.findMany({
                where: { role: 'DONOR' },
                ...(0, object_util_1.removeFields)(pagination, ['page']),
                omit: {
                    password: true,
                },
                include: { donorProfile: true },
            });
            const count = await prisma.user.count({ where: { role: 'DONOR' } });
            return {
                data: donors,
                ...this.prismaService.formatPaginationResponse({
                    page: pagination.page,
                    count,
                    limit: pagination.take,
                }),
            };
        });
    }
    findOne(id) {
        return this.prismaService.donor.findUnique({
            where: { id },
            include: {
                user: { omit: { password: true } },
                identity: { include: { assets: true } },
            },
        });
    }
    async update(userId, updateDonorDto, files) {
        const donorRecord = await this.prismaService.donor.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!donorRecord) {
            throw new common_1.NotFoundException('Donor not found for this user');
        }
        const donorId = donorRecord.id;
        const { fullNameOnId, idNumber, donorProfile, ...userFields } = updateDonorDto;
        const identityDto = {
            ...(fullNameOnId !== undefined ? { fullNameOnId } : {}),
            ...(idNumber !== undefined ? { idNumber } : {}),
        };
        const hasIdentityUpdate = Object.keys(identityDto).length > 0 ||
            (files && Object.keys(files).length > 0);
        if (hasIdentityUpdate) {
            await this.donorIdentityService.updateByDonorId(donorId, identityDto, files);
        }
        const updatedDonor = await this.prismaService.$transaction(async (tx) => {
            const userUpdateFields = {
                ...(userFields.firstName !== undefined
                    ? { firstName: userFields.firstName }
                    : {}),
                ...(userFields.lastName !== undefined
                    ? { lastName: userFields.lastName }
                    : {}),
                ...(userFields.email !== undefined ? { email: userFields.email } : {}),
                ...(userFields.dateOfBirth !== undefined
                    ? { dateOfBirth: userFields.dateOfBirth }
                    : {}),
                ...(userFields.phoneNumber !== undefined
                    ? { phoneNumber: userFields.phoneNumber }
                    : {}),
                ...(userFields.country !== undefined
                    ? { country: userFields.country }
                    : {}),
                ...(userFields.notes !== undefined ? { notes: userFields.notes } : {}),
            };
            if (Object.keys(userUpdateFields).length > 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: userUpdateFields,
                });
            }
            const donorProfileFields = {
                ...(donorProfile?.areasOfInterest !== undefined
                    ? { areasOfInterest: donorProfile.areasOfInterest }
                    : {}),
                ...(donorProfile?.preferredCampaignTypes !== undefined
                    ? { preferredCampaignTypes: donorProfile.preferredCampaignTypes }
                    : {}),
                ...(donorProfile?.geographicScope !== undefined
                    ? { geographicScope: donorProfile.geographicScope }
                    : {}),
                ...(donorProfile?.targetAudience !== undefined
                    ? { targetAudience: donorProfile.targetAudience }
                    : {}),
                ...(donorProfile?.preferredCampaignSize !== undefined
                    ? { preferredCampaignSize: donorProfile.preferredCampaignSize }
                    : {}),
                ...(donorProfile?.preferredCampaignVisibility !== undefined
                    ? {
                        preferredCampaignVisibility: donorProfile.preferredCampaignVisibility,
                    }
                    : {}),
            };
            if (Object.keys(donorProfileFields).length > 0) {
                await tx.donor.update({
                    where: { id: donorId },
                    data: donorProfileFields,
                });
            }
            return tx.donor.findUnique({
                where: { id: donorId },
                include: {
                    identity: { include: { assets: true } },
                    user: {
                        omit: { password: true },
                    },
                },
            });
        });
        return updatedDonor;
    }
    remove(id) {
        return `This action removes a #${id} donor`;
    }
};
exports.DonorService = DonorService;
exports.DonorService = DonorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        donor_identity_service_1.DonorIdentityService])
], DonorService);
//# sourceMappingURL=donor.service.js.map