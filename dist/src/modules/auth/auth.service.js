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
let AuthService = class AuthService {
    userService;
    donorService;
    databaseService;
    jwtService;
    otpService;
    emailService;
    constructor(userService, donorService, databaseService, jwtService, otpService, emailService) {
        this.userService = userService;
        this.donorService = donorService;
        this.databaseService = databaseService;
        this.jwtService = jwtService;
        this.otpService = otpService;
        this.emailService = emailService;
    }
    async login(dto) {
        const user = await this.databaseService.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !(await this.verifyPassword(dto.password, user.password))) {
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
    async registerCampaignCreator(dto) {
        const email = dto.email.trim().toLowerCase();
        const existing = await this.databaseService.user.findUnique({
            where: { email },
            select: { id: true },
        });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        const hashedPassword = await this.hashPassword(dto.password);
        const notes = dto.notes ?? null;
        const { creatorProfile, type } = dto;
        const result = await this.databaseService.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email,
                    password: hashedPassword,
                    phoneNumber: dto.phoneNumber,
                    dateOfBirth: dto.dateOfBirth,
                    country: dto.country,
                    notes: notes,
                    role: client_1.UserRole.CAMPAIGN_CREATOR,
                    isVerified: false,
                    verificationStatus: 'pending',
                },
            });
            const profile = creatorProfile
                ? await tx.campaignCreator.create({
                    data: {
                        userId: user.id,
                        type,
                        ...creatorProfile,
                    },
                })
                : null;
            return { user, profile };
        });
        const token = this.generateJwtToken(result.user.id, result.user.role);
        const { password, ...userData } = result.user;
        return {
            token,
            userData: {
                ...userData,
                type,
                creatorProfile: result.profile,
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
    async forgotPassword(email) {
        const { otp, expiresIn } = await this.otpService.sendOtp(email, 'forgot_password');
        await this.emailService.sendOtp(email, otp);
        return { expiresIn };
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
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map