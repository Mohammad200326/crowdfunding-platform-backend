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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const bank_account_service_1 = require("./bank-account.service");
const bank_account_dto_1 = require("./dto/bank-account.dto");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const cleanup_file_interceptor_1 = require("../file/cleanup-file.interceptor");
let BankAccountController = class BankAccountController {
    bankAccountService;
    constructor(bankAccountService) {
        this.bankAccountService = bankAccountService;
    }
    async create(createDto, user, proofDocument) {
        return this.bankAccountService.create(createDto, user.id, proofDocument);
    }
    async findMyAccounts(user) {
        return this.bankAccountService.findByUserId(user.id);
    }
    async findByUserId(userId, user) {
        if (userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to view other users bank accounts');
        }
        return this.bankAccountService.findByUserId(userId);
    }
    async findOne(id, user) {
        const bankAccount = await this.bankAccountService.findOne(id, user.id);
        if (!bankAccount) {
            throw new common_1.NotFoundException('Bank account not found');
        }
        return bankAccount;
    }
    async update(id, updateDto, user, proofDocument) {
        return this.bankAccountService.update(id, updateDto, user.id, proofDocument);
    }
    async remove(id, user) {
        await this.bankAccountService.remove(id, user.id);
    }
    async removeAsset(bankAccountId, assetId, user) {
        await this.bankAccountService.removeAsset(bankAccountId, assetId, user.id);
    }
};
exports.BankAccountController = BankAccountController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bank account' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['bankName', 'iban'],
            properties: {
                bankName: {
                    type: 'string',
                    description: 'Name of the bank',
                },
                iban: {
                    type: 'string',
                    description: 'International Bank Account Number',
                },
                notes: {
                    type: 'string',
                    description: 'Additional notes',
                },
                proofDocument: {
                    type: 'string',
                    format: 'binary',
                    description: 'Bank account proof document',
                },
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Bank account created successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('proofDocument'), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bank_account_dto_1.CreateBankAccountSchema))),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my-accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bank accounts for the current user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of bank accounts for the current user',
    }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findMyAccounts", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bank accounts for a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of bank accounts for the user' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single bank account by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Bank account found' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bank account' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                bankName: {
                    type: 'string',
                    description: 'Name of the bank',
                },
                iban: {
                    type: 'string',
                    description: 'International Bank Account Number',
                },
                notes: {
                    type: 'string',
                    description: 'Additional notes',
                },
                isVerified: {
                    type: 'boolean',
                    description: 'Verification status (admin only)',
                },
                proofDocument: {
                    type: 'string',
                    format: 'binary',
                    description: 'Updated bank account proof document',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Bank account updated successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('proofDocument'), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bank_account_dto_1.UpdateBankAccountSchema))),
    __param(2, (0, user_decorator_1.User)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bank account' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Bank account deleted successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':bankAccountId/asset/:assetId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a specific asset from a bank account',
    }),
    (0, swagger_1.ApiParam)({ name: 'bankAccountId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiParam)({ name: 'assetId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Asset deleted successfully' }),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    __param(0, (0, common_1.Param)('bankAccountId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('assetId', common_1.ParseUUIDPipe)),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "removeAsset", null);
exports.BankAccountController = BankAccountController = __decorate([
    (0, swagger_1.ApiTags)('Bank Accounts'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('bank-account'),
    __metadata("design:paramtypes", [bank_account_service_1.BankAccountService])
], BankAccountController);
//# sourceMappingURL=bank-account.controller.js.map