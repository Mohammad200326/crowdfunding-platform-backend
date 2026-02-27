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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const campaign_service_1 = require("./campaign.service");
const platform_express_1 = require("@nestjs/platform-express");
const cleanup_file_interceptor_1 = require("../file/cleanup-file.interceptor");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const camaign_validation_1 = require("./utils/camaign.validation");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const campaign_swagger_dto_1 = require("./dto/campaign.swagger.dto");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../../utils/decorators/public.decorator");
let CampaignController = class CampaignController {
    campaignService;
    constructor(campaignService) {
        this.campaignService = campaignService;
    }
    create(createCampaignDto, user, file) {
        return this.campaignService.create(createCampaignDto, user, file);
    }
    findAll(page, limit, status, user) {
        return this.campaignService.findAll(page, limit, user?.id, status);
    }
    findByCategory(category, page, limit, status, user) {
        return this.campaignService.findByCategory(category, page, limit, user?.id, status);
    }
    findByCreator(creatorId, status, user) {
        return this.campaignService.findByCreator(creatorId, user?.id, status);
    }
    findOne(id, user) {
        return this.campaignService.findOne(id, user?.id);
    }
    update(id, updatePayload, user, file) {
        return this.campaignService.update(id, updatePayload, user, file);
    }
    toggleLike(id, user) {
        return this.campaignService.toggleLike(id, user.id);
    }
    updateStatus(id, body) {
        return this.campaignService.updateStatus(id, body.status);
    }
    remove(id) {
        return this.campaignService.softDelete(id);
    }
};
exports.CampaignController = CampaignController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new campaign by campaign creator' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(campaign_swagger_dto_1.createCampaignApiBody),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(camaign_validation_1.campaignValidationSchema))),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active campaigns (Feed)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of all active and non-deleted campaigns',
        type: [campaign_swagger_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Filter campaigns by category' }),
    (0, swagger_1.ApiParam)({
        name: 'category',
        enum: client_1.CampaignCategory,
        description: 'The category to filter by',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Filtered campaigns',
        type: [campaign_swagger_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Param)('category', new common_1.ParseEnumPipe(client_1.CampaignCategory))),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('creator/:creatorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campaigns by specific creator' }),
    (0, swagger_1.ApiParam)({
        name: 'creatorId',
        description: 'UUID of the Campaign Creator (User ID)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of campaigns by creator',
        type: [campaign_swagger_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Param)('creatorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findByCreator", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Get single campaign by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign UUID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Campaign details',
        type: campaign_swagger_dto_1.CampaignResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update campaign' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign UUID' }),
    (0, swagger_1.ApiBody)(campaign_swagger_dto_1.updateCampaignApiBody),
    (0, swagger_1.ApiOkResponse)({
        description: 'Campaign updated successfully',
        type: campaign_swagger_dto_1.CampaignResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'You are not authorized to update this campaign',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), cleanup_file_interceptor_1.FileCleanupInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(camaign_validation_1.updateCampaignValidationSchema))),
    __param(2, (0, user_decorator_1.User)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle like on a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign UUID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Like toggled',
        schema: {
            type: 'object',
            properties: { liked: { type: 'boolean' } },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update campaign status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign UUID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', enum: ['pending', 'confirmed', 'rejected'] },
            },
            required: ['status'],
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Campaign status updated',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                status: { type: 'string', enum: ['pending', 'confirmed', 'rejected'] },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(camaign_validation_1.updateCampaignStatusValidationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'delete a campaign (Mark as deleted)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Campaign deleted successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                isDeleted: { type: 'boolean', example: true },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "remove", null);
exports.CampaignController = CampaignController = __decorate([
    (0, swagger_1.ApiTags)('Campaigns'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('campaign'),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService])
], CampaignController);
//# sourceMappingURL=campaign.controller.js.map