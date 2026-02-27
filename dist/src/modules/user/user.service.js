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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const file_service_1 = require("../file/file.service");
const client_1 = require("@prisma/client");
const object_util_1 = require("../../utils/object.util");
const argon = __importStar(require("argon2"));
let UserService = class UserService {
    prismaService;
    fileService;
    constructor(prismaService, fileService) {
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
    async createUserForRegistration(userData, role, tx) {
        const prisma = tx || this.prismaService;
        const hashedPassword = await argon.hash(userData.password);
        return prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
                role,
                isVerified: true,
                verificationStatus: 'confirmed',
            },
        });
    }
    createUser(registerUserDTO) {
        return this.prismaService.user.create({
            data: registerUserDTO,
        });
    }
    async create(createUserDto, avatar) {
        const user = await this.prismaService.user.create({
            data: {
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                email: createUserDto.email,
                password: createUserDto.password,
                dateOfBirth: createUserDto.dateOfBirth,
                role: createUserDto.role,
                country: createUserDto.country,
                phoneNumber: createUserDto.phoneNumber,
                notes: createUserDto.notes || '',
            },
        });
        if (avatar) {
            const assetData = this.fileService.createFileAssetData(avatar, user.id, client_1.AssetKind.USER_AVATAR);
            await this.prismaService.asset.create({
                data: {
                    ...assetData,
                    userId: user.id,
                },
            });
        }
        return user;
    }
    async findAll() {
        return this.prismaService.user.findMany({
            where: {
                isDeleted: false,
            },
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
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(id) {
        return this.prismaService.user.findUnique({
            where: {
                id,
                isDeleted: false,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                country: true,
                phoneNumber: true,
                notes: true,
                isVerified: true,
                verificationStatus: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async update(id, updateUserDto, avatar) {
        const user = await this.prismaService.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
        if (avatar) {
            const existingAvatar = await this.prismaService.asset.findFirst({
                where: {
                    userId: id,
                    kind: client_1.AssetKind.USER_AVATAR,
                },
            });
            if (existingAvatar) {
                await this.fileService.deleteFileFromImageKit(existingAvatar.fileId);
                await this.prismaService.asset.delete({
                    where: { id: existingAvatar.id },
                });
            }
            const assetData = this.fileService.createFileAssetData(avatar, id, client_1.AssetKind.USER_AVATAR);
            await this.prismaService.asset.create({
                data: {
                    ...assetData,
                    userId: id,
                },
            });
        }
        return user;
    }
    async remove(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user || user.isDeleted) {
            return null;
        }
        return this.prismaService.user.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
    async findByEmail(email) {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }
    mapUserWithoutPassword(user) {
        const userWithoutPassword = (0, object_util_1.removeFields)(user, ['password']);
        return {
            ...userWithoutPassword,
            id: userWithoutPassword.id,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        file_service_1.FileService])
], UserService);
//# sourceMappingURL=user.service.js.map