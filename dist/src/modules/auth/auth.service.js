"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = __importStar(require("argon2"));
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
const donor_service_1 = require("../donor/donor.service");
const otp_service_1 = require("./otp.service");
const email_service_1 = require("./email.service");
const campaign_creator_service_1 = require("../campaign-creator/campaign-creator.service");
const file_service_1 = require("../file/file.service");
let AuthService = class AuthService {
    userService;
    donorService;
    databaseService;
    jwtService;
    otpService;
    emailService;
    campaignCreatorService;
    fileService;
    constructor(userService, donorService, databaseService, jwtService, otpService, emailService, campaignCreatorService, fileService) {
        this.userService = userService;
        this.donorService = donorService;
        this.databaseService = databaseService;
        this.jwtService = jwtService;
        this.otpService = otpService;
        this.emailService = emailService;
        this.campaignCreatorService = campaignCreatorService;
        this.fileService = fileService;
    }
    async login(dto) {
        const user = await this.databaseService.user.findUnique({
            where: { email: dto.email },
        });
        if (!user ||
            user.role === 'ADMIN' ||
            !(await this.verifyPassword(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                country: user.country,
            },
            token,
        };
    }
    async adminLogin(dto) {
        const user = await this.databaseService.user.findUnique({
            where: { email: dto.email },
        });
        if (!user ||
            user.role !== 'ADMIN' ||
            !(await this.verifyPassword(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                country: user.country,
            },
            token,
        };
    }
    async registerDonor(registerDonorDto) {
        const existingUser = await this.userService.findByEmail(registerDonorDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const { password, donorProfile, ...userData } = registerDonorDto;
        const result = await this.databaseService.$transaction(async (tx) => {
            const user = await this.userService.createUserForRegistration({ ...userData, password }, client_1.UserRole.DONOR, tx);
            const profile = await this.donorService.createDonorProfile(user.id, donorProfile, tx);
            return {
                ...user,
                donorProfile: profile,
            };
        });
        const token = this.generateJwtToken(result.id, client_1.UserRole.DONOR);
        const userWithoutPassword = this.userService.mapUserWithoutPassword(result);
        let donorProfileResponse = null;
        if (result.donorProfile) {
            const { hasCustomData, ...profileData } = result.donorProfile;
            donorProfileResponse = hasCustomData
                ? profileData
                : { id: profileData.id, userId: profileData.userId };
        }
        return {
            user: {
                ...userWithoutPassword,
                donorProfile: donorProfileResponse,
            },
            token,
        };
    }
    async registerCampaignCreatorForm(dto, files) {
        const email = dto.email.trim().toLowerCase();
        const existing = await this.databaseService.user.findUnique({
            where: { email },
            select: { id: true },
        });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        const hashedPassword = await this.hashPassword(dto.password);
        const notes = dto.notes ?? null;
        const result = await this.databaseService.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email,
                    password: hashedPassword,
                    phoneNumber: dto.phoneNumber ?? null,
                    dateOfBirth: dto.dateOfBirth ?? null,
                    country: dto.country ?? null,
                    notes,
                    role: client_1.UserRole.CAMPAIGN_CREATOR,
                    isVerified: false,
                    verificationStatus: 'pending',
                },
            });
            const avatar = files?.avatar?.[0];
            if (avatar) {
                const avatarAsset = this.fileService.createFileAssetData(avatar, user.id, client_1.AssetKind.USER_AVATAR);
                await tx.asset.create({
                    data: {
                        ...avatarAsset,
                        userId: user.id,
                    },
                });
            }
            const prefs = Array.from(new Set(dto.preferences ?? []));
            if (prefs.length) {
                await tx.userPreference.createMany({
                    data: prefs.map((p) => ({
                        userId: user.id,
                        preference: p,
                    })),
                    skipDuplicates: true,
                });
            }
            let creator = null;
            if (dto.type === 'INDIVIDUAL') {
                creator = await this.campaignCreatorService.createForUser({
                    userId: user.id,
                    type: 'INDIVIDUAL',
                }, tx);
            }
            else if (dto.type === 'INSTITUTION') {
                creator = await this.campaignCreatorService.createForUser({
                    userId: user.id,
                    type: 'INSTITUTION',
                    institutionName: dto.institutionName,
                    institutionType: dto.institutionType,
                    institutionCountry: dto.institutionCountry,
                    institutionDateOfEstablishment: dto.institutionDateOfEstablishment,
                    institutionLegalStatus: dto.institutionLegalStatus,
                    institutionTaxIdentificationNumber: dto.institutionTaxIdentificationNumber,
                    institutionRegistrationNumber: dto.institutionRegistrationNumber,
                    institutionRepresentativeName: dto.institutionRepresentativeName,
                    institutionRepresentativePosition: dto.institutionRepresentativePosition,
                    institutionRepresentativeRegistrationNumber: dto.institutionRepresentativeRegistrationNumber,
                    institutionWebsite: dto.institutionWebsite,
                    institutionRepresentativeSocialMedia: dto.institutionRepresentativeSocialMedia,
                }, tx);
                const assets = [];
                const regCert = files?.registrationCertificate?.[0];
                const commLic = files?.commercialLicense?.[0];
                const repId = files?.representativeIdPhoto?.[0];
                const commissioner = files?.commissionerImage?.[0];
                const authLetter = files?.authorizationLetter?.[0];
                if (regCert) {
                    assets.push(this.fileService.createFileAssetData(regCert, user.id, client_1.AssetKind.INSTITUTION_REGISTRATION_CERTIFICATE));
                }
                if (commLic) {
                    assets.push(this.fileService.createFileAssetData(commLic, user.id, client_1.AssetKind.INSTITUTION_COMMERCIAL_LICENSE));
                }
                if (repId) {
                    assets.push(this.fileService.createFileAssetData(repId, user.id, client_1.AssetKind.INSTITUTION_REPRESENTATIVE_ID_PHOTO));
                }
                if (commissioner) {
                    assets.push(this.fileService.createFileAssetData(commissioner, user.id, client_1.AssetKind.INSTITUTION_COMMISSIONER_IMAGE));
                }
                if (authLetter) {
                    assets.push(this.fileService.createFileAssetData(authLetter, user.id, client_1.AssetKind.INSTITUTION_AUTHORIZATION_LETTER));
                }
                if (assets.length) {
                    assets.forEach((a) => (a.creatorId = creator.id));
                    await tx.asset.createMany({ data: assets });
                }
            }
            return { user, creator };
        });
        const token = this.generateJwtToken(result.user.id, result.user.role);
        const { password, ...userData } = result.user;
        const userWithPrefs = await this.databaseService.user.findUnique({
            where: { id: result.user.id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                country: true,
                phoneNumber: true,
                notes: true,
                dateOfBirth: true,
                isVerified: true,
                verificationStatus: true,
                createdAt: true,
                updatedAt: true,
                preferences: { select: { preference: true } },
            },
        });
        if (!userWithPrefs) {
            throw new common_1.InternalServerErrorException('User not found');
        }
        return {
            token,
            userData: {
                ...userWithPrefs,
                type: dto.type,
                creatorProfile: result.creator,
                preferences: userWithPrefs.preferences.map((x) => x.preference),
            },
        };
    }
    hashPassword(password) {
        return argon.hash(password);
    }
    verifyPassword(password, hashedPassword) {
        return argon.verify(hashedPassword, password);
    }
    generateJwtToken(userId, role) {
        return this.jwtService.sign({ sub: String(userId), role }, { expiresIn: '30d' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        donor_service_1.DonorService,
        database_service_1.DatabaseService,
        jwt_1.JwtService,
        otp_service_1.OtpService,
        email_service_1.EmailService,
        campaign_creator_service_1.CampaignCreatorService,
        file_service_1.FileService])
], AuthService);
//# sourceMappingURL=auth.service.js.map